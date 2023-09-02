import React from 'react';
import { View, StyleSheet, Text } from 'react-native';
import Background from '../../constants/Background';
import Btn from '../../constants/Btn';
import { darkGreen, green } from '../../constants/ColorConstants';
import { COLORS } from '../../constants/theme';
import { useNavigation } from '@react-navigation/native';
import { responsiveHeight, responsiveWidth } from 'react-native-responsive-dimensions';

const SlaceScreen = () => {
  const navigation = useNavigation();
  const loginHandler = () => {
    navigation.navigate('Login');
  }
  const signUpHandler = () => {
    navigation.navigate('Signup')
  };
  return (
    <Background>
      <View style={{ marginHorizontal:responsiveWidth(5), marginVertical: responsiveHeight(20) }}>
        <Text style={{ color: 'white', fontSize: 64 }}>Let's start</Text>
        <Text style={{ color: 'white', fontSize: 64, marginBottom: 40 }}>Trading ..</Text>
        <View style={{display:'flex',gap:10,justifyContent:'center'}}>
        <Btn bgColor={COLORS.secondary} textColor='white' btnLabel="Login"
          Press={loginHandler} />
        <Btn bgColor='white' textColor={COLORS.secondary} btnLabel="Signup"
          Press={signUpHandler} />
        </View>
      
      </View>
    </Background>
  );
}

const styles = StyleSheet.create({})

export default SlaceScreen;
