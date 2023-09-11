import React, {useEffect, useState, useRef} from 'react';
import {
  View,
  Text,
  Touchable,
  TouchableOpacity,
  Image,
  StyleSheet,
} from 'react-native';
import Background from '../../constants/Background';
import Btn from '../../constants/Btn';
import {darkGreen} from '../../constants/ColorConstants';
import Field from '../../constants/Field';
import {useNavigation} from '@react-navigation/native';
import Icon from 'react-native-vector-icons/FontAwesome6';
// import {OTPInput} from 'react-native-otp-entry';
import {
  responsiveFontSize,
  responsiveHeight,
  responsiveWidth,
} from 'react-native-responsive-dimensions';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
  withTiming,
} from 'react-native-reanimated';
import {COLORS} from '../../constants/theme';

const MobileOtp = () => {
  const navigation = useNavigation();
  const goBack = () => {
    navigation.goBack();
  };
  const [text, setText] = React.useState('');

  // Animation code
  const animation = useSharedValue(0);
  const scale = useSharedValue(0);
  const animatedStyle = useAnimatedStyle(() => {
    return {
      opacity: animation.value,
      transform: [{scale: scale.value}],
    };
  });

  useEffect(() => {
    animation.value = withTiming(1, {duration: 900});
    scale.value = withTiming(1, {duration: 900});
  }, []);

  return (
    <Background>
      <Animated.View style={[animatedStyle]}>
        <TouchableOpacity
          onPress={goBack}
          style={{padding: responsiveWidth(3)}}>
          <Icon name="arrow-left-long" size={30} color={COLORS.secondary} />
        </TouchableOpacity>
        <View
          style={{
            justifyContent: 'flex-start',
            alignItems: 'flex-start',
            marginLeft: responsiveWidth(3),
          }}>
          <Text
            style={{
              color: COLORS.secondary,
              //   color: '#fff',
              fontSize: responsiveFontSize(3),
              fontWeight: '800',
              shadowColor: 'orange',
              elevation: 5,
              //   marginTop: responsiveHeight(1),
              letterSpacing: responsiveWidth(0.5),
            }}>
            OTP Verification
          </Text>
          <Text
            style={{
              color: COLORS.secondary,
              fontSize: responsiveFontSize(2),
              fontWeight: 'bold',
              marginBottom: responsiveHeight(1.5),
            }}>
            Otp Send on your number..
          </Text>
        </View>
        {/* main White container */}
        <View
          style={{
            backgroundColor: 'white',
            height: responsiveHeight(100),
            width: responsiveWidth(100),
            borderTopLeftRadius: responsiveWidth(30),
            paddingTop: responsiveHeight(4),
            marginTop: responsiveHeight(2.8),
            alignItems: 'center',
            shadowColor: 'blue',
            elevation: 10,
          }}>
          <View
            style={{
              //   flex: 1,
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <Image
              source={require('../../../assets/images/mobileOtp.png')}
              style={{
                width: responsiveWidth(60),
                resizeMode: 'contain',
                marginTop: responsiveHeight(0),
              }}
            />
            <View style={{position: 'absolute', top: responsiveHeight(37)}}>
              <Text
                style={{
                  color: COLORS.black,
                  fontSize: responsiveFontSize(2.5),
                  fontWeight: '500',
                  paddingHorizontal: responsiveWidth(5),
                  textAlign: 'center',
                  marginTop: responsiveHeight(3),
                }}>
                An authentication code has been sent your number
              </Text>

              {/* <OTPInput
                numberOfDigits={6}
                onTextChange={text => console.log(text)}
              /> */}

              <View style={{marginTop: responsiveHeight(7)}}>
                <Btn
                  textColor="white"
                  bgColor={COLORS.secondary}
                  btnLabel="Send OTP"
                  Press={() => {
                    scale.value = withTiming(0, {duration: 900});
                    animation.value = withTiming(0, {duration: 900});
                    setTimeout(() => {
                      navigation.navigate('Login');
                    }, 1000);
                  }}
                />
              </View>
            </View>
          </View>
        </View>
      </Animated.View>
    </Background>
  );
};

export default MobileOtp;
const styles = StyleSheet.create({
  containerStyle: {
    width: responsiveWidth(90),
    height: responsiveHeight(9),
    alignSelf: 'center',
    backgroundColor: 'rgba(255, 255,255, 01)',
    marginTop: responsiveHeight(3),
    shadowColor: '#4B0082',
    elevation: 5,
  },
  textInput: {
    fontSize: responsiveFontSize(2.3),
    color: '#000',
    fontWeight: '400',
  },
});
