import React, { useEffect, useState, useRef } from 'react';

import {
  View,
  Text,
  Touchable,
  TouchableOpacity,
  Image,
  StyleSheet,
  ScrollView,
} from 'react-native';
import Background from '../../constants/Background';
import Btn from '../../constants/Btn';
import { TextInput } from 'react-native-paper';
import { darkGreen } from '../../constants/ColorConstants';
import Field from '../../constants/Field';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/FontAwesome6';
import OtpTextInpute from '../components/OtpTextInpute';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
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
import DocumentPicker from 'react-native-document-picker';
const UserDetails = () => {
  const navigation = useNavigation();
  const [doc, setDoc] = useState(null);
  const [imageData, setImageData] = useState(null);
  const goBack = () => {
    // navigation.navigate('MobileRegistration');
    scale.value = withTiming(0, { duration: 900 });
    animation.value = withTiming(0, { duration: 900 });
    setTimeout(() => {
      navigation.navigate('MobileRegistration');
    }, 1000);
  };
  const [fname, setFname] = React.useState('');
  const [lName, setLname] = React.useState('');
  const [pass, setPass] = React.useState('');
  const [confirmPass, setConfirmPass] = React.useState('');
  const [walletpin, setWalletPin] = React.useState('');

  const [otpValue, setOtpValue] = useState('');

  const handleOtpInputChange = value => {
    setOtpValue(value);
  };

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

  const SelectDOC = async () => {
    try {
      const selectedDoc = await DocumentPicker.pickSingle();
      const imageData = {
        uri: selectedDoc.uri,
        type: selectedDoc.type,
        name: selectedDoc.name || 'image.jpg',
      };
      console.log('image data', imageData);
      setImageData(imageData);
      setDoc(imageData);
    } catch (err) {
      if (DocumentPicker.isCancel(err)) {
        setDoc(null); // Reset the doc state if document selection is canceled
        console.log('User cancelled the upload');
      } else {
        setDoc('Error selecting document'); // Set an error message in doc state if there's an error
        console.log(err);
      }
    }
  };

  const handleDocInputChange = value => {
    setDoc(value);
  };

  // api call 



  const UserDetailsApi = async () => {
    try {

      const access_token = await AsyncStorage.getItem('accessToken');
      const headers = {
        Authorization: `Bearer ${access_token}`, // Replace with your authorization token
        'Content-Type': 'multipart/form-data',
      };

      const userDetailsData = new FormData(); // Create a FormData object

      userDetailsData.append('first_name', fname);
      userDetailsData.append('last_name', lName);
      userDetailsData.append('password', pass);
      userDetailsData.append('confirm_password', confirmPass);
      userDetailsData.append('walletPin', walletpin);

      if (imageData) {
        // If an image is selected, append it to the FormData object
        userDetailsData.append('profile_picture', imageData);
      }
      console.log("userDetailsData", userDetailsData);

      const response = await axios.post(
        'https://app.srninfotech.com/bullsScript/api/create-profile',
        userDetailsData,
        { headers },
      );
      const result = response.data.status;
      console.log("user", response.data)

      if (result === 200) {
        navigation.navigate('Document');
      } else if (result === 422) {
        const ErrorMsg = response.data.message || 'Registration failed';
        setError(ErrorMsg);
      } else {
        setError('An error occurred. Please try again later.');
      }
    } catch (error) {
      const errrorCatch = error.response;
      console.log('catch errors', errrorCatch);
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
              fontSize: responsiveFontSize(3),
              fontWeight: '800',
              shadowColor: 'orange',
              elevation: 5,
              //   marginTop: responsiveHeight(1),
              letterSpacing: responsiveWidth(0.5),
            }}>
            Details
          </Text>
          <Text
            style={{
              color: COLORS.secondary,
              fontSize: responsiveFontSize(2),
              fontWeight: 'bold',
              marginBottom: responsiveHeight(1.5),
            }}>
            Please Enter Details
          </Text>
        </View>
        {/* main White container */}
        <View
          style={{
            backgroundColor: 'white',
            height: responsiveHeight(100),
            width: responsiveWidth(100),
            borderTopLeftRadius: responsiveWidth(30),
            paddingTop: responsiveHeight(4),
            marginTop: responsiveHeight(2),
            alignItems: 'center',
            shadowColor: 'blue',
            elevation: 10,
          }}>
          <ScrollView
            style={{
              flex: 1,
            }}>
            <View style={{ marginTop: responsiveHeight(1), alignSelf: 'center' }}>
              <View style={{ marginBottom: responsiveHeight(2) }}>
                <Text style={styles.tittle}>Frist Name</Text>
                <TextInput
                  value={fname}
                  onChangeText={text => setFname(text)}
                  mode="outlined"
                  activeOutlineColor={COLORS.secondary}
                  style={{ width: responsiveWidth(80) }}
                />
              </View>

              <View style={{ marginBottom: responsiveHeight(2) }}>
                <Text style={styles.tittle}>Last Name</Text>
                <TextInput
                  value={lName}
                  onChangeText={text => setLname(text)}
                  mode="outlined"
                  activeOutlineColor={COLORS.secondary}
                  style={{ width: responsiveWidth(80) }}
                />
              </View>

              <View style={{ marginBottom: responsiveHeight(2) }}>
                <Text style={styles.tittle}>Password</Text>
                <TextInput
                  value={pass}
                  onChangeText={text => setPass(text)}
                  mode="outlined"
                  activeOutlineColor={COLORS.secondary}
                  style={{ width: responsiveWidth(80) }}
                />
              </View>

              <View style={{ marginBottom: responsiveHeight(2) }}>
                <Text style={styles.tittle}>Confirm Password</Text>
                <TextInput
                  value={confirmPass}
                  onChangeText={text => setConfirmPass(text)}
                  mode="outlined"
                  activeOutlineColor={COLORS.secondary}
                  style={{ width: responsiveWidth(80) }}
                />
              </View>

              <View style={{ marginBottom: responsiveHeight(2) }}>
                <Text style={styles.tittle}>Wallet Pin</Text>
                <TextInput
                  value={walletpin}
                  onChangeText={text => setWalletPin(text)}
                  mode="outlined"
                  activeOutlineColor={COLORS.secondary}
                  style={{ width: responsiveWidth(80) }}
                />
              </View>

              <View
                style={{
                  width: responsiveWidth(80),
                  height: responsiveHeight(6),
                  borderRadius: responsiveWidth(1),
                  borderWidth: 1,
                  borderColor: '#757575',
                  marginTop: responsiveHeight(2),
                  display: 'flex',
                  flexDirection: 'row',
                  alignSelf: 'center',
                  // flexWrap: 'wrap',
                }}>
                <TouchableOpacity
                  style={{
                    width: responsiveWidth(18),
                    height: responsiveWidth(12),
                    borderRadius: responsiveWidth(1),
                    borderColor: '#757575',
                    backgroundColor: COLORS.secondary,

                    justifyContent: 'center',
                  }}
                  onPress={SelectDOC}>
                  <Text
                    style={{
                      color: '#fff',
                      fontSize: responsiveFontSize(2),
                      alignSelf: 'center',
                      fontWeight: '700',
                    }}>
                    Select
                  </Text>
                </TouchableOpacity>

                <Text
                  style={{
                    fontSize: responsiveFontSize(2),
                    color: '#000',
                    maxWidth: responsiveWidth(60),
                    alignSelf: 'center',
                    paddingHorizontal: responsiveWidth(2),
                  }}
                  numberOfLines={1}
                  ellipsizeMode="tail">
                  {doc ? doc.name : ''}
                </Text>
              </View>
            </View>

            <View style={{ marginTop: responsiveHeight(3), alignSelf: 'center' }}>
              <Btn
                textColor="white"
                bgColor={COLORS.secondary}
                btnLabel="Submit"
                Press={UserDetailsApi}
              />
            </View>
          </ScrollView>
        </View>
      </Animated.View>
    </Background>
  );
};

export default UserDetails;
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
  tittle: {
    fontSize: responsiveFontSize(2),
    color: COLORS.secondary,
    fontWeight: '600',
    letterSpacing: 2,
    lineHeight: responsiveHeight(3),
  },
});
