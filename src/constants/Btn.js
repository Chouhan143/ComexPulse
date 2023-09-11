import {View, Text, TouchableOpacity} from 'react-native';
import {
  responsiveFontSize,
  responsiveHeight,
  responsiveWidth,
} from 'react-native-responsive-dimensions';
import React from 'react';

export default function Btn({bgColor, btnLabel, textColor, Press}) {
  return (
    <TouchableOpacity
      onPress={Press}
      style={{
        backgroundColor: bgColor,
        borderRadius: 100,
        alignItems: 'center',
        width: responsiveWidth(90),
        paddingVertical: responsiveHeight(1.4),
        marginVertical: responsiveHeight(0.3),
        shadowColor: '#000',
        elevation: 10,
      }}>
      <Text
        style={{
          color: textColor,
          fontSize: responsiveFontSize(3),
          fontWeight: 'bold',
        }}>
        {btnLabel}
      </Text>
    </TouchableOpacity>
  );
}
