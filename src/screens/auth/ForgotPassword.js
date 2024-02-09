import {ActivityIndicator, StyleSheet, Text, View} from 'react-native';
import React, {useState} from 'react';
import {Image} from 'react-native-animatable';
import {
  responsiveFontSize,
  responsiveHeight,
  responsiveWidth,
} from 'react-native-responsive-dimensions';
import Field from '../../constants/Field';
import Btn from '../../constants/Btn';
import {COLORS} from '../../constants/theme';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
const ForgotPassword = ({navigation}) => {
  const [email, setEmail] = useState('test1@gmail.com');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const apiCall = async () => {
    try {
      const res = await axios.post(
        'https://app.srninfotech.com/bullsPanel/api/forget-password',
        {email},
      );
      const result = res.data.status;

      console.log(res.data);

      if (result === 200) {
        const token = res.data.token;
        const userId = res.data.user_id.toString();
        await AsyncStorage.setItem('accessToken', token);
        await AsyncStorage.setItem('userId', userId);
        navigation.navigate('ForgotPasswordOtp');
      } else {
        const emailError = res.data.errors;
        setError(emailError.email[0]);
      }
    } catch (error) {
      console.log('error ====>', error);
    }
  };

  return (
    <View style={{flex: 1, backgroundColor: '#F7F7F7'}}>
      <View style={{flex: 0.5}}>
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
            Enter your registrated email address to recieve password reset
            instruction
          </Text>
        </View>
        <Image
          source={require('../../../assets/images/forgotImg.png')}
          resizeMode="contain"
        />
      </View>
      {/* text ui  */}
      <View
        style={{
          flex: 0.5,
          backgroundColor: '#fff',
          borderTopLeftRadius: responsiveWidth(10),
          borderTopRightRadius: responsiveWidth(10),
          shadowColor: '#000',
          elevation: 5,
        }}>
        {/* Email text Inpute */}

        <View
          style={{
            justifyContent: 'center',
            alignSelf: 'center',
            marginTop: responsiveHeight(5),
          }}>
          <Text style={{}}>Enter your registrated email</Text>
          <Field
            placeholder="Email"
            onChangeText={text => setEmail(text)} // Update password state
            value={email} // Bind password state to the input value
          />

          <Text style={{color: 'red', fontSize: responsiveFontSize(1.8)}}>
            {error}
          </Text>
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
                'Send Otp'
              )
            }
            Press={apiCall}
          />
        </View>
      </View>
    </View>
  );
};

export default ForgotPassword;

const styles = StyleSheet.create({});
