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
  ActivityIndicator,
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
import {userBalance} from '../../redux/market/coinSlice';

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
  const [transactionData, setTransactionData] = useState([]);

  const StocksData = useSelector(state => state.coin.data);
  const getBalance = useSelector(state => state.coin.userBalance);
  const isLoadingBalance = useSelector(state => state.coin.isLoader);
  const [selectedTab, setSelectedTab] = useState('deposit');
  const goBack = () => {
    navigation.navigate('Account');
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

  const depositTrx = async () => {
    try {
      const access_token = await AsyncStorage.getItem('accessToken');
      const headers = {
        Authorization: `Bearer ${access_token}`,
      };

      const response = await axios.get(
        'https://skycommodity.in/bullsPanel/api/deposits-funds-history',
        {headers},
      );

      setTransactionData(response.data.Deposits);
    } catch (error) {
      console.log(error);
    }
  };

  const WithdrawTrx = async () => {
    try {
      const access_token = await AsyncStorage.getItem('accessToken');
      const headers = {
        Authorization: `Bearer ${access_token}`,
      };

      const response = await axios.get(
        'https://skycommodity.in/bullsPanel/api/withdrawl-funds-history',
        {headers},
      );
      setTransactionData(response.data.Deposits);
    } catch (error) {
      console.log(error);
    }
  };

  // handle transaction btn

  const handleTabChange = tab => {
    setSelectedTab(tab);
    if (tab === 'deposit') {
      depositTrx();
    } else {
      WithdrawTrx();
    }
  };

  useEffect(() => {
    depositeListHandle();
    withdrawListHandle();
    depositTrx();
    // WithdrawTrx();
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      if (!getBalance) {
        dispatch(userBalance());
      }
    }, 1000);

    return () => clearInterval(interval);
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

  // flatlist ui list render

  const renderDepositUi = ({item, index}) => {
    const status = item.deposit_status;
    const date = item.updated_at;
    const newdate = new Date(date);
    const formatedDate = newdate.toLocaleDateString();

    return (
      <View style={{flex: 1}}>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            marginHorizontal: responsiveWidth(3),
            alignItems: 'center',
            marginTop: responsiveHeight(2),
            marginBottom: responsiveHeight(2),
          }}>
          <View>
            <Text style={{color: COLORS.dimgray}}>{index + 1}</Text>
          </View>
          <View>
            <Text style={{color: COLORS.dimgray}}>{item.amount}</Text>
          </View>
          <View>
            <Text style={{color: COLORS.dimgray}}>{formatedDate}</Text>
          </View>
          <View>
            <Text style={{color: status == 0 ? 'orange' : 'green'}}>
              {status == 0 ? 'Pending' : 'Success'}
            </Text>
          </View>
        </View>
      </View>
    );
  };

  const renderWithdrawUi = ({item, index}) => {
    const status = item.withdrawl_status;
    // console.log('status', item);
    const date = item.updated_at;
    const newdate = new Date(date);
    const formatedDate = newdate.toLocaleDateString();

    return (
      <View style={{flex: 1}}>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            marginHorizontal: responsiveWidth(3),
            alignItems: 'center',
            marginTop: responsiveHeight(2),
            marginBottom: responsiveHeight(2),
          }}>
          <View>
            <Text style={{color: COLORS.dimgray}}>{index + 1}</Text>
          </View>
          <View>
            <Text style={{color: COLORS.dimgray}}>{item.amount}</Text>
          </View>
          <View>
            <Text style={{color: COLORS.dimgray}}>{formatedDate}</Text>
          </View>
          <View>
            <Text style={{color: status == 0 ? 'orange' : 'green'}}>
              {status == 0 ? 'Pending' : 'Success'}
            </Text>
          </View>
        </View>
      </View>
    );
  };

  const renderUi = ({item, index}) => {
    // Render UI based on selected tab
    if (selectedTab === 'deposit') {
      return renderDepositUi({item, index});
    } else {
      return renderWithdrawUi({item, index});
    }
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
        <View style={{flex: 1}}>
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
                  fontSize: responsiveFontSize(2.5),
                  color: 'blue',
                  fontWeight: '700',
                  paddingTop: responsiveHeight(1),
                }}>
                ₹ {getBalance}
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
        </View>
        {/* Button end here */}

        <View
          style={{
            flex: 1,
            backgroundColor: '#FBFAF2',
            marginTop: responsiveHeight(2),
            height: '100%',
            borderRadius: responsiveWidth(4),
          }}>
          <View
            style={{
              flex: 1,
              marginHorizontal: responsiveWidth(3),
              marginVertical: responsiveHeight(2),
            }}>
            <Text
              style={{
                color: COLORS.black,
                fontSize: responsiveFontSize(2.3),
                fontWeight: '700',
                letterSpacing: responsiveFontSize(0.1),
              }}>
              Transaction History
            </Text>
            <View
              style={{
                flexDirection: 'row',
                marginTop: responsiveHeight(1),
              }}>
              <TouchableOpacity
                style={{
                  backgroundColor:
                    selectedTab === 'deposit'
                      ? COLORS.primary
                      : COLORS.lightWhite,
                  padding: responsiveWidth(1.5),
                  borderRadius: responsiveWidth(20),
                  borderColor:
                    selectedTab === 'deposit'
                      ? COLORS.lightWhite
                      : COLORS.primary,
                  borderWidth: 1,
                }}
                onPress={() => handleTabChange('deposit')}>
                <Text
                  style={{color: selectedTab === 'deposit' ? '#fff' : '#000'}}>
                  Deposit Trx
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={{
                  backgroundColor:
                    selectedTab === 'withdraw'
                      ? COLORS.primary
                      : COLORS.lightWhite,

                  padding: responsiveWidth(1.5),
                  borderRadius: responsiveWidth(20),
                  borderColor:
                    selectedTab === 'withdraw'
                      ? COLORS.lightWhite
                      : COLORS.primary,
                  borderWidth: 1,
                  marginLeft: responsiveWidth(3),
                }}
                onPress={() => handleTabChange('withdraw')}>
                <Text
                  style={{color: selectedTab === 'withdraw' ? '#fff' : '#000'}}>
                  Withdraw Trx
                </Text>
              </TouchableOpacity>
            </View>
          </View>

          {/* flatlist here  */}
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              // marginHorizontal: responsiveWidth(1),
              alignItems: 'center',
              backgroundColor: 'white',
              padding: responsiveWidth(4),
              borderRadius: responsiveWidth(10),
            }}>
            <View>
              <Text
                style={{
                  color: '#000',
                  fontSize: responsiveFontSize(1.8),
                  fontWeight: '700',
                }}>
                Id
              </Text>
            </View>
            <View>
              <Text
                style={{
                  color: '#000',
                  fontSize: responsiveFontSize(1.8),
                  fontWeight: '700',
                }}>
                Amount
              </Text>
            </View>
            <View>
              <Text
                style={{
                  color: '#000',
                  fontSize: responsiveFontSize(1.8),
                  fontWeight: '700',
                }}>
                Date
              </Text>
            </View>
            <View>
              <Text
                style={{
                  color: '#000',
                  fontSize: responsiveFontSize(1.8),
                  fontWeight: '700',
                }}>
                Status
              </Text>
            </View>
          </View>
          <FlatList
            data={transactionData}
            renderItem={renderUi}
            keyExtractor={item => item.id}
          />
        </View>
      </ScrollView>
    </LinearGradient>
  );
};

export default Funds;

const styles = StyleSheet.create({});
