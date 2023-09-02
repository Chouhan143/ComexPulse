import {View, Text, TouchableOpacity} from 'react-native';
import { responsiveHeight, responsiveWidth } from 'react-native-responsive-dimensions';
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
        paddingVertical: 5,
        marginVertical: responsiveHeight(0.3)
      }}>
      <Text style={{color: textColor, fontSize: 25, fontWeight: 'bold'}}>
        {btnLabel}
      </Text>
    </TouchableOpacity>
  );
}
