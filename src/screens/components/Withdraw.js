import React, { useState, useEffect } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  ScrollView,
  ToastAndroid,
  FlatList,
} from 'react-native';
import { TextInput, Modal, Portal, PaperProvider } from 'react-native-paper';
import Iconic from 'react-native-vector-icons/Ionicons';
import LottieView from 'lottie-react-native';
import DocumentPicker from 'react-native-document-picker';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Button } from 'react-native-paper';
// import {Toast} from 'react-native-toast-message/lib/src/Toast';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/Entypo';
// import {COLORS, icons, SIZES} from '../../constants';
import { postData, postData3 } from '../../constants/hooks/ApiHelper';
import {
  responsiveFontSize,
  responsiveHeight,
  responsiveWidth,
} from 'react-native-responsive-dimensions';
import axios from 'axios';
import { COLORS } from '../../constants/theme';
import LinearGradient from 'react-native-linear-gradient';
// import DocumentPicker from 'react-native-document-picker';
const Withdraw = () => {
  const [amount, setAmount] = useState('');
  const [visible, setVisible] = React.useState(false);

  const showModal = () => setVisible(true);
  const hideModal = () => setVisible(false);
  const containerStyle = {
    backgroundColor: '#fff',
    width: responsiveWidth(90),
    height: responsiveHeight(40),
    borderRadius: responsiveWidth(3),
    alignSelf: 'center',
  };

  const navigation = useNavigation();

  const goBack = () => {
    navigation.navigate('Funds');
  };
  const handlePredefinedValueClick = value => {
    setAmount(value);
  };





  const WithdrawApi = async () => {
    try {
      const access_token = await AsyncStorage.getItem('accessToken');
      const headers = {
        Authorization: `Bearer ${access_token}`, // Replace with your authorization token
      };
      const response = await axios.post(
        'https://app.srninfotech.com/bullsScript/api/withdrawl',
        { withdrawl_amount: amount },
        { headers },
      );

      const result = response.data.Status;
      if (result === 200) {
        showModal();
      }
      console.log('res', response.data);


    } catch (error) {
      // const errorCatch = error.response;
      // setError(errorCatch);
      console.log("error login", error.response.data)
    }
  };




  return (
    <PaperProvider>
      <LinearGradient
        colors={['#7F7FD5', '#91EAE4']}
        // colors={['#fbd490', '#f7a5cb']} // Define your gradient colors here
        start={{ x: 0, y: 1 }} // Start point of the gradient
        end={{ x: 1, y: 0 }}
        style={{
          position: 'relative',
          width: responsiveWidth(100),
          height: responsiveHeight(100),
          backgroundColor: COLORS.white,
        }}>
        <View
          style={{
            paddingVertical: responsiveHeight(3),
            marginHorizontal: responsiveWidth(3),
            flexDirection: 'row',
            justifyContent: 'flex-start',
            alignItems: 'center',
            // marginLeft: responsiveWidth(4),
          }}>
          <TouchableOpacity onPress={goBack}>
            <Iconic name="arrow-back" size={25} color={'white'} />
          </TouchableOpacity>
          <Text
            style={{
              fontSize: responsiveFontSize(3),
              color: '#fff',
              fontWeight: '600',
              marginLeft: responsiveWidth(8),
            }}>
            Withdraw
          </Text>
        </View>

        <View
          style={{
            flex: 1,
            width: responsiveWidth(100),
            backgroundColor: '#fff',
            // marginTop: responsiveHeight(5),
            borderTopLeftRadius: responsiveWidth(8),
            borderTopRightRadius: responsiveWidth(8),
          }}>
          <LinearGradient
            // colors={['#7F7FD5', '#91EAE4']} // Define your gradient colors here
            colors={['#fbd490', '#f7a5cb']}
            start={{ x: 0, y: 1 }} // Start point of the gradient
            end={{ x: 1, y: 0 }}
            style={{
              position: 'relative',
              width: responsiveWidth(90),
              height: responsiveHeight(20),
              backgroundColor: COLORS.white,
              marginTop: responsiveHeight(2),
              marginLeft: 5,
              borderRadius: responsiveWidth(4),
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              marginTop: responsiveHeight(7),
              alignSelf: 'center',
              shadowColor: '#000',
              elevation: 5,
            }}>
            <View
              style={{
                width: responsiveWidth(25),
                height: responsiveWidth(25),
                borderRadius: responsiveWidth(12.5),
                backgroundColor: '#7CB9E8',
                position: 'absolute',
                top: responsiveHeight(-5.3),
              }}>
              <View
                style={{
                  width: responsiveWidth(20),
                  height: responsiveWidth(20),
                  borderRadius: responsiveWidth(10),
                  backgroundColor: '#0066b2',
                  justifyContent: 'center',
                  alignItems: 'center',
                  alignSelf: 'center',
                  marginTop: responsiveHeight(1.2),
                  // position: 'absolute',
                  // top: responsiveHeight(-5.3),
                }}>
                <Icon name="wallet" size={35} color={'white'} />
              </View>
            </View>

            <View
              style={{
                justifyContent: 'center',
                alignItems: 'center',
                paddingTop: responsiveHeight(4),
              }}>
              <Text
                style={{
                  fontSize: responsiveFontSize(2.5),
                  color: '#000',
                  fontWeight: '700',
                }}>
                Total Balance
              </Text>
              <Text
                style={{
                  fontSize: responsiveFontSize(2.2),
                  color: 'blue',
                  fontWeight: '700',
                  paddingTop: responsiveHeight(1),
                }}>
                ₹ 7,50,000
              </Text>
            </View>
          </LinearGradient>
          {/* </LinearGradient> */}

          <View
            style={{
              marginHorizontal: responsiveWidth(8),
              marginVertical: responsiveHeight(3),
            }}>
            <Text
              style={{
                color: COLORS.black,
                fontSize: responsiveFontSize(2.3),
                fontWeight: '700',
                letterSpacing: responsiveFontSize(0.1),
              }}>
              Amount
            </Text>
          </View>
          {/* Inpute Ui start here */}
          <View>
            <TextInput
              label="Value"
              value={amount}
              onChangeText={text => setAmount(text)}
              placeholder="₹"
              style={{
                backgroundColor: '#F2F2F2',
                marginHorizontal: responsiveWidth(7),
                shadowColor: '#000',
                elevation: 5,
                fontSize: responsiveFontSize(2.2),
                fontWeight: '500',
              }}
              outlineColor="transparent"
              mode="outlined"
            />
          </View>
          {/* Main Box Ui  */}
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-around',
              alignItems: 'center',
              marginHorizontal: responsiveWidth(4),
              marginVertical: responsiveHeight(3),
            }}>
            <TouchableOpacity onPress={() => handlePredefinedValueClick('100')}>
              <View style={styles.Box1}>
                <Text style={styles.BoxContent}>₹100</Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => handlePredefinedValueClick('200')}>
              <View style={styles.Box1}>
                <Text style={styles.BoxContent}>₹200</Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => handlePredefinedValueClick('500')}>
              <View style={styles.Box1}>
                <Text style={styles.BoxContent}>₹500</Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => handlePredefinedValueClick('1000')}>
              <View style={styles.Box1}>
                <Text style={styles.BoxContent}>₹1000</Text>
              </View>
            </TouchableOpacity>
          </View>
          {/* Minimum Amount Ui  */}

          <View
            style={{
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <Text
              style={[styles.BoxContent, { fontSize: responsiveFontSize(2) }]}>
              Add Min ₹ 100
            </Text>
          </View>






          {/* button Ui  */}
          <TouchableOpacity
            style={{
              position: 'absolute', // Position the button at the bottom
              bottom: responsiveHeight(2), // Adjust the bottom position as needed
              alignSelf: 'center',
            }}
            onPress={WithdrawApi}>
            <LinearGradient
              colors={['#7F7FD5', '#91EAE4']}
              start={{ x: 0, y: 1 }} // Start point of the gradient
              end={{ x: 1, y: 0 }}
              style={{
                position: 'relative',
                width: responsiveWidth(90),
                height: responsiveHeight(6),
                borderRadius: responsiveWidth(3),
                justifyContent: 'center',
                alignItems: 'center',
                alignSelf: 'center',
              }}>
              <Text
                style={[styles.BoxContent, { color: '#fff', fontWeight: '700' }]}>
                Withdraw
              </Text>
            </LinearGradient>
          </TouchableOpacity>
          {/* Modal Ui  */}
          <Portal>
            <Modal
              visible={visible}
              onDismiss={hideModal}
              contentContainerStyle={containerStyle}>
              <View
                style={{
                  position: 'absolute',
                  top: responsiveHeight(-8),
                  width: responsiveWidth(35),
                  height: responsiveWidth(35),
                  borderRadius: responsiveWidth(17.5),
                  backgroundColor: 'green',
                  alignSelf: 'center',
                  justifyContent: 'center',
                  alignItems: 'center',
                }}>
                <Icon name="check" size={70} color={'white'} />
              </View>
              <View style={{ marginTop: responsiveHeight(6) }}>
                <Text
                  style={{
                    fontSize: responsiveFontSize(3.5),
                    color: '#000',
                    textAlign: 'center',
                  }}>
                  Awesome!
                </Text>
                <Text
                  style={{
                    fontSize: responsiveFontSize(2),
                    color: 'gray',
                    textAlign: 'center',
                    paddingHorizontal: responsiveWidth(15),
                    marginVertical: responsiveHeight(2),
                  }}>
                  You have successfully Withdraw ₹{amount}
                </Text>
                <TouchableOpacity
                  style={{
                    width: responsiveWidth(65),
                    height: responsiveHeight(7),
                    backgroundColor: 'green',
                    borderRadius: responsiveWidth(2),
                    justifyContent: 'center',
                    alignItems: 'center',
                    alignSelf: 'center',
                  }}
                  onPress={hideModal}>
                  <Text
                    style={[
                      styles.BoxContent,
                      {
                        color: '#fff',
                        fontSize: responsiveFontSize(3.3),
                        fontWeight: '600',
                      },
                    ]}>
                    OK
                  </Text>
                </TouchableOpacity>
              </View>
            </Modal>
          </Portal>
        </View>
      </LinearGradient>
    </PaperProvider>
  );
};

export default Withdraw;

const styles = StyleSheet.create({
  Box1: {
    width: responsiveWidth(17),
    height: responsiveHeight(7),
    borderRadius: responsiveWidth(1),
    backgroundColor: '#E6E6E6',
    justifyContent: 'center',
    alignItems: 'center',
  },
  BoxContent: {
    fontSize: responsiveFontSize(2.5),
    fontWeight: '400',
    color: '#000',
  },
});
