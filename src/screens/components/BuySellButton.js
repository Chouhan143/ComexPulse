import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import {
  responsiveFontSize,
  responsiveHeight,
  responsiveWidth,
} from 'react-native-responsive-dimensions';
import {COLORS} from '../../constants/theme';

const BuySellButton = ({label, backgroundColor, onPress}) => {
  const buttonStyle = {
    ...styles.btncontainer,
    backgroundColor: backgroundColor || 'green',
  };

  return (
    <View>
      <TouchableOpacity style={buttonStyle} onPress={onPress}>
        <Text style={styles.btnText}>{label}</Text>
      </TouchableOpacity>
    </View>
  );
};

export default BuySellButton;

const styles = StyleSheet.create({
  btncontainer: {
    display: 'flex',
    width: responsiveWidth(44),
    height: responsiveHeight(7),
    backgroundColor: 'green',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: responsiveWidth(1),
  },
  btnText: {
    fontSize: responsiveFontSize(2),
    fontWeight: '700',
    color: COLORS.white,
  },
});
