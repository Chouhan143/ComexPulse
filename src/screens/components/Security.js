import {
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Button,
} from 'react-native';
import React, {useRef, useMemo, useCallback, useState} from 'react';
import {
  responsiveFontSize,
  responsiveHeight,
  responsiveWidth,
} from 'react-native-responsive-dimensions';
import {COLORS} from '../../constants/theme';
import AntDesign from 'react-native-vector-icons/AntDesign';
import BottomSheetQRcode from './BottomSheetQRcode';
import {TextInput} from 'react-native-paper';
const Security = () => {
  // ref
  const bottomSheetModalRef = useRef(null);

  // variables
  const snapPoints = useMemo(() => ['60%']);

  // callbacks
  const handlePresentModalPress = useCallback(() => {
    bottomSheetModalRef.current?.present();
  }, []);

  const handleClosePress = () => bottomSheetModalRef.current.close();

  const textInputs = [
    {label: 'Current Password', value: 'text1'},
    {label: 'New Password', value: 'text2'},
    {label: 'Confirm Password', value: 'text3'},
  ];

  return (
    <View style={{flex: 1, backgroundColor: '#fff'}}>
      <View style={{flex: 0.5}}>
        <Image
          source={require('../../../assets/images/password.gif')}
          resizeMode="contain"
          style={{
            flex: 1,
            width: responsiveWidth(100),
            height: responsiveHeight(20),
            justifyContent: 'center',
            alignItems: 'center',
          }}
        />
      </View>

      <View style={{flex: 0.5}}>
        <View
          style={{
            width: responsiveWidth(90),
            height: responsiveHeight(7),
            backgroundColor: COLORS.lightGray,
            justifyContent: 'space-around',
            alignItems: 'center',
            alignSelf: 'center',
            borderRadius: responsiveWidth(1),
            flexDirection: 'row',
          }}>
          <Text
            style={{
              fontSize: responsiveFontSize(2),
              color: '#000',
              fontWeight: '600',
            }}>
            Change password
          </Text>

          <TouchableOpacity onPress={handlePresentModalPress}>
            <AntDesign
              name={'arrowright'}
              size={responsiveFontSize(3)}
              color={'#000'}
            />
          </TouchableOpacity>
        </View>
      </View>
      <BottomSheetQRcode
        modalRef={bottomSheetModalRef}
        snapPoints={snapPoints}
        title={'Change Password'}
        textInputs={textInputs}
        buttonText={'Change Password'}
        onCloseSuccess={handleClosePress}
      />
    </View>
  );
};

export default Security;

const styles = StyleSheet.create({});
