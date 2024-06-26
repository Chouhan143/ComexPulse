import React, {useEffect, useState} from 'react';
import {View, Text, TouchableOpacity, ActivityIndicator} from 'react-native';
import Background from '../../constants/Background';
import Btn from '../../constants/Btn';
import {darkGreen} from '../../constants/ColorConstants';
import axios from 'axios';
import Field from '../../constants/Field';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {
  responsiveFontSize,
  responsiveHeight,
  responsiveWidth,
} from 'react-native-responsive-dimensions';
import {Entypo} from 'react-native-vector-icons/Entypo';
import {useNavigation} from '@react-navigation/native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
  withTiming,
} from 'react-native-reanimated';
import {COLORS} from '../../constants/theme';
import AnimatedLoginSignUpBtn from '../components/AnimatedLoginSignUpBtn';
import {useFocusEffect} from '@react-navigation/native';
import {BackHandler} from 'react-native';
import Toast from 'react-native-toast-message';
const Login = () => {
  const navigation = useNavigation();
  const [email, setEmail] = useState(''); // State variable for email input
  const [password, setPassword] = useState('');

  const [fcm, setFcm] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [token, setToken] = useState('StaticDumyToken');
  const SignNavigation = () => {
    navigation.navigate('Signup');
  };

  // get fcm token here

  AsyncStorage.getItem('fcmToken').then(token => setFcm(token));

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

  const LoginApi = async () => {
    setLoading(true);
    const payload = {
      email: email,
      password: password,
      device_token: fcm,
    };

    try {
      const response = await axios.post(
        'https://skycommodity.in/bullsPanel/api/login',
        payload,
      );
      const result = response.data.result;
      console.log('res', response.data);

      if (result === true) {
        const token = response.data.token;
        const userName = response.data.user_name;
        const userProfileImageName = response.data.user_profile;
        const userProfileImagePath = response.data.user_profile_image_path;
        const userProfile = `${userProfileImagePath}${userProfileImageName}`;
        console.log(userProfile);
        await AsyncStorage.setItem('accessToken', token);
        await AsyncStorage.setItem('userName', userName);
        await AsyncStorage.setItem('userProfile', userProfile);
        navigation.navigate('DrawerNavigator');
        Toast.show({
          type: 'success',
          swipeable: true,
          text1: 'Welcome to SkyCommodity',
          // text2: 'This is some something 👋',
        });
        setLoading(false);
      } else {
        // Registration failed, set the error message
        setError(response.data.message || 'Registration failed');
      }
    } catch (error) {
      const errorMsg = error.response.data.message;
      const errorMsg2 = error.response.data.errors;
      const errorArr = errorMsg2;
      const check1 = error.response.data.status;
      if (check1 === 401) {
        Toast.show({
          type: 'error',
          swipeable: true,
          text1: error.response.data.message,
          text2: 'Please Enter valid Credentials',
        });
      } else if (check1 === 422 && errorArr && errorArr.email) {
        // Handle email validation error
        Toast.show({
          type: 'error',
          swipeable: true,
          text1: 'Email Validation Failed',
          text2: errorArr.email[0],
        });
      } else if (check1 === 422 && errorArr && errorArr.password) {
        // Handle password validation error
        Toast.show({
          type: 'error',
          text1: 'Password Validation Failed',
          text2: errorArr.password[0],
        });
      } else {
        Toast.show({
          type: 'error',
          text1: errorMsg,
          text2: errorMsg2,
        });
      }

      console.log('error login', error.response.data);
    } finally {
      setLoading(false);
    }
  };

  useFocusEffect(
    React.useCallback(() => {
      const onBackPress = () => {
        if (token) {
          BackHandler.exitApp();
          return true;
        } else {
          return false;
        }
      };

      const subscription = BackHandler.addEventListener(
        'hardwareBackPress',
        onBackPress,
      );

      return () => subscription.remove();
    }, [token]),
  );

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
            onChangeText={text => setEmail(text)} // Update email state
            value={email} // Bind email state to the input value
          />
          <Field
            placeholder="Password"
            secureTextEntry={true}
            onChangeText={text => setPassword(text)} // Update password state
            value={password} // Bind password state to the input value
          />
          <View
            style={{
              alignItems: 'flex-end',
              width: responsiveWidth(78),
              paddingRight: responsiveWidth(2.5),
              marginBottom: responsiveHeight(18),
            }}>
            <TouchableOpacity
              onPress={() => navigation.navigate('ForgotPassword')}>
              <Text
                style={{
                  color: COLORS.secondary,
                  fontWeight: 'bold',
                  fontSize: responsiveFontSize(2),
                }}>
                Forgot Password ?
              </Text>
            </TouchableOpacity>
          </View>
          <Btn
            textColor="white"
            bgColor={COLORS.secondary}
            btnLabel={
              loading ? (
                <ActivityIndicator color={'#fff'} size={'large'} />
              ) : (
                'Login'
              )
            }
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
                navigation.navigate('EmailRegistration');
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
