import React, {useState, useEffect} from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  TextInput,
  ScrollView,
  ToastAndroid,
  FlatList,
} from 'react-native';
import {Divider} from 'react-native-paper';
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
import {fetchCoinData} from '../../redux/market/coinSlice';
import {useDispatch, useSelector} from 'react-redux';

const Funds = () => {
  dispatch = useDispatch();
  const [showQRCode, setShowQRCode] = useState(false);
  const [withdraw, setWithdraw] = useState(false);
  const [amount, setAmount] = useState('');
  const [doc, setDoc] = useState(null);
  const [error, setError] = useState('');
  const [withdrawAmount, setWithdrawAmount] = useState('');
  const navigation = useNavigation();
  const [userFund, setUserFund] = useState('');
  const [depositResponse, setDepositeResponse] = useState('');
  const [withdrawResponse, setWithdrawResponse] = useState('');
  const StocksData = useSelector(state => state.coin.data);
  const goBack = () => {
    navigation.navigate('Account');
  };
  // const getStoredData = async () => {
  //   try {
  //     const storedbalance = await AsyncStorage.getItem('user_balance');
  //     setUserFund(storedbalance || '');
  //   } catch (error) {
  //     console.error(error);
  //   }
  // };

  const BalanceApi = async () => {
    try {
      const access_token = await AsyncStorage.getItem('accessToken');
      const config = {
        headers: {
          Authorization: `Bearer ${access_token}`,
        },
      };

      const res = await axios.get(
        'https://scripts.bulleyetrade.com/api/mobile/balance',
        config,
      );
      setUserFund(res.data.balance);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    const interval = setInterval(() => {
      BalanceApi();
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const depositeUi = ({item}) => {
    return (
      <View style={{flex: 1, marginTop: responsiveHeight(2)}}>
        <View
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            flexDirection: 'row',
            // backgroundColor: 'red',
            width: responsiveWidth(100),
            height: responsiveHeight(3),
            paddingHorizontal: responsiveWidth(7),
            marginTop: responsiveHeight(2),
          }}>
          <Text style={{color: COLORS.black, alignSelf: 'center'}}>
            {item.created_at}
          </Text>
          <Text style={{color: COLORS.black, alignSelf: 'center'}}>
            {item.amount}
          </Text>
          <Text style={{color: COLORS.black, alignSelf: 'center'}}>
            {item.is_approved}
          </Text>
        </View>
      </View>
    );
  };

  const handleAddFunds = () => {
    setShowQRCode(true);
    setWithdraw(false);
    setDoc(null);
    setAmount('');
    setError('');
  };

  const handleWithdraw = () => {
    setShowQRCode(false);
    setWithdraw(true);
    setDoc(null);
    setAmount('');
    setError('');
  };

  const withdrawHandle = text => {
    setWithdrawAmount(text);
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

  const handleDocumentSubmit = async () => {
    try {
      if (!doc) {
        setError('Please select a screenshot');
        return;
      }

      const formData = new FormData();
      formData.append('image_files', {
        uri: doc.uri,
        name: 'image_files.jpg',
        type: doc.type,
      });
      formData.append('amount', amount);

      const access_token = await AsyncStorage.getItem('accessToken');
      const config = {
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: `Bearer ${access_token}`,
        },
      };

      const response = await postData3(
        'https://scripts.bulleyetrade.com/api/deposit',
        formData,
        config,
      );

      // setDepositeResponse(response.data.Data);
      console.log('Response:', response.data.Data);
      // Handle the response as needed
      if (response.data.Status === 200) {
        Toast.show({
          type: 'success',
          text1: 'Success',
          text2: 'Deposit request placed',
          position: 'bottom',
          bottomOffset: 400,
        });
        navigation.navigate('MainLayout');
      }
    } catch (error) {
      console.error(error);
    }
  };

  const depositeListHandle = async () => {
    try {
      const access_token = await AsyncStorage.getItem('accessToken');
      const headers = {
        Authorization: `Bearer ${access_token}`,
      };

      const response = await axios.get(
        'https://scripts.bulleyetrade.com/api/deposit',
        {headers},
      );

      const formattedData = response.data.Data.map(item => {
        const createdDate = new Date(item.created_at);
        const formattedDate = createdDate
          .toLocaleDateString()
          .split('/')
          .map(part => part.padStart(2, '0'))
          .join('-');

        const isApproved = item.is_approved === 1 ? 'Active' : 'Pending';

        return {...item, created_at: formattedDate, is_approved: isApproved};
      });

      setDepositeResponse(formattedData);
      console.log('formatted data', formattedData);
    } catch (error) {
      console.log('error', error);
    }
  };

  const withdrawListHandle = async () => {
    try {
      const access_token = await AsyncStorage.getItem('accessToken');
      const headers = {
        Authorization: `Bearer ${access_token}`,
      };

      const response = await axios.get(
        'https://scripts.bulleyetrade.com/api/withdraw',
        {headers},
      );

      const formattedData = response.data.Data.map(item => {
        const createdDate = new Date(item.created_at);
        const formattedDate = createdDate
          .toLocaleDateString()
          .split('/')
          .map(part => part.padStart(2, '0'))
          .join('-');

        const isApproved = item.is_approved === 1 ? 'Active' : 'Pending';

        return {...item, created_at: formattedDate, is_approved: isApproved};
      });

      setWithdrawResponse(formattedData);
      console.log('formatted data', formattedData);
    } catch (error) {
      console.log('error', error);
    }
  };

  useEffect(() => {
    depositeListHandle();
    withdrawListHandle();
  }, []);

  useEffect(() => {
    if (!StocksData) {
      dispatch(fetchCoinData());
    }
    [];
  });

  if (!StocksData) {
    return null; // or return a loading indicator
  }

  const withdrawApi = async () => {
    try {
      const access_token = await AsyncStorage.getItem('accessToken');
      const config = {
        headers: {
          Authorization: `Bearer ${access_token}`,
        },
      };

      const payload = {
        amount: withdrawAmount,
      };

      console.log('payload', config);
      const res = await axios.post(
        'https://scripts.bulleyetrade.com/api/withdraw',
        payload,
        config,
      );
      if (res.data.Status === 200) {
        ToastAndroid.show('Withdraw request placed', ToastAndroid.SHORT);

        setTimeout(() => {
          navigation.navigate('MainLayout');
        }, 3000);
      }

      console.log('amount', res);
    } catch (error) {
      console.log(error);
    }
  };

  const MyAssetsUi = ({item}) => {
    return (
      <>
        <View
          style={{
            // backgroundColor: 'red',
            borderBottomColor: '#F2F2F2',
            borderBottomWidth: responsiveWidth(0.5),
            paddingVertical: responsiveHeight(1),
            justifyContent: 'space-between',
          }}>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              marginVertical: responsiveHeight(1),
              // marginLeft: responsiveWidth(5),
              justifyContent: 'space-around',
            }}>
            <LinearGradient
              // colors={['#7F7FD5', '#91EAE4']}
              colors={['#fbd490', '#f7a5cb']} // Define your gradient colors here
              start={{x: 0, y: 1}} // Start point of the gradient
              end={{x: 1, y: 0}}
              style={{
                position: 'relative',
                width: responsiveWidth(10),
                height: responsiveWidth(10),
                borderRadius: responsiveWidth(5),
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <Text
                style={{
                  color: '#000',
                  fontSize: responsiveFontSize(2),
                  fontWeight: '600',
                }}>
                {item.trade_name.substring(0, 1)}
              </Text>
            </LinearGradient>
            <Text
              style={{
                color: '#000',
                fontSize: responsiveFontSize(2),
                fontWeight: '600',
                letterSpacing: responsiveFontSize(0.1),
                paddingLeft: responsiveWidth(5),
              }}>
              {item.trade_name}
            </Text>

            <View
              style={{
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <Text
                style={{
                  fontSize: responsiveFontSize(2),
                  color: '#000',
                  fontWeight: '600',
                }}>
                {item.price}
              </Text>
              <Text
                style={{
                  fontSize: responsiveFontSize(2),
                  color: 'green',
                  fontWeight: '600',
                }}>
                + 10%
              </Text>
            </View>
          </View>
        </View>
      </>
    );
  };

  return (
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
          Wallet
        </Text>
      </View>

      <ScrollView
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
            flexDirection: 'row',
            justifyContent: 'space-evenly',
            alignItems: 'center',
            marginTop: responsiveWidth(6),
          }}>
          <TouchableOpacity
            style={{
              width: responsiveWidth(35),
              height: responsiveHeight(6),
              backgroundColor: '#52AD2D',
              borderRadius: responsiveWidth(2),
              alignItems: 'center',
              justifyContent: 'center',
              flexDirection: 'row',
              marginRight: responsiveWidth(5),
              alignSelf: 'center',
              shadowColor: '#000',
              elevation: 5,
            }}
            onPress={() => navigation.navigate('Deposit')}>
            <Text
              style={{
                // marginLeft: responsiveWidth(4),
                color: COLORS.white,
                fontSize: responsiveFontSize(2),
                textAlign: 'center',
                fontWeight: '600',
                letterSpacing: responsiveFontSize(0.2),
              }}>
              Deposit
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={{
              width: responsiveWidth(35),
              height: responsiveHeight(6),
              backgroundColor: '#0066b2',
              borderRadius: responsiveWidth(2),
              alignItems: 'center',
              justifyContent: 'center',
              flexDirection: 'row',
              shadowColor: '#000',
              elevation: 5,
            }}
            onPress={() => navigation.navigate('Withdraw')}>
            <Text
              style={{
                // marginLeft: responsiveWidth(4),
                color: COLORS.white,
                fontSize: responsiveFontSize(2),
                fontWeight: '500',
                letterSpacing: responsiveFontSize(0.2),
              }}>
              Withdraw
            </Text>
          </TouchableOpacity>
        </View>
        {/* Button end here */}

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
            My Assets
          </Text>
        </View>

        <FlatList
          renderItem={MyAssetsUi}
          data={StocksData}
          keyExtractor={item => item.id}
        />
      </ScrollView>
    </LinearGradient>
  );
};

export default Funds;

const styles = StyleSheet.create({});
