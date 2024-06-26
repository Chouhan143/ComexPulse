import React, {useState, useEffect, useCallback, useMemo, useRef} from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  ScrollView,
  ToastAndroid,
  FlatList,
  ActivityIndicator,
} from 'react-native';
import {TextInput, Modal, Portal, PaperProvider} from 'react-native-paper';
import Iconic from 'react-native-vector-icons/Ionicons';
import LottieView from 'lottie-react-native';
import DocumentPicker from 'react-native-document-picker';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {Button} from 'react-native-paper';
// import {Toast} from 'react-native-toast-message/lib/src/Toast';
import {useNavigation} from '@react-navigation/native';
import Icon from 'react-native-vector-icons/Entypo';
// import {COLORS, icons, SIZES} from '../../constants';
import {postData, postData3} from '../../constants/hooks/ApiHelper';
import {
  responsiveFontSize,
  responsiveHeight,
  responsiveWidth,
} from 'react-native-responsive-dimensions';
import axios from 'axios';
import {COLORS} from '../../constants/theme';
import LinearGradient from 'react-native-linear-gradient';
import {userBalance} from '../../redux/market/coinSlice';
import {useSelector} from 'react-redux';
import {BottomSheetModal} from '@gorhom/bottom-sheet';
import BottomSheetQRcode from './BottomSheetQRcode';
const Deposit = () => {
  const getBalance = useSelector(state => state.coin.userBalance);
  console.log('balance', getBalance);
  const [amount, setAmount] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [visible, setVisible] = React.useState(false);
  const showModal = () => setVisible(true);
  const hideModal = () => setVisible(false);
  const [imageData, setImageData] = useState(null);
  const [QrImg, setQrImg] = useState('');
  const [doc, setDoc] = useState(null);
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

  const nevigateUi = () => {
    hideModal();
    navigation.navigate('Funds');
  };
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

  // const DepositApi = async () => {
  //   const payload = new FormData();
  //   payload.append('deposit_amount', amount);
  //   if (doc) {
  //     // If 'doc' (imageData) is available, append it to the FormData
  //     payload.append('screenshot_deposit_amount', {
  //       uri: doc.uri,
  //       type: doc.type,
  //       name: doc.name || 'image.jpg',
  //     });
  //   }
  //   console.log('payload', payload);
  //   try {
  //     const access_token = await AsyncStorage.getItem('accessToken');
  //     const headers = {
  //       Authorization: `Bearer ${access_token}`, // Replace with your authorization token
  //     };
  //     const response = await axios.post(
  //       'https://skycommodity.in/bullsPanel/api/deposit',
  //       payload,
  //       {headers},
  //     );
  //     const result = response.data.Status;
  //     console.log(result, 'fsdfdsfdf');
  //     if (result === 200) {
  //       showModal();
  //     }
  //     console.log('res', response.data);
  //   } catch (error) {
  //     const errorCatch = error.response;
  //     // setError(errorCatch);
  //     console.log('error deposit', error);
  //   }
  // };

  const DepositApi = async () => {
    try {
      setLoading(true);
      const access_token = await AsyncStorage.getItem('accessToken');
      const headers = {
        Authorization: `Bearer ${access_token}`,
        'Content-Type': 'multipart/form-data',
      };

      const payload = new FormData();
      payload.append('deposit_amount', amount);
      if (doc) {
        payload.append('screenshot_deposit_amount', {
          uri: doc.uri,
          type: doc.type,
          name: doc.name || 'image.jpg',
        });
      }
      const response = await axios.post(
        'https://skycommodity.in/bullsPanel/api/deposit',
        payload,
        {headers},
      );
      const result = response.data.Status;
      if (result === 200) {
        showModal();
        setError('');
        setAmount('');
        setDoc(null);
        setLoading(false);
        // navigation.navigate('Funds');
      }
    } catch (error) {
      console.log('Error in deposit:', error.response.data.errors);
      if (error.response && error.response.data && error.response.data.errors) {
        const depositErrors = error.response.data.errors;
        if (depositErrors.deposit_amount) {
          console.error('Please enter a deposit amount.');
          setError(depositErrors.deposit_amount);
          // Display this error message to the user
        }
        if (depositErrors.screenshot_deposit_amount) {
          console.error('Please provide a screenshot of the deposit amount.');
          // Display this error message to the user
          setError(depositErrors.screenshot_deposit_amount);
        }
      } else {
        console.error('An unexpected error occurred. Please try again later.');
        // Display a generic error message to the user
      }
      setLoading(false);
    }
  };

  useEffect(() => {
    const interval = setInterval(() => {
      if (!getBalance) {
        dispatch(userBalance());
      }
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  // BottomSheet SnapPoint here

  // ref
  const bottomSheetModalRef = useRef(null);

  // variables
  const snapPoints = useMemo(() => ['50%']);

  // callbacks
  const handlePresentModalPress = useCallback(() => {
    bottomSheetModalRef.current?.present();
  }, []);

  const handleSheetChanges = useCallback(index => {
    console.log('handleSheetChanges', index);
  }, []);

  // Qr Image get by api

  const getQrImage = async () => {
    try {
      const access_token = await AsyncStorage.getItem('accessToken');
      const headers = {
        Authorization: `Bearer ${access_token}`, // Replace with your authorization token
      };
      const res = await axios.get(
        'https://skycommodity.in/bullsPanel/api/get-qr',
        {headers},
      );

      const imageData = res.data.data[0];
      const imageUrl = `${res.data.imagePath}${imageData.image}`;
      setQrImg(imageUrl);
    } catch (error) {
      console.log('error Qr ', error);
    }
  };

  useEffect(() => {
    getQrImage();
  }, []);

  return (
    <PaperProvider>
      <LinearGradient
        colors={['#7F7FD5', '#91EAE4']}
        // colors={['#fbd490', '#f7a5cb']} // Define your gradient colors here
        start={{x: 0, y: 1}} // Start point of the gradient
        end={{x: 1, y: 0}}
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
            Deposit
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
            start={{x: 0, y: 1}} // Start point of the gradient
            end={{x: 1, y: 0}}
            style={{
              position: 'relative',
              width: responsiveWidth(100),
              height: responsiveHeight(10),
              backgroundColor: COLORS.white,
              borderTopLeftRadius: responsiveWidth(8),
              borderTopRightRadius: responsiveWidth(8),
              marginLeft: 5,
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              alignSelf: 'center',
              shadowColor: '#000',
              elevation: 5,
            }}>
            <View
              style={{
                width: responsiveWidth(15),
                height: responsiveWidth(15),
                borderRadius: responsiveWidth(12.5),
                backgroundColor: '#7CB9E8',
                position: 'absolute',
                top: responsiveHeight(-5.3),
              }}>
              <View
                style={{
                  width: responsiveWidth(12),
                  height: responsiveWidth(12),
                  borderRadius: responsiveWidth(6),
                  backgroundColor: '#0066b2',
                  justifyContent: 'center',
                  alignItems: 'center',
                  alignSelf: 'center',
                  marginTop: responsiveHeight(1.2),
                  // position: 'absolute',
                  // top: responsiveHeight(-5.3),
                }}>
                <Icon name="wallet" size={30} color={'white'} />
              </View>
            </View>

            <View
              style={{
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <Text
                style={{
                  fontSize: responsiveFontSize(2),
                  color: COLORS.dimgray,
                  fontWeight: '700',
                }}>
                Total Balance
              </Text>
              <Text
                style={{
                  fontSize: responsiveFontSize(2),
                  color: COLORS.textColorBlue,
                  fontWeight: '700',
                }}>
                ₹ {getBalance}
              </Text>
            </View>
          </LinearGradient>
          {/* </LinearGradient> */}

          <View style={{marginTop: responsiveHeight(2)}}>
            <Image
              source={{uri: QrImg}}
              resizeMode="contain"
              style={{
                width: responsiveWidth(60),
                height: responsiveHeight(20),
                alignSelf: 'center',
              }}
            />
          </View>

          <View
            style={{
              marginVertical: responsiveHeight(2),
            }}>
            <Text
              style={{
                color: COLORS.black,
                fontSize: responsiveFontSize(1.8),
                fontWeight: '700',
                letterSpacing: responsiveFontSize(0.1),
                marginLeft: responsiveWidth(7),
                marginBottom: responsiveHeight(0.8),
              }}>
              Amount
            </Text>
            <TextInput
              label="Amount"
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
          {/* Inpute Ui start here */}

          {/* Main Box Ui  */}
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-around',
              alignItems: 'center',
              marginHorizontal: responsiveWidth(4),
              marginBottom: responsiveHeight(3),
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

          {/* <View
            style={{
              justifyContent: 'center',
              alignItems: 'center',
              marginTop: responsiveHeight(1),
            }}>
            <Text
              style={[styles.BoxContent, {fontSize: responsiveFontSize(2)}]}>
              Add Min ₹ 100
            </Text>
          </View> */}

          {/* screnshort uload here  */}

          {/* <View
            style={{
              marginHorizontal: responsiveWidth(8),
              marginVertical: responsiveHeight(2),
            }}>
            <Text
              style={{
                color: COLORS.black,
                fontSize: responsiveFontSize(2.3),
                fontWeight: '700',
                letterSpacing: responsiveFontSize(0.1),
              }}>
              Upload Screenshot
            </Text>
          </View> */}
          <Text
            style={{
              color: COLORS.black,
              fontSize: responsiveFontSize(1.8),
              fontWeight: '700',
              letterSpacing: responsiveFontSize(0.1),
              marginLeft: responsiveWidth(7),
              marginBottom: responsiveHeight(0.8),
            }}>
            Upload Payment Screenshot
          </Text>
          <View
            style={{
              width: responsiveWidth(90),
              height: responsiveHeight(6),
              borderRadius: responsiveWidth(1),
              borderWidth: 1,
              borderColor: '#757575',
              marginTop: responsiveHeight(1),
              display: 'flex',
              flexDirection: 'row',
              alignSelf: 'center',
              // flexWrap: 'wrap',
            }}>
            <TouchableOpacity
              style={{
                // width: responsiveWidth(18),
                paddingHorizontal: responsiveWidth(5),
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

          {/* button Ui  */}
          <View style={{marginHorizontal: responsiveWidth(5)}}>
            <Text
              style={{
                fontSize: responsiveFontSize(1.8),
                color: 'red',
                fontWeight: '500',
              }}>
              {error}
            </Text>
          </View>

          <TouchableOpacity
            style={{
              position: 'absolute', // Position the button at the bottom
              bottom: responsiveHeight(2), // Adjust the bottom position as needed
              alignSelf: 'center',
            }}
            onPress={DepositApi}>
            <LinearGradient
              colors={['#7F7FD5', '#91EAE4']}
              start={{x: 0, y: 1}} // Start point of the gradient
              end={{x: 1, y: 0}}
              style={{
                position: 'relative',
                width: responsiveWidth(90),
                height: responsiveHeight(6),
                borderRadius: responsiveWidth(3),
                justifyContent: 'center',
                alignItems: 'center',
                alignSelf: 'center',
              }}>
              {loading ? (
                <ActivityIndicator color="#fff" size="large" />
              ) : (
                <Text
                  style={[
                    styles.BoxContent,
                    {color: '#fff', fontWeight: '700'},
                  ]}>
                  Deposit
                </Text>
              )}
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
              <View style={{marginTop: responsiveHeight(6)}}>
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
                  You have successfully Deposit ₹{amount}
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
                  onPress={nevigateUi}>
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

          {/* <BottomSheetQRcode
            modalRef={bottomSheetModalRef}
            snapPoints={snapPoints}
            title={'ScanQr and Pay'}
            QrImage={require('../../../assets/images/PhonePayQr.png')}
          /> */}
        </View>
      </LinearGradient>
    </PaperProvider>
  );
};

export default Deposit;

const styles = StyleSheet.create({
  Box1: {
    width: responsiveWidth(18),
    height: responsiveHeight(6),
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
