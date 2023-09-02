import React from 'react';
import {TextInput} from 'react-native';
import {darkGreen} from './ColorConstants';
import { responsiveWidth } from 'react-native-responsive-dimensions';
import { COLORS } from './theme';

const Field = props => {
  return (
    <TextInput
      {...props}
      style={{borderRadius: responsiveWidth(10), color: darkGreen, paddingHorizontal: responsiveWidth(3), width: responsiveWidth(78), backgroundColor: 'rgb(220,220, 220)', marginVertical: 10}}
      placeholderTextColor={COLORS.secondary}></TextInput>
  );
};

export default Field;
