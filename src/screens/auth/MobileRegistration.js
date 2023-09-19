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
import Btn from '../../constants/Btn';
import { darkGreen } from '../../constants/ColorConstants';
import Field from '../../constants/Field';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/FontAwesome6';
import { TextInput } from 'react-native-paper';
import PhoneInput from 'react-native-phone-number-input';

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
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

const MobileRegistration = () => {
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
      transform: [{ scale: scale.value }],
    };
  });

  useEffect(() => {
    animation.value = withTiming(1, { duration: 900 });
    scale.value = withTiming(1, { duration: 900 });
  }, []);

  const [loading, setLoading] = useState(false);
  const [value, setValue] = useState('');
  const [formattedValue, setFormattedValue] = useState('');
  const [valid, setValid] = useState(false);
  const [error, setError] = useState('');
  const phoneInput = useRef();

  const handleOnChangeText = text => {
    setValue(text);
    console.log(text);
  };

  const handleOnSubmitEditing = () => {
    phoneInput.current?.blur();
  };

  const handleOnChangeFormattedText = text => {
    const numberIsValid = phoneInput.current?.isValidNumber(value);
    setValid(numberIsValid);
    setFormattedValue(text); // We'll set the formatted value directly from the event
  };

  //  api call

  const MobileRegistrationApi = async () => {
    try {
      const response = await axios.post(
        'https://app.srninfotech.com/bullsScript/api/mobile-register',
        { mobile: value },
      );

      const result = response.data.result;
      console.log('res', response.data);

      if (result == true) {
        const token = response.data.user_details.token;
        await AsyncStorage.setItem('accessToken', token);
        navigation.navigate('MobileOtp');

      } else {
        // Registration failed, set the error message
        setError(response.data.message || 'Registration failed');
      }
    } catch (error) {
      const errorCatch = error.response.data.errors.mobile;
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
              fontSize: responsiveFontSize(4),
              fontWeight: '800',
              shadowColor: 'orange',
              elevation: 5,
              //   marginTop: responsiveHeight(1),
              letterSpacing: responsiveWidth(0.5),
            }}>
            Register
          </Text>
          <Text
            style={{
              color: COLORS.secondary,
              fontSize: responsiveFontSize(2),
              fontWeight: 'bold',
              marginBottom: responsiveHeight(1.5),
            }}>
            Create a new account
          </Text>
        </View>
        {/* main White container */}
        <View
          style={{
            backgroundColor: 'white',
            height: responsiveHeight(100),
            width: responsiveWidth(100),
            borderTopLeftRadius: responsiveWidth(30),
            paddingTop: responsiveHeight(1),
            marginTop: responsiveHeight(2),
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
              source={require('../../../assets/images/mobileOtpSend.png')}
              style={{
                width: responsiveWidth(50),
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
                Simply enter your phone number to create an account
              </Text>

              <PhoneInput
                ref={phoneInput}
                defaultValue={value}
                defaultCode="IN" // Set default country to India
                layout="first"
                onChangeText={handleOnChangeText}
                onChangeFormattedText={handleOnChangeFormattedText}
                withDarkTheme
                withShadow
                autoFocus
                onSubmitEditing={handleOnSubmitEditing}
                containerStyle={styles.containerStyle}
                textContainerStyle={[
                  styles.textContainer,
                  !valid && value.length !== 10
                    ? { borderColor: '	#cf4d4d' }
                    : null,
                ]}
                textInputStyle={[
                  styles.textInput,
                  // !valid && value.length !== 10 ? {color: 'red'} : null,
                ]}
                textInputProps={{
                  placeholderTextColor: '#3e4853',
                  maxLength: 10,
                }}
                codeTextStyle={{
                  color: '#000',
                  fontSize: responsiveFontSize(2.3),
                }}
              />

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




              <View style={{ marginTop: responsiveHeight(7) }}>
                <Btn
                  textColor="white"
                  bgColor={COLORS.secondary}
                  btnLabel="Send OTP"
                  Press={MobileRegistrationApi}
                // Press={() => navigation.navigate('MobileOtp')}
                />
              </View>
            </View>
          </View>

          {/* 
          <View
            style={{
              display: 'flex',
              flexDirection: 'row',
              justifyContent: 'center',
            }}>
            <Text
              style={{
                fontSize: responsiveFontSize(2),
                fontWeight: 'bold',
                color: COLORS.black,
              }}>
              Already have an account ?{' '}
            </Text>
            <TouchableOpacity
              onPress={() => {
                navigation.navigate('Login');
              }}>
              <Text
                style={{
                  color: COLORS.secondary,
                  fontWeight: 'bold',
                  fontSize: responsiveFontSize(2),
                }}>
                Login
              </Text>
            </TouchableOpacity>
          </View>  */}
        </View>
      </Animated.View>
    </Background>
  );
};

export default MobileRegistration;
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
