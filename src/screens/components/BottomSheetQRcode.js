// BottomSheet.js

import React, {useCallback, useMemo, useState} from 'react';
import {Alert, Image, Text, TouchableOpacity, View} from 'react-native';
import {BottomSheetModal} from '@gorhom/bottom-sheet';

import {
  responsiveFontSize,
  responsiveHeight,
  responsiveWidth,
} from 'react-native-responsive-dimensions';
import {COLORS} from '../../constants/theme';
import {TextInput} from 'react-native-paper';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
const BottomSheetQRcode = ({
  modalRef,
  title,
  snapPoints,
  textInputs,
  buttonText,
  onCloseSuccess,
}) => {
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleSheetChanges = useCallback(index => {
    console.log('handleSheetChanges', index);
  }, []);

  // Initialize state for TextInput values
  const [textInputValues, setTextInputValues] = useState(
    Object.fromEntries(
      textInputs.map(input => [input.value, '']), // Initialize with empty values
    ),
  );

  // Handler function to update TextInput values
  const handleTextInputChange = (name, value) => {
    setTextInputValues(prevValues => ({...prevValues, [name]: value}));
  };

  // change password api here

  const PasswordChangeApi = async () => {
    const payloadValues = Object.values(textInputValues);
    const old_password = payloadValues[0];
    const new_password = payloadValues[1];
    const confirm_password = payloadValues[2];

    try {
      const access_token = await AsyncStorage.getItem('accessToken');
      const config = {
        headers: {
          Authorization: `Bearer ${access_token}`,
        },
      };
      const payload = {
        old_password,
        new_password,
        confirm_password,
      };

      const res = await axios.post(
        'https://skycommodity.in/bullsPanel/api/reset-old-password',
        payload,
        config,
      );

      console.log('res', res.data.message);
      if (res.status === 200) {
        Alert.alert('Success', 'Password Changed Successfully', [
          {text: 'OK', onPress: onCloseSuccess},
        ]);
        setTextInputValues(
          Object.fromEntries(textInputs.map(input => [input.value, ''])),
        );
      }
    } catch (error) {
      console.log(error.response.data.errors);
      if (error.response.data.status === 422) {
        const objecError = error.response.data.errors;
        const confirmPassError = objecError.confirm_password;
        if (
          objecError.old_password &&
          objecError.new_password &&
          objecError.confirm_password
        ) {
          const error422 = Object.values(objecError).join('\n');
          setError(error422);
        } else if (objecError.confirm_password) {
          const Confirm422 = Object.values(confirmPassError).join('\n');
          setError(Confirm422);
        }
      } else if (error.response.data.status === 405) {
        setError(error.response.data.errors);
      }
    }
  };

  return (
    <BottomSheetModal
      ref={modalRef}
      snapPoints={snapPoints}
      onChange={handleSheetChanges}
      backgroundStyle={{backgroundColor: '#CBDCF7'}}>
      <View style={{justifyContent: 'center', alignItems: 'center'}}>
        <Text
          style={{
            fontSize: responsiveFontSize(2.3),
            color: COLORS.black,
            fontWeight: '600',
          }}>
          {title}
        </Text>
      </View>

      <View
        style={{
          // position: 'absolute',
          top: responsiveHeight(2),
          width: responsiveWidth(90),
          alignSelf: 'center',
        }}>
        {textInputs.map((textInput, index) => (
          <TextInput
            key={index}
            value={textInputValues[textInput.value]}
            onChangeText={text => {
              handleTextInputChange(textInput.value, text);
            }}
            label={textInput.label}
            style={{
              marginVertical: responsiveHeight(1),
              backgroundColor: COLORS.lightWhite,
            }}
          />
        ))}

        <Text style={{color: '#EE4B2B', fontSize: responsiveFontSize(1.8)}}>
          * {error}
        </Text>

        <TouchableOpacity
          onPress={PasswordChangeApi}
          style={{
            marginTop: responsiveHeight(4),
            padding: responsiveWidth(3),
            backgroundColor: COLORS.lightGray,
            borderRadius: responsiveWidth(80),
            width: responsiveWidth(45),
            alignSelf: 'center',
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <Text
            style={{
              fontSize: responsiveFontSize(1.8),
              color: COLORS.black,
              fontWeight: '500',
            }}>
            {buttonText}
          </Text>
        </TouchableOpacity>
      </View>
    </BottomSheetModal>
  );
};

export default BottomSheetQRcode;
