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
import Icon1 from 'react-native-vector-icons/MaterialCommunityIcons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import OtpTextInpute from '../components/OtpTextInpute';
import {TextInput} from 'react-native-paper';
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
import {COLORS} from '../../constants/theme';

const EmailOtp = () => {
  const navigation = useNavigation();
  const goBack = () => {
    navigation.goBack();
  };
  const [emailOtp, setEmailOtp] = React.useState('');
  const [error, setError] = React.useState('');
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

  const Email_OtpApi = async () => {
    try {
      console.log(emailOtp);
      const access_token = await AsyncStorage.getItem('accessToken');
      const headers = {
        Authorization: `Bearer ${access_token}`, // Replace with your authorization token
      };

      const response = await axios.post(
        'https://skycommodity.in/bullsPanel/api/verfiy-email-otp',
        {email_otp: emailOtp},
        {headers},
      );
      const result = response.data.status;
      console.log('emailotp', response.data);

      if (result === 200) {
        navigation.navigate('UserDetails');
      } else if (result === 422) {
        const ErrorMsg = response.data.message || 'Registration failed';
        setError(ErrorMsg);
      } else {
        setError('An error occurred. Please try again later.');
      }
    } catch (error) {
      const errorCatch = error.response.data.errors.email_otp;
      setError(errorCatch);
    }
  };

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
            Email Otp
          </Text>
          <Text
            style={{
              color: COLORS.secondary,
              fontSize: responsiveFontSize(2),
              fontWeight: 'bold',
              marginBottom: responsiveHeight(1.5),
            }}>
            Send Otp to ex***@gmail.com
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
              <View
                style={{flexDirection: 'row', marginTop: responsiveHeight(2)}}>
                <Icon1
                  name="cellphone-message"
                  size={30}
                  color={COLORS.secondary}
                />
                <Text
                  style={{
                    color: COLORS.black,
                    fontSize: responsiveFontSize(2.5),
                    fontWeight: '500',
                    paddingHorizontal: responsiveWidth(1),
                  }}>
                  Enter Your Email Address
                </Text>
              </View>
              <View style={{marginTop: responsiveHeight(1)}}>
                <TextInput
                  label="Email Otp"
                  value={emailOtp}
                  onChangeText={text => setEmailOtp(text)}
                  mode="outlined"
                />
              </View>

              {error !== '' && (
                <View
                  style={{
                    backgroundColor: '#eab3b3',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    alignSelf: 'center',
                    width: responsiveWidth(90),
                    height: responsiveHeight(5),
                    marginTop: responsiveHeight(1),
                    borderRadius: responsiveWidth(1),
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
                style={{marginTop: responsiveHeight(7), alignSelf: 'center'}}>
                <Btn
                  textColor="white"
                  bgColor={COLORS.secondary}
                  btnLabel="Submit"
                  Press={Email_OtpApi}
                />
              </View>
            </View>
          </View>
        </View>
      </Animated.View>
    </Background>
  );
};

export default EmailOtp;
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
