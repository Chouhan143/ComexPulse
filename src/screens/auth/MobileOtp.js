import React, { useEffect, useState, useRef } from 'react';
import {
  View,
  Text,
  Touchable,
  TouchableOpacity,
  Image,
  StyleSheet,
} from 'react-native';
import Background from '../../constants/Background';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Btn from '../../constants/Btn';
import { darkGreen } from '../../constants/ColorConstants';
import Field from '../../constants/Field';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/FontAwesome6';
import OtpTextInpute from '../components/OtpTextInpute';
import axios from 'axios';
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
import { COLORS } from '../../constants/theme';

const MobileOtp = () => {
  const navigation = useNavigation();
  const goBack = () => {
    // navigation.navigate('MobileRegistration');
    scale.value = withTiming(0, { duration: 900 });
    animation.value = withTiming(0, { duration: 900 });
    setTimeout(() => {
      navigation.navigate('MobileRegistration');
    }, 1000);
  };
  const [text, setText] = React.useState('');
  const [error, setError] = useState('');
  const [otpValue, setOtpValue] = useState('');

  const handleOtpInputChange = value => {
    setOtpValue(value);
  };

  // Animation code
  const animation = useSharedValue(0);
  const scale = useSharedValue(0);
  const animatedStyle = useAnimatedStyle(() => {
    return {
      opacity: animation.value,
      transform: [{ scale: scale.value }],
    };
  });

  useEffect(() => {
    animation.value = withTiming(1, { duration: 900 });
    scale.value = withTiming(1, { duration: 900 });
  }, []);

  // api Call here

  const MobileOtpApi = async () => {
    try {
      const access_token = await AsyncStorage.getItem('accessToken');
      const headers = {
        Authorization: `Bearer ${access_token}`, // Replace with your authorization token
      };
      const response = await axios.post(
        'https://app.srninfotech.com/bullsScript/api/verify-mobile-otp',
        { mobile_otp: otpValue },
        { headers },
      );
      const result = response.data.status;
      if (result == 200) {
        navigation.navigate('EmailRegistration');
      } else {
        setError(response.data.message || 'Registration failed');
      }
    } catch (error) {
      console.log('catch errors dekhe', error.response.data.message);
      const errorCatch = error.response.data.message;
      setError(errorCatch);
    }
  };

  return (
    <Background>
      <Animated.View style={[animatedStyle]}>
        <TouchableOpacity
          onPress={goBack}
          style={{ padding: responsiveWidth(3) }}>
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
            <View style={{ position: 'absolute', top: responsiveHeight(37) }}>
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

              <View style={{ marginTop: responsiveHeight(4) }}>
                <OtpTextInpute onOtpInputChange={handleOtpInputChange} />
              </View>

              {error !== '' && (
                <View
                  style={{
                    backgroundColor: '#eab3b3',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    alignSelf: 'center',
                    width: responsiveWidth(85),
                    height: responsiveHeight(5),
                    marginTop: responsiveHeight(1),
                    borderRadius: responsiveWidth(1)
                  }}>
                  <Text
                    style={{
                      color: '#cf4d4d',
                      // marginTop: responsiveHeight(2),
                      fontSize: responsiveFontSize(2),
                      fontWeight: '600',
                    }}>
                    {error}
                  </Text>
                </View>
              )}

              <View
                style={{ marginTop: responsiveHeight(7), alignSelf: 'center' }}>
                <Btn
                  textColor="white"
                  bgColor={COLORS.secondary}
                  btnLabel="Submit"
                  Press={MobileOtpApi}
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
