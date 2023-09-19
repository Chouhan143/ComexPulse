import React from 'react';
import { View, StyleSheet, Text, Image } from 'react-native';
import Background from '../../constants/Background';
import Btn from '../../constants/Btn';
import { darkGreen, green } from '../../constants/ColorConstants';
import { COLORS } from '../../constants/theme';
import { useNavigation } from '@react-navigation/native';
import LinearGradient from 'react-native-linear-gradient';
import {
  responsiveFontSize,
  responsiveHeight,
  responsiveWidth,
} from 'react-native-responsive-dimensions';

const SlaceScreen = () => {
  const navigation = useNavigation();
  const loginHandler = () => {
    navigation.navigate('Login');
  };
  const signUpHandler = () => {
    navigation.navigate('MobileRegistration');
  };

  // const signUpHandler = () => {
  //   navigation.navigate('UserDetails');
  // };

  return (
    <Background>
      {/* <LinearGradient
      colors={['#7F7FD5', '#91EAE4']}
      // colors={['#fbd490', '#f7a5cb']} // Define your gradient colors here
      start={{x: 0, y: 1}} // Start point of the gradient
      end={{x: 1, y: 0}}
      style={{
        position: 'relative',
        width: responsiveWidth(100),
        height: responsiveHeight(100),
        backgroundColor: COLORS.white,
      }}> */}
      <Image
        source={require('../../../assets/images/homPng.png')}
        style={{
          width: responsiveWidth(40),
          height: responsiveHeight(40),
          resizeMode: 'contain',
        }}
      />

      <View
        style={{
          marginHorizontal: responsiveWidth(3),
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <Text
          style={{
            color: COLORS.textColorBlue,
            fontSize: responsiveFontSize(3.5),
            fontWeight: '600',
            letterSpacing: responsiveWidth(0.3),
          }}>
          Welcome to ComexPluse
        </Text>
        <Text
          style={{
            // color: '#E6E6E6',
            color: '#1657A2',
            fontSize: responsiveFontSize(2.5),
            marginBottom: responsiveHeight(10),
            marginTop: responsiveHeight(2),
            lineHeight: 28,
          }}>
          Lorem Ipsum is simply dummy text of the printing and typesetting
          industry.
        </Text>
      </View>
      <View
        style={{
          display: 'flex',
          gap: 15,
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <Btn
          bgColor={COLORS.secondary}
          textColor="white"
          btnLabel="Login"
          Press={loginHandler}
        />
        <Btn
          bgColor="white"
          textColor={COLORS.secondary}
          btnLabel="Signup"
          Press={signUpHandler}
        />
      </View>
      {/* </View> */}
      {/* </LinearGradient> */}
    </Background>
  );
};

const styles = StyleSheet.create({});

export default SlaceScreen;
