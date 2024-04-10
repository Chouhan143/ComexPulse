import {ActivityIndicator, StyleSheet, Text, View, Button} from 'react-native';
import React, {useEffect, useRef, useState} from 'react';
import {Image} from 'react-native-animatable';
import {
  responsiveFontSize,
  responsiveHeight,
  responsiveWidth,
} from 'react-native-responsive-dimensions';
import OTPTextInput from 'react-native-otp-textinput';
import Field from '../../constants/Field';
import Btn from '../../constants/Btn';
import {COLORS} from '../../constants/theme';
import OtpTextInpute from '../components/OtpTextInpute';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
const ForgotPasswordOtp = () => {
  const [newPass, setNewPass] = useState('');
  const [confirmPass, setConfirmPass] = useState('');

  const [loading, setLoading] = useState(false);
  const [otpValue, setOtpValue] = useState('');

  const handleOtpInputChange = value => {
    setOtpValue(value);
  };

  const resetPasswordApi = async () => {
    try {
      const token = await AsyncStorage.getItem('accessToken');
      const userId = await AsyncStorage.getItem('userId');
      const payload = {
        id: userId,
        token: token,
        otp: otpValue,
        new_password: newPass,
        confirm_password: confirmPass,
      };

      console.log(payload);
      const res = await axios.post(
        'https://skycommodity.in/bullsPanel/api/reset-password',
        payload,
      );

      console.log(res);
    } catch (error) {
      console.log(error, 'error');
    }
  };

  return (
    <View style={{flex: 1, backgroundColor: '#F7F7F7'}}>
      <View style={{flex: 0.3}}>
        <View
          style={{
            justifyContent: 'center',
            padding: responsiveWidth(5),
          }}>
          <Text
            style={{
              textAlign: 'center',
              fontSize: responsiveFontSize(1.9),
              color: '#000',
              fontWeight: '500',
            }}>
            Enter your recieved otp for password reset
          </Text>
        </View>
        <Image
          source={require('../../../assets/images/forgotPassOtp.png')}
          resizeMode="contain"
          style={{
            width: responsiveWidth(40),
            height: responsiveHeight(20),
            justifyContent: 'center',
            alignSelf: 'center',
          }}
        />
      </View>
      {/* text ui  */}
      <View
        style={{
          flex: 0.7,
          backgroundColor: '#fff',
          borderTopLeftRadius: responsiveWidth(10),
          borderTopRightRadius: responsiveWidth(10),
          shadowColor: '#000',
          elevation: 5,
        }}>
        {/* Email text Inpute */}
        <View
          style={{
            marginLeft: responsiveWidth(8),
            marginTop: responsiveHeight(3),
          }}>
          <Text style={{fontSize: responsiveFontSize(2.2), color: '#000'}}>
            Enter your Otp here
          </Text>
        </View>

        <View style={{marginTop: responsiveHeight(5)}}>
          <OtpTextInpute onOtpInputChange={handleOtpInputChange} />
        </View>

        <View
          style={{
            justifyContent: 'center',
            alignSelf: 'center',
            marginTop: responsiveHeight(2),
          }}>
          <View style={{marginTop: responsiveHeight(3)}}>
            <Field
              placeholder="New Password"
              onChangeText={text => setNewPass(text)} // Update password state
              value={newPass} // Bind password state to the input value
              secureTextEntry={true}
            />

            <Field
              placeholder="Confrim Password"
              onChangeText={text => setConfirmPass(text)} // Update password state
              value={confirmPass} // Bind password state to the input value
              secureTextEntry={true}
            />
          </View>
        </View>
        {/* reset password button  */}

        <View
          style={{
            justifyContent: 'center',
            padding: responsiveWidth(5),
            marginTop: responsiveHeight(5),
          }}>
          <Btn
            textColor="white"
            bgColor={COLORS.secondary}
            btnLabel={
              loading ? (
                <ActivityIndicator color={'#fff'} size={'large'} />
              ) : (
                'Reset Password'
              )
            }
            Press={resetPasswordApi}
          />
        </View>
      </View>
    </View>
  );
};

export default ForgotPasswordOtp;

const styles = StyleSheet.create({});
