import React, { useEffect } from 'react';
import { View, Text, Touchable, TouchableOpacity } from 'react-native';
import Background from '../../constants/Background';
import Btn from '../../constants/Btn';
import { darkGreen } from '../../constants/ColorConstants';
import Field from '../../constants/Field';
import { useNavigation } from '@react-navigation/native';
import { responsiveFontSize, responsiveHeight, responsiveWidth } from 'react-native-responsive-dimensions';
import Animated, { useSharedValue, useAnimatedStyle, withSpring, withTiming } from 'react-native-reanimated';
import { COLORS } from '../../constants/theme';

const Signup = () => {
  const navigation = useNavigation();
 
 
  // Animation code
  const animation = useSharedValue(0);
  const scale = useSharedValue(0);
  const animatedStyle = useAnimatedStyle(() => {
    return {
      opacity: animation.value,
      transform: [{ scale: scale.value }]
    }
  })

  useEffect(() => {
    animation.value = withTiming(1, { duration: 900 })
    scale.value = withTiming(1, { duration: 900 })
  }, [])

  return (
    <Background>
      <Animated.View style={[{ alignItems: 'center', }, animatedStyle]}>
        <Text
          style={{
            color: 'white',
            fontSize: responsiveFontSize(7.5),
            fontWeight: 'bold',
            marginTop: responsiveHeight(2.5),
          }}>
          Register
        </Text>
        <Text
          style={{
            color: 'white',
            fontSize: responsiveFontSize(2.5),
            fontWeight: 'bold',
            marginBottom: responsiveHeight(1.5)
          }}>
          Create a new account
        </Text>
        <View
          style={{
            backgroundColor: 'white',
            height: responsiveHeight(100),
            width: responsiveWidth(100),
            borderTopLeftRadius: responsiveWidth(30),
            paddingTop: responsiveHeight(4),
            alignItems: 'center',
          }}>
          <Field placeholder="First Name" />
          <Field placeholder="Last Name" />
          <Field
            placeholder="Email / Username"
            keyboardType={'email-address'}
          />
          <Field placeholder="Contact Number" keyboardType={'number'} />
          <Field placeholder="Password" secureTextEntry={true} />
          <Field placeholder="Confirm Password" secureTextEntry={true} />
          <View
            style={{
              display: 'flex',
              flexDirection: 'row',
              width: responsiveWidth(78),
              flexWrap: 'wrap',
              alignItems: 'center'
            }}>
            <Text style={{ color: 'grey', fontSize: responsiveFontSize(2) }}>
              By signing in, you agree to our {''}
            </Text>
            <Text style={{ color: COLORS.secondary, fontWeight: 'bold', fontSize: responsiveFontSize(2) }}>
              Terms & Conditions
            </Text>
          </View>

          <View style={{ marginTop: responsiveHeight(1) }}>
            <Btn
              textColor="white"
              bgColor={COLORS.secondary}
              btnLabel="Signup"
              Press={() => {
                scale.value = withTiming(0, { duration: 900 })
                animation.value = withTiming(0, { duration: 900 })
              setTimeout(() => {
                navigation.navigate('Login');
              }, 1000)
              }}
            />
          </View>

          <View
            style={{
              display: 'flex',
              flexDirection: 'row',
              justifyContent: 'center',
            }}>
            <Text style={{ fontSize: responsiveFontSize(2), fontWeight: 'bold',color:COLORS.black }}>
              Already have an account ?{' '}
            </Text>
            <TouchableOpacity
              onPress={() => {
           navigation.navigate('Login');
              }}>
              <Text
                style={{ color: COLORS.secondary, fontWeight: 'bold', fontSize: responsiveFontSize(2) }}>
                Login
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </Animated.View>
    </Background>
  );
};

export default Signup;
