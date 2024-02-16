import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Dimensions,
  ScrollView,
  Image,
  TextInput,
  ImageBackground,
} from 'react-native';
import React, {useRef, useState} from 'react';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {COLORS} from '../../constants/theme';
import Icon from 'react-native-vector-icons/AntDesign';
import Icon2 from 'react-native-vector-icons/Entypo';
import Icon3 from 'react-native-vector-icons/AntDesign';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {Divider, Switch} from 'react-native-paper';
import axios from 'axios';
import {getLiveTrade} from '../../redux/market/coinSlice';
import {
  responsiveFontSize,
  responsiveHeight,
  responsiveWidth,
} from 'react-native-responsive-dimensions';
import {useSelector, useDispatch} from 'react-redux';
import Iconic from 'react-native-vector-icons/Ionicons';
import BuySellButton from './BuySellButton';
import {useNavigation} from '@react-navigation/native';
import LinearGradient from 'react-native-linear-gradient';
import {incrementCounter, decrementCounter} from '../../redux/market/coinSlice';
import {useRoute} from '@react-navigation/native';
import {LineChart} from 'react-native-gifted-charts';
import {fetchCoinData} from '../../redux/market/coinSlice';
import {BottomSheetModal, BottomSheetModalProvider} from '@gorhom/bottom-sheet';
import {Modal, Portal, PaperProvider} from 'react-native-paper';
import Toast from 'react-native-toast-message';

const GraphUI = () => {
  const navigation = useNavigation();
  const route = useRoute();

  const selectedItem = route.params?.selectedItem;
  const counter = useSelector(state => state.coin.counter);
  const [error, setError] = useState('');
  const [isEnabled, setIsEnabled] = useState(false);
  const [visible, setVisible] = React.useState(false);
  const showModal = () => setVisible(true);
  const hideModal = () => setVisible(false);
  const dispatch = useDispatch();
  const [isSwitchOn, setIsSwitchOn] = React.useState(false);
  const [isSwitchOnTarget, setIsSwitchOnTarget] = useState(false);
  const onToggleSwitchTarget = () => setIsSwitchOnTarget(!isSwitchOnTarget);
  const onToggleSwitch = () => setIsSwitchOn(!isSwitchOn);
  const [stopLoss, setStopLoss] = useState('0');
  const [target, setTarget] = useState('0');
  const [orderType, setOrderType] = useState('Market'); // Initially, set to 'Market'
  const [buyingPrice, setBuyingPrice] = useState(selectedItem.price);
  const containerStyle = {
    backgroundColor: '#fff',
    width: responsiveWidth(90),
    height: responsiveHeight(40),
    borderRadius: responsiveWidth(3),
    alignSelf: 'center',
  };
  // console.log('selectedItem', selectedItem);
  // Go back to the previous screen
  const handleGoBack = () => {
    navigation.goBack();
  };

  const tradeUiNavigate = () => {
    hideModal();
    handleCloseModal();
  };

  const customDataPoint = () => {
    return (
      <View
        style={{
          width: 20,
          height: 20,
          backgroundColor: 'white',
          borderWidth: 4,
          borderRadius: 10,
          borderColor: '#07BAD1',
        }}
      />
    );
  };
  const customLabel = val => {
    return (
      <View style={{width: 70, marginLeft: 7}}>
        <Text style={{color: 'white', fontWeight: 'bold'}}>{val}</Text>
      </View>
    );
  };
  const data = [
    {
      value: 100,
      labelComponent: () => customLabel('22 Nov'),
      customDataPoint: customDataPoint,
    },
    {
      value: 140,
      hideDataPoint: true,
    },
    {
      value: 250,
      customDataPoint: customDataPoint,
    },
    {
      value: 290,
      hideDataPoint: true,
    },
    {
      value: 410,
      labelComponent: () => customLabel('24 Nov'),
      customDataPoint: customDataPoint,
      showStrip: true,
      stripHeight: 190,
      stripColor: 'black',
      dataPointLabelComponent: () => {
        return (
          <View
            style={{
              backgroundColor: 'black',
              paddingHorizontal: 8,
              paddingVertical: 5,
              borderRadius: 4,
            }}>
            <Text style={{color: 'white'}}>410</Text>
          </View>
        );
      },
      dataPointLabelShiftY: -70,
      dataPointLabelShiftX: -4,
    },
    {
      value: 440,
      hideDataPoint: true,
    },
    {
      value: 300,
      customDataPoint: customDataPoint,
    },
    {
      value: 280,
      hideDataPoint: true,
    },
    {
      value: 180,
      labelComponent: () => customLabel('26 Nov'),
      customDataPoint: customDataPoint,
    },
    {
      value: 150,
      hideDataPoint: true,
    },
    {
      value: 150,
      customDataPoint: customDataPoint,
    },
  ];

  const bottomSheetModalRef = useRef(null);

  let snapPoints = [];

  if (isSwitchOn && isSwitchOnTarget) {
    snapPoints.push('79%');
  } else if (isSwitchOn) {
    snapPoints.push('74%');
  }

  if (snapPoints.length === 0) {
    snapPoints.push('68%'); //  '68%'  default value
  }

  const handleBuyPressModal = () => {
    bottomSheetModalRef.current?.present();
    handleBuyClick();
  };

  const handleSellPressModal = () => {
    bottomSheetModalRef.current?.present();
    handleSellClick();
  };

  const handleCloseModal = () => {
    bottomSheetModalRef.current?.dismiss();
  };

  const handleIncrement = () => {
    dispatch(incrementCounter());
  };

  const handleDecrement = () => {
    if (counter === 1) {
      return;
    }
    dispatch(decrementCounter());
  };

  const handleInputChange = (name, value) => {
    if (!isEnabled) {
      // If the toggle button is not enabled, set stop_loss and target to 0
      setBuyInputeFeild(prevState => ({
        ...prevState,
        [name]: value,
        stop_loss: '0',
        target: '0',
      }));
    } else {
      // If the toggle button is enabled, set the values based on the input
      setBuyInputeFeild(prevState => ({
        ...prevState,
        [name]: value,
      }));
    }
  };

  const [isBuyActive, setIsBuyActive] = useState(false);
  const [isSellActive, setIsSellActive] = useState(false);

  const handleBuyClick = () => {
    setIsBuyActive(true);
    setIsSellActive(false);

    // Add your Buy logic here
  };

  const handleSellClick = () => {
    setIsBuyActive(false);
    setIsSellActive(true);
    // Add your Sell logic here
  };

  // Api Functionalty start here

  const handleOrderTypeChange = type => {
    setOrderType(type);
    if (type === 'Market') {
      setBuyingPrice(selectedItem.price);
    } else {
      // Reset buyingPrice or initialize it with some default value
      setBuyingPrice('');
    }
  };

  const showToast = errorMessage => {
    Toast.show({
      type: 'error', // Assuming you have a type for error messages
      text1: 'Error',
      text2: errorMessage,
      text1Style: {fontSize: responsiveFontSize(2)},
      text2Style: {fontSize: responsiveFontSize(1.6)},
    });
  };

  const BuySellapi = async () => {
    try {
      const access_token = await AsyncStorage.getItem('accessToken');
      const config = {
        headers: {
          Authorization: `Bearer ${access_token}`,
        },
      };

      const payload = {
        select_asset: selectedItem.trade_name,
        max_lot: counter,
        target: target,
        stop_loss: stopLoss,
        trade_type: 'intraday',
        market_price: orderType === 'Market' ? 'SET_TRADE' : '', // Include 'market_price' only for Market order
        limit: orderType === 'Limit' ? buyingPrice : selectedItem.price, // Include 'limit' only for Limit order
      };

      if (isBuyActive) {
        payload.trade_mode = 'buy';
      } else if (isSellActive) {
        payload.trade_mode = 'sell';
      } else {
        // Handle the case where neither Buy nor Sell is active
        console.error('Neither Buy nor Sell is active.');
        return;
      }

      console.log('payload', payload);
      const res = await axios.post(
        'https://app.srninfotech.com/bullsPanel/api/add-trade',
        payload,
        config,
      );
      console.log('res', res.data.response);
      // showModal();
      if (res.data.response === true) {
        dispatch(getLiveTrade());
        showModal();
      } else {
        console.log('something wrong');
      }
    } catch (error) {
      // const AllErrors = error.response.data.errors.limit;
      const AllErrors = error.response.data.errors;
      const errorBuySell = Object.values(AllErrors);

      const errorCatch = errorBuySell.map(e => e[0]);

      showToast(errorCatch.join(' ,'));
    }
  };

  return (
    <PaperProvider>
      <BottomSheetModalProvider>
        <View style={{backgroundColor: 'blue'}}>
          <View style={styles.searchContainer}>
            <View
              style={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                flexDirection: 'row',
                gap: 40,
              }}>
              <View>
                <TouchableOpacity onPress={handleGoBack}>
                  <Iconic name="arrow-back" size={25} color={'white'} />
                </TouchableOpacity>
              </View>
              <View style={{justifyContent: 'center', alignItems: 'center'}}>
                <Text
                  style={{
                    fontSize: responsiveFontSize(2.5),
                    fontWeight: '700',
                    color: COLORS.white,
                  }}>
                  {selectedItem.trade_name}
                </Text>
                <Text
                  style={{color: '#fff', fontSize: responsiveFontSize(2.2)}}>
                  ₹ {selectedItem.price}
                </Text>
              </View>
            </View>
            <TouchableOpacity onPress={() => console.log('notification')}>
              <Icon2
                name="star-outlined"
                size={responsiveFontSize(4)}
                color={COLORS.white}
              />
            </TouchableOpacity>
          </View>

          {/* header Ui end here */}

          <View
            style={{
              width: responsiveWidth(100),
              height: responsiveHeight(100),
              backgroundColor: '#fff',
              alignSelf: 'center',
              borderTopLeftRadius: responsiveWidth(8),
              borderTopRightRadius: responsiveWidth(8),
              position: 'absolute',
              top: responsiveHeight(13),
            }}>
            <View style={styles.lowHigh}>
              <View
                style={{
                  borderRightWidth: 2,
                  borderColor: COLORS.primary,
                  paddingVertical: 15,
                }}>
                <View
                  style={{
                    paddingRight: responsiveWidth(3),
                    flexDirection: 'row',
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}>
                  <View
                    style={{
                      width: responsiveWidth(8),
                      height: responsiveHeight(4),
                      backgroundColor: 'rgba(104,195,163,0.5)',
                      justifyContent: 'center',
                      alignItems: 'center',
                      borderRadius: responsiveWidth(6),
                      marginRight: responsiveWidth(1),
                    }}>
                    <Icon
                      name="arrowup"
                      size={responsiveFontSize(3)}
                      color={'green'}
                    />
                  </View>

                  <Text
                    style={[
                      styles.headingText,
                      {fontSize: responsiveFontSize(2.5), color: 'green'},
                    ]}>
                    {selectedItem.price}
                  </Text>
                </View>
              </View>
              {/* main View */}
              <View
                style={{
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                }}>
                <View
                  style={{flexDirection: 'row', gap: 10, paddingVertical: 10}}>
                  <Text style={styles.headingText}>
                    <Text style={{color: '#A9A9A9'}}> Open: </Text>
                    {selectedItem.open}
                  </Text>
                  <Text style={styles.headingText}>
                    <Text style={{color: '#A9A9A9'}}> High: </Text>
                    {selectedItem.high}
                  </Text>
                </View>
                <View style={{flexDirection: 'row', alignSelf: 'flex-start'}}>
                  <Text style={styles.headingText}>
                    <Text style={{color: '#A9A9A9'}}> Low: </Text>{' '}
                    {selectedItem.low}
                  </Text>
                </View>
              </View>
            </View>

            {/* Graph Ui Here */}

            <LinearGradient
              start={{x: -0.1, y: 0.8}}
              end={{x: 1, y: 1}}
              colors={['#4D5DFB', '#08C8F6']}
              style={{
                marginTop: responsiveHeight(3),
                paddingVertical: 50,
                width: responsiveWidth(90),
                height: responsiveHeight(40),
                alignSelf: 'center',
                borderRadius: responsiveWidth(2),
                shadowColor: 'blue',
                elevation: 15,
              }}>
              <LineChart
                thickness={6}
                color="#07BAD1"
                maxValue={600}
                noOfSections={4}
                areaChart
                yAxisTextStyle={{color: 'lightgray'}}
                data={data}
                curved
                startFillColor={'rgb(84,219,234)'}
                endFillColor={'rgb(84,219,234)'}
                startOpacity={0.4}
                endOpacity={0.4}
                spacing={30}
                // backgroundColor='#616DBC'
                rulesColor="gray"
                rulesType="solid"
                initialSpacing={10}
                yAxisColor="lightgray"
                xAxisColor="lightgray"
                dataPointsHeight={20}
                dataPointsWidth={20}
              />
            </LinearGradient>

            <View
              style={{
                width: responsiveWidth(100),
                height: responsiveHeight(15),
                backgroundColor: 'blue',
                alignSelf: 'center',
                borderTopRightRadius: responsiveWidth(7),
                borderTopLeftRadius: responsiveWidth(7),
                marginTop: responsiveHeight(15),
              }}>
              <Image
                source={require('../../../assets/images/dotleft.png')}
                resizeMode="cover"
                style={{
                  position: 'absolute',
                  top: 20,
                  right: 10,
                }}
              />

              <Image
                source={require('../../../assets/images/dotright.png')}
                resizeMode="cover"
                style={{
                  position: 'absolute',
                  bottom: 20,
                  left: 10,
                }}
              />

              <View
                style={{
                  position: 'absolute',
                  width: responsiveWidth(50),
                  height: responsiveHeight(6),
                  backgroundColor: 'white',
                  alignSelf: 'center',
                  borderBottomRightRadius: responsiveWidth(3),
                  borderBottomLeftRadius: responsiveWidth(3),
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  paddingHorizontal: responsiveWidth(2.5),
                  shadowColor: '#000',
                  elevation: 10,
                  shadowOffset: 25,
                  shadowRadius: 10,
                }}>
                <BuySellButton
                  label="Buy"
                  backgroundColor="green"
                  onPress={handleBuyPressModal}
                />

                <BuySellButton
                  label="Sell"
                  backgroundColor="red"
                  onPress={handleSellPressModal}
                />
              </View>
            </View>

            {/* <CandlestickChart data={data} width={400} height={400} /> */}

            <BottomSheetModal
              ref={bottomSheetModalRef}
              index={0}
              snapPoints={snapPoints}
              backgroundStyle={{
                borderRadius: responsiveWidth(5),
                backgroundColor: '#D1D1D1',
              }}>
              {/* Content of your bottom sheet */}
              <View style={{flex: 1}}>
                <View style={{flex: 1}}></View>
                <View style={styles.topContentBottomsheet}>
                  <View>
                    <Text
                      style={{
                        fontSize: responsiveFontSize(2.5),
                        color: '#000',
                        fontWeight: '700',
                        letterSpacing: responsiveWidth(0.2),
                      }}>
                      {selectedItem.trade_name}
                    </Text>
                    <Text
                      style={{
                        fontSize: responsiveFontSize(2),
                        color: 'green',
                        fontWeight: '400',
                        letterSpacing: responsiveWidth(0.2),
                      }}>
                      Bid: {selectedItem.price}
                    </Text>
                  </View>

                  <TouchableOpacity
                    style={{
                      width: responsiveWidth(8),
                      height: responsiveWidth(8),
                      borderRadius: responsiveWidth(4),
                      backgroundColor: '#fff',
                      justifyContent: 'center',
                      alignItems: 'center',
                      shadowColor: '#000',
                      elevation: 5,
                    }}
                    onPress={handleCloseModal}>
                    <Icon3
                      name="close"
                      size={responsiveFontSize(2.5)}
                      color={COLORS.gray}
                    />
                  </TouchableOpacity>
                </View>
                <View
                  style={{
                    display: 'flex',
                    justifyContent: 'space-around',
                    alignItems: 'flex-start',
                    paddingLeft: responsiveWidth(5),
                  }}>
                  <View
                    style={{
                      flexDirection: 'row',
                      gap: 30,
                      paddingTop: responsiveHeight(1),
                    }}>
                    <Text style={styles.headingText}>
                      <Text style={{color: 'gray'}}> Open: </Text>
                      {selectedItem.open}
                    </Text>
                    <Text style={styles.headingText}>
                      <Text style={{color: 'gray'}}> High: </Text>
                      {selectedItem.high}
                    </Text>
                    <Text style={styles.headingText}>
                      <Text style={{color: 'gray'}}> Low: </Text>{' '}
                      {selectedItem.low}
                    </Text>
                  </View>
                </View>
                {/* signals end here  */}

                <View
                  style={{
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    flexDirection: 'row',
                    marginHorizontal: responsiveWidth(5),
                    paddingTop: responsiveHeight(2),
                  }}>
                  <TouchableOpacity
                    onPress={handleBuyClick}
                    style={[
                      styles.BottomSheetButtonStyle,
                      {
                        backgroundColor: isBuyActive ? 'green' : '#efefef',
                        shadowColor: 'green',
                        elevation: 5,
                      },
                    ]}>
                    <Text
                      style={{
                        fontSize: responsiveFontSize(2.2),
                        color: isBuyActive ? 'white' : 'black',
                        fontWeight: '700',
                        letterSpacing: responsiveWidth(0.2),
                      }}>
                      Buy
                    </Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    onPress={handleSellClick}
                    style={[
                      styles.BottomSheetButtonStyle,
                      {
                        backgroundColor: isSellActive ? 'red' : '#efefef',
                        shadowColor: 'red',
                        elevation: 5,
                      },
                    ]}>
                    <Text
                      style={{
                        fontSize: responsiveFontSize(2.2),
                        color: isSellActive ? 'white' : 'black',
                        fontWeight: '700',
                        letterSpacing: responsiveWidth(0.2),
                      }}>
                      Sell
                    </Text>
                  </TouchableOpacity>
                </View>
                {/* button ui end here  */}

                <View
                  style={{
                    width: responsiveWidth(90),
                    //   height: responsiveHeight(33),
                    // paddingBottom: responsiveHeight(1),
                    backgroundColor: '#efefef',
                    alignSelf: 'center',
                    marginTop: responsiveHeight(1.6),
                    borderRadius: responsiveWidth(2),
                    shadowColor: '#000',
                    elevation: 2,
                  }}>
                  {/*  main container */}
                  <View
                    style={{
                      backgroundColor: `rgba(0,128,0,0.1)`,
                      width: responsiveWidth(20),
                      height: responsiveHeight(4),
                      borderRadius: responsiveWidth(1),
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}>
                    <Text
                      style={{
                        color: `rgba(0,128,0,1)`,
                        fontSize: responsiveFontSize(1.8),
                        fontWeight: '400',
                      }}>
                      Intraday
                    </Text>
                  </View>
                  {/* ddfd */}

                  <View
                    style={{justifyContent: 'center', alignItems: 'center'}}>
                    <Text
                      style={{
                        color: '#000',
                        fontSize: responsiveFontSize(1.8),
                      }}>
                      Max Lot
                    </Text>
                  </View>

                  <View
                    style={{
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      // backgroundColor: 'green',
                      flexDirection: 'row',
                      marginHorizontal: responsiveWidth(5),
                      marginVertical: responsiveHeight(1),
                    }}>
                    <View>
                      <TouchableOpacity onPress={handleDecrement}>
                        <AntDesign
                          name="minuscircleo"
                          size={responsiveFontSize(2.5)}
                          color={`rgba(255,0,0,0.5)`}
                          style={{marginRight: responsiveWidth(5)}}
                        />
                      </TouchableOpacity>
                    </View>

                    <View>
                      <TextInput
                        value={counter.toString()} // Convert the counter value to a string before passing it to the text input
                        onChangeText={value =>
                          handleInputChange('counter', parseInt(value, 10))
                        } // Parse the value as an integer before passing it to the handleInputChange functionp
                        keyboardType="numeric"
                        maxLength={7}
                        placeholderTextColor={'#000'}
                        style={{
                          fontSize: responsiveFontSize(2.5),
                          color: '#000',
                        }}
                      />
                    </View>

                    <View>
                      <TouchableOpacity onPress={handleIncrement}>
                        <AntDesign
                          name="pluscircleo"
                          size={responsiveFontSize(2.5)}
                          color={`rgba(0,128,0,1)`}
                          style={{marginRight: responsiveWidth(1)}}
                        />
                      </TouchableOpacity>
                    </View>
                    {/* <Text>{selectedItem ? selectedItem.price : ''} </Text> */}
                  </View>
                  <Divider
                    style={{borderColor: `rgba(0,128,0,0.3)`, borderWidth: 1}}
                  />

                  {/* max lot end here  */}
                  <View
                    style={{
                      marginHorizontal: responsiveWidth(2),
                      marginVertical: responsiveHeight(0.6),
                      flexDirection: 'row',
                      justifyContent: 'space-between',
                    }}>
                    <Text
                      style={{
                        fontSize: responsiveFontSize(2),
                        fontWeight: '500',
                        color: '#000',
                      }}>
                      Order Type
                    </Text>
                    <Text
                      style={{
                        fontSize: responsiveFontSize(2),
                        fontWeight: '500',
                        color: '#000',
                        marginRight: responsiveWidth(2),
                      }}>
                      Buying Price
                    </Text>
                  </View>
                  <View
                    style={{
                      justifyContent: 'space-between',
                      flexDirection: 'row',
                      marginHorizontal: responsiveWidth(2),
                      alignItems: 'center',
                    }}>
                    <View>
                      <View style={{flexDirection: 'row'}}>
                        <TouchableOpacity
                          style={[
                            styles.orderType,
                            orderType === 'Limit' && {backgroundColor: 'green'},
                          ]}
                          onPress={() => handleOrderTypeChange('Limit')}>
                          <Text
                            style={{
                              fontSize: responsiveFontSize(1.5),
                              fontWeight: '500',
                              color: '#fff',
                            }}>
                            Limit
                          </Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                          style={[
                            styles.orderType,
                            {marginLeft: responsiveWidth(3)},
                            orderType === 'Market' && {
                              backgroundColor: 'green',
                            },
                          ]}
                          onPress={() => handleOrderTypeChange('Market')}>
                          <Text
                            style={{
                              fontSize: responsiveFontSize(1.5),
                              fontWeight: '500',
                              color: '#fff',
                            }}>
                            Market
                          </Text>
                        </TouchableOpacity>
                      </View>
                    </View>

                    <View>
                      <TextInput
                        editable
                        maxLength={40}
                        value={buyingPrice.toString()}
                        onChangeText={text => setBuyingPrice(text)}
                        placeholder={
                          orderType === 'Market'
                            ? 'Market Price'
                            : 'Enter Price'
                        }
                        style={{
                          borderColor: 'gray',
                          borderWidth: 1,
                          width: responsiveWidth(25),
                          height: responsiveHeight(5),
                          borderRadius: responsiveWidth(1),
                          fontSize: responsiveFontSize(2),
                          color: '#000',
                        }}
                      />
                    </View>
                  </View>

                  <View>
                    <View
                      style={{
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        flexDirection: 'row',
                        paddingHorizontal: responsiveWidth(5),
                        paddingVertical: responsiveHeight(2),
                        backgroundColor: 'lightgray',
                      }}>
                      <View
                        style={{
                          justifyContent: 'center',
                          alignItems: 'center',
                        }}>
                        <Text
                          style={{
                            color: '#000',
                            fontSize: responsiveFontSize(2),
                            fontWeight: '500',
                          }}>
                          Stop Loss
                        </Text>
                      </View>
                      <View
                        style={{
                          justifyContent: 'flex-end',
                          alignItems: 'flex-end',
                          alignSelf: 'flex-end',
                        }}>
                        <Switch
                          value={isSwitchOn}
                          onValueChange={onToggleSwitch}
                          color="green"
                        />
                      </View>
                    </View>

                    {isSwitchOn && (
                      <View>
                        <TextInput
                          value={stopLoss}
                          onChangeText={text => setStopLoss(text)}
                          placeholder="StopLoss"
                          style={styles.stoplossBox}
                        />
                      </View>
                    )}
                  </View>

                  <Divider style={{borderColor: 'gray', borderWidth: 0.2}} />
                  {/* switch  stoploss end */}
                  <View
                    style={{
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      flexDirection: 'row',
                      paddingHorizontal: responsiveWidth(5),
                      paddingVertical: responsiveHeight(2),
                      backgroundColor: 'lightgray',
                    }}>
                    <View
                      style={{
                        justifyContent: 'center',
                        alignItems: 'center',
                      }}>
                      <Text
                        style={{
                          color: '#000',
                          fontSize: responsiveFontSize(2),
                          fontWeight: '500',
                        }}>
                        Take Profit
                      </Text>
                    </View>
                    <View
                      style={{
                        justifyContent: 'flex-end',
                        alignItems: 'flex-end',
                        alignSelf: 'flex-end',
                      }}>
                      <Switch
                        value={isSwitchOnTarget}
                        onValueChange={onToggleSwitchTarget}
                        color="green"
                      />
                    </View>
                  </View>
                  {isSwitchOnTarget && (
                    <View>
                      <TextInput
                        value={target}
                        onChangeText={text => setTarget(text)}
                        placeholder="TakeProfit"
                        style={[
                          styles.stoplossBox,
                          {borderColor: `rgba(0,128,0,1)`},
                        ]}
                      />
                    </View>
                  )}

                  <Divider />
                </View>

                {/* shadow box end here */}

                <View
                  style={{
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    flexDirection: 'row',
                    marginHorizontal: responsiveWidth(5),
                    marginVertical: responsiveHeight(2),
                  }}>
                  <View>
                    <Text
                      style={{
                        color: '#000',
                        fontSize: responsiveFontSize(2),
                        fontWeight: '500',
                      }}>
                      Margin :{' '}
                    </Text>
                  </View>
                  <TouchableOpacity
                    style={{
                      width: responsiveWidth(40),
                      height: responsiveHeight(6),
                      justifyContent: 'center',
                      alignItems: 'center',
                      backgroundColor: isSellActive ? 'red' : 'green',
                      borderRadius: responsiveWidth(1),
                    }}
                    onPress={BuySellapi}>
                    <Text
                      style={{
                        color: '#fff',
                        fontSize: responsiveFontSize(2),
                        fontWeight: '500',
                      }}>
                      {isSellActive ? 'Sell' : 'Buy'} {buyingPrice}
                      {/* {isSellActive ? 'Sell' : 'Buy'} {selectedItem.price} */}
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>
            </BottomSheetModal>

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
                    Trade Is successfully placed
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
                    onPress={tradeUiNavigate}>
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
        </View>
      </BottomSheetModalProvider>
    </PaperProvider>
  );
};

export default GraphUI;
const styles = StyleSheet.create({
  searchContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    paddingHorizontal: responsiveWidth(5),
    paddingVertical: responsiveWidth(3),
    height: responsiveHeight(20),
    paddingTop: responsiveHeight(3),
  },
  orderType: {
    justifyContent: 'center',
    alignItems: 'center',
    width: responsiveWidth(15),
    height: responsiveHeight(4),
    backgroundColor: '#000',
    borderRadius: responsiveWidth(1),
  },

  headingText: {
    fontSize: responsiveFontSize(2),
    fontWeight: '500',
    color: COLORS.black,
  },
  upDown: {
    width: responsiveWidth(18),
    height: responsiveHeight(5),
    backgroundColor: 'red',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: responsiveWidth(1.2),
    marginRight: responsiveWidth(5),
  },

  lowHigh: {
    display: 'flex',
    width: responsiveWidth(90),
    height: responsiveHeight(12),
    backgroundColor: '#ecf3f9',
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    borderWidth: 1,
    borderColor: 'rgba(200,200,200,0.5)',
    shadowColor: 'black',
    elevation: '10',
    flexDirection: 'row',
    gap: 20,
    borderRadius: responsiveWidth(2),
    elevation: 10,
    shadowOffset: 2,
    shadowColor: 'blue',
    marginTop: responsiveHeight(5),
  },
  innerLow: {
    width: responsiveWidth(25),
    height: responsiveHeight(5),
    backgroundColor: 'rgba(57,73,171,0.2)',
    borderRadius: responsiveWidth(5),
    justifyContent: 'center',
    alignItems: 'center',
  },
  LowText: {
    fontSize: responsiveFontSize(2),
    fontWeight: '400',
    color: COLORS.white,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    width: '100%',
    paddingHorizontal: responsiveWidth(5),
    paddingVertical: responsiveHeight(4),
    borderTopLeftRadius: responsiveWidth(10),
  },
  backIcon: {
    justifyContent: 'center',
    alignItems: 'center',
    width: responsiveWidth(9),
    height: responsiveWidth(9),
    borderRadius: responsiveWidth(4.4),
    // backgroundColor: "#616DBC",
    backgroundColor: '#fff',
  },
  topContentBottomsheet: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'row',
    paddingHorizontal: responsiveWidth(5),
  },
  BottomSheetButtonStyle: {
    width: responsiveWidth(40),
    height: responsiveHeight(5),
    backgroundColor: 'green',
    borderRadius: responsiveWidth(1),
    justifyContent: 'center',
    alignItems: 'center',
  },
  stoplossBox: {
    marginHorizontal: responsiveWidth(5),
    height: responsiveHeight(5),
    borderRadius: responsiveWidth(1),
    alignSelf: 'center',
    paddingHorizontal: responsiveWidth(2),
    textAlign: 'center',
    borderBottomWidth: 2,
    borderTopWidth: 2,
    borderLeftWidth: 0.5,
    borderRightWidth: 0.5,
    borderColor: `rgba(255,0,0,0.5)`,
    fontSize: responsiveFontSize(2.1),
    color: '#000',
    shadowColor: '#000000',
    shadowOpacity: 0.8,
    shadowRadius: 2,
    shadowOffset: {
      height: 1,
      width: 1,
    },
  },
});
