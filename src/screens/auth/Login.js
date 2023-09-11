import React, {useEffect} from 'react';
import {View, Text, Touchable, TouchableOpacity} from 'react-native';
import Background from '../../constants/Background';
import Btn from '../../constants/Btn';
import {darkGreen} from '../../constants/ColorConstants';
import Field from '../../constants/Field';
import {
  responsiveFontSize,
  responsiveHeight,
  responsiveWidth,
} from 'react-native-responsive-dimensions';
import {useNavigation} from '@react-navigation/native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
  withTiming,
} from 'react-native-reanimated';
import {COLORS} from '../../constants/theme';
const Login = () => {
  const navigation = useNavigation();
  const SignNavigation = () => {
    navigation.navigate('Signup');
  };
  // Animation code
  const animation = useSharedValue(0);
  const scale = useSharedValue(0);
  const animatedStyle = useAnimatedStyle(() => {
    return {
      // opacity: animation.value,
      transform: [{scale: scale.value}],
    };
  });

  useEffect(() => {
    animation.value = withTiming(1, {duration: 900});
    scale.value = withTiming(1, {duration: 900});
  }, []);

  return (
    <Background>
      <Animated.View style={[{alignItems: 'center'}, animatedStyle]}>
        <Text
          style={{
            color: COLORS.secondary,
            // color: 'orange',
            fontSize: responsiveFontSize(7.3),
            fontWeight: 'bold',
            marginVertical: 20,
          }}>
          Login
        </Text>
        <View
          style={{
            backgroundColor: 'white',
            height: responsiveHeight(100),
            width: responsiveWidth(100),
            borderTopLeftRadius: responsiveWidth(30),
            paddingTop: responsiveHeight(10),
            marginTop: responsiveHeight(4),
            alignItems: 'center',
            shadowColor: 'blue',
            elevation: 20,
          }}>
          <Text
            style={{
              fontSize: responsiveFontSize(5),
              color: COLORS.secondary,
              fontWeight: 'bold',
            }}>
            Welcome Back
          </Text>
          <Text
            style={{
              color: 'grey',
              fontSize: responsiveFontSize(2.5),
              fontWeight: 'bold',
              marginBottom: responsiveHeight(1.5),
            }}>
            Login to your account
          </Text>
          <Field
            placeholder="Email / Username"
            keyboardType={'email-address'}
          />
          <Field placeholder="Password" secureTextEntry={true} />
          <View
            style={{
              alignItems: 'flex-end',
              width: responsiveWidth(78),
              paddingRight: responsiveWidth(2.5),
              marginBottom: responsiveHeight(18),
            }}>
            <Text
              style={{
                color: COLORS.secondary,
                fontWeight: 'bold',
                fontSize: responsiveFontSize(2),
              }}>
              Forgot Password ?
            </Text>
          </View>
          <Btn
            textColor="white"
            bgColor={COLORS.secondary}
            btnLabel="Login"
            Press={() => navigation.navigate('DrawerNavigator')}
          />
          <View
            style={{
              display: 'flex',
              flexDirection: 'row',
              justifyContent: 'center',
              marginTop: responsiveHeight(1.5),
            }}>
            <Text
              style={{
                fontSize: responsiveFontSize(2.3),
                fontWeight: 'bold',
                color: COLORS.black,
              }}>
              Don't have an account ?{' '}
            </Text>
            <TouchableOpacity
              onPress={() => {
                navigation.navigate('MobileRegistration');
              }}>
              <Text
                style={{
                  color: COLORS.secondary,
                  fontWeight: 'bold',
                  fontSize: 16,
                }}>
                Signup
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </Animated.View>
    </Background>
  );
};

export default Login;
