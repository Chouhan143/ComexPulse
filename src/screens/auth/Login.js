import React, { useEffect, useState } from 'react';
import { View, Text, Touchable, TouchableOpacity } from 'react-native';
import Background from '../../constants/Background';
import Btn from '../../constants/Btn';
import { darkGreen } from '../../constants/ColorConstants';
import axios from 'axios';
import Field from '../../constants/Field';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {
  responsiveFontSize,
  responsiveHeight,
  responsiveWidth,
} from 'react-native-responsive-dimensions';
import { useNavigation } from '@react-navigation/native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
  withTiming,
} from 'react-native-reanimated';
import { COLORS } from '../../constants/theme';
const Login = () => {
  const navigation = useNavigation();
  const [email, setEmail] = useState(''); // State variable for email input
  const [password, setPassword] = useState('');
  const [error, setError] = useState("");
  const SignNavigation = () => {
    navigation.navigate('Signup');
  };
  // Animation code
  const animation = useSharedValue(0);
  const scale = useSharedValue(0);
  const animatedStyle = useAnimatedStyle(() => {
    return {
      // opacity: animation.value,
      transform: [{ scale: scale.value }],
    };
  });

  useEffect(() => {
    animation.value = withTiming(1, { duration: 900 });
    scale.value = withTiming(1, { duration: 900 });
  }, []);

  const LoginApi = async () => {

    const payload = {
      email: email,
      password: password,
    };

    try {
      const response = await axios.post(
        'https://app.srninfotech.com/bullsScript/api/login',
        payload,
      );

      const result = response.data.result;
      console.log('res', response.data);

      if (result == true) {
        const token = response.data.token;
        await AsyncStorage.setItem('accessToken', token);
        navigation.navigate('DrawerNavigator');

      } else {
        // Registration failed, set the error message
        setError(response.data.message || 'Registration failed');
      }
    } catch (error) {
      // const errorCatch = error.response;
      // setError(errorCatch);
      console.log("error login", error)
    }
  };



  return (
    <Background>
      <Animated.View style={[{ alignItems: 'center' }, animatedStyle]}>
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
            onChangeText={(text) => setEmail(text)} // Update email state
            value={email} // Bind email state to the input value
          />
          <Field placeholder="Password" secureTextEntry={true}
            onChangeText={(text) => setPassword(text)} // Update password state
            value={password} // Bind password state to the input value
          />
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
            Press={LoginApi}
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
