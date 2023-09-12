import {StyleSheet, Text, TextInput, View} from 'react-native';
import React, {useRef, useState} from 'react';
import {
  responsiveFontSize,
  responsiveHeight,
  responsiveWidth,
} from 'react-native-responsive-dimensions';
import {COLORS} from '../../constants/theme';

const OtpTextInput = ({onOtpInputChange}) => {
  const etRefs = [useRef(), useRef(), useRef(), useRef(), useRef(), useRef()];

  const [etValues, setEtValues] = useState(['', '', '', '', '', '']);

  const handleOtpInputChange = () => {
    const otpValue = etValues.join('');
    onOtpInputChange(otpValue);
    console.log('otpValue type:', typeof otpValue);
  };

  const handleInputChange = (text, index) => {
    const newEtValues = [...etValues];
    newEtValues[index] = text;
    setEtValues(newEtValues);

    if (text.length >= 1 && index < 5) {
      etRefs[index + 1].current.focus();
    } else if (text.length < 1 && index > 0) {
      etRefs[index - 1].current.focus();
    }

    handleOtpInputChange();
  };

  return (
    <View style={styles.container}>
      <View style={styles.otpView}>
        {etRefs.map((ref, index) => (
          <TextInput
            key={index}
            ref={ref}
            style={styles.inputView}
            keyboardType="number-pad"
            maxLength={1}
            onChangeText={text => handleInputChange(text, index)}
            value={etValues[index]}
          />
        ))}
      </View>
    </View>
  );
};

export default OtpTextInput;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  otpView: {
    width: responsiveWidth(100),
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
  },
  inputView: {
    width: responsiveWidth(12),
    height: responsiveWidth(12),
    // borderWidth: responsiveWidth(0.1),
    borderRadius: responsiveWidth(1),
    marginLeft: responsiveWidth(3),
    textAlign: 'center',
    color: COLORS.black,
    fontSize: responsiveFontSize(2.1),
    shadowColor: 'blue',
    elevation: 2,
  },
});
