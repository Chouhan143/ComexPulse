import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Dimensions,
  ScrollView,
  Image,
  TextInput,
} from 'react-native';
import React, {useRef, useState} from 'react';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {COLORS} from '../../constants/theme';
import Icon from 'react-native-vector-icons/AntDesign';
import Icon2 from 'react-native-vector-icons/Entypo';
import Icon3 from 'react-native-vector-icons/AntDesign';
import {Divider, Switch} from 'react-native-paper';
import {
  responsiveFontSize,
  responsiveHeight,
  responsiveWidth,
} from 'react-native-responsive-dimensions';
import {useSelector, useDispatch} from 'react-redux';
import BuySellButton from './BuySellButton';
import {useNavigation} from '@react-navigation/native';
import LinearGradient from 'react-native-linear-gradient';
import {incrementCounter, decrementCounter} from '../../redux/market/coinSlice';
import {useRoute} from '@react-navigation/native';
import {LineChart} from 'react-native-gifted-charts';
import {fetchCoinData} from '../../redux/market/coinSlice';
import {BottomSheetModal, BottomSheetModalProvider} from '@gorhom/bottom-sheet';
const GraphUI = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const selectedItem = route.params?.selectedItem;
  const counter = useSelector(state => state.coin.counter);
  const [isPressed, setIsPressed] = useState(false);
  const dispatch = useDispatch();
  const [isSwitchOn, setIsSwitchOn] = React.useState(false);
  const [isSwitchOnTarget, setIsSwitchOnTarget] = useState(false);
  const onToggleSwitchTarget = () => setIsSwitchOnTarget(!isSwitchOnTarget);
  const onToggleSwitch = () => setIsSwitchOn(!isSwitchOn);
  console.log('selectedItem', selectedItem);
  const handleGoBack = () => {
    navigation.goBack(); // Go back to the previous screen
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
  const snapPoints = ['63%'];

  const handlePressModal = () => {
    bottomSheetModalRef.current?.present();
  };

  const handleCloseModal = () => {
    bottomSheetModalRef.current?.dismiss();
  };

  const handlePressIn = event => {
    event.persist();
    setIsPressed(true);
  };

  const handlePressOut = event => {
    event.persist();
    setIsPressed(false);
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

  return (
    <BottomSheetModalProvider>
      <View style={{flex: 1, backgroundColor: 'rgba(200,200,200,0.8)'}}>
        <View>
          <Image
            source={require('../../../assets/images/topBg.jpg')}
            style={{
              width: responsiveWidth(100),
              height: responsiveHeight(40),
              position: 'absolute',
            }}
          />
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
                <TouchableOpacity
                  onPress={handleGoBack}
                  style={styles.backIcon}>
                  <Icon
                    name="left"
                    size={responsiveFontSize(3)}
                    color={COLORS.black}
                  />
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
        </View>
        {/* header Ui end here */}

        <View
          style={{
            width: responsiveWidth(100),
            height: responsiveHeight(100),
            backgroundColor: '#fff',
            alignSelf: 'center',
            borderTopLeftRadius: responsiveWidth(15),
            borderTopRightRadius: responsiveWidth(15),
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
              width: responsiveWidth(100),
              height: responsiveHeight(50),
              alignSelf: 'center',
              borderRadius: responsiveWidth(3),
              shadowColor: '#000',
              elevation: 5,
            }}>
            <LineChart
              thickness={6}
              color="#07BAD1"
              maxValue={600}
              noOfSections={3}
              areaChart
              yAxisTextStyle={{color: 'lightgray'}}
              data={data}
              curved
              startFillColor={'rgb(84,219,234)'}
              endFillColor={'rgb(84,219,234)'}
              startOpacity={0.4}
              endOpacity={0.4}
              spacing={38}
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

          {/* Buy & Sell Button  */}

          <View style={styles.buttonContainer}>
            <BuySellButton
              label="Buy"
              backgroundColor="green"
              onPress={handlePressModal}
            />

            <BuySellButton
              label="Sell"
              backgroundColor="red"
              onPress={handlePressModal}
            />
          </View>

          <BottomSheetModal
            ref={bottomSheetModalRef}
            index={0}
            snapPoints={snapPoints}
            backgroundStyle={{borderRadius: responsiveWidth(5)}}>
            {/* Content of your bottom sheet */}
            <View style={{flex: 1}}>
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

                <TouchableOpacity onPress={handleCloseModal}>
                  <Icon3
                    name="closecircle"
                    size={responsiveFontSize(3)}
                    color={COLORS.black}
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
                    <Text style={{color: '#A9A9A9'}}> Open: </Text>
                    {selectedItem.open}
                  </Text>
                  <Text style={styles.headingText}>
                    <Text style={{color: '#A9A9A9'}}> High: </Text>
                    {selectedItem.high}
                  </Text>
                  <Text style={styles.headingText}>
                    <Text style={{color: '#A9A9A9'}}> Low: </Text>{' '}
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
                    {backgroundColor: isBuyActive ? 'green' : '#efefef'},
                  ]}>
                  <Text
                    style={{
                      fontSize: responsiveFontSize(2.2),
                      color: COLORS.white,
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
                    {backgroundColor: isSellActive ? 'red' : '#efefef'},
                  ]}>
                  <Text
                    style={{
                      fontSize: responsiveFontSize(2.2),
                      color: '#a49cd3',
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
                  paddingBottom: responsiveHeight(4),
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
                    backgroundColor: 'blue',
                    width: responsiveWidth(20),
                    height: responsiveHeight(4),
                    borderRadius: responsiveWidth(1),
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}>
                  <Text
                    style={{
                      color: '#fff',
                      fontSize: responsiveFontSize(1.8),
                      fontWeight: '400',
                    }}>
                    Intraday
                  </Text>
                </View>
                {/* ddfd */}

                <View style={{justifyContent: 'center', alignItems: 'center'}}>
                  <Text
                    style={{color: '#000', fontSize: responsiveFontSize(1.8)}}>
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
                        color="#000"
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
                      style={{fontSize: responsiveFontSize(2.5), color: '#000'}}
                    />
                  </View>

                  <View>
                    <TouchableOpacity onPress={handleIncrement}>
                      <AntDesign
                        name="pluscircleo"
                        size={responsiveFontSize(2.5)}
                        color="#000"
                        style={{marginRight: responsiveWidth(1)}}
                      />
                    </TouchableOpacity>
                  </View>
                  {/* <Text>{selectedItem ? selectedItem.price : ''} </Text> */}
                </View>
                <Divider />
                {/* max lot end here  */}
                <View
                  style={{
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    flexDirection: 'row',
                    paddingHorizontal: responsiveWidth(5),
                    paddingVertical: responsiveHeight(2),
                  }}>
                  <View
                    style={{
                      justifyContent: 'center',
                      alignItems: 'center',
                    }}>
                    <Text
                      style={{
                        color: '#000',
                        fontSize: responsiveFontSize(1.8),
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
                <Divider />
                {/* switch  stoploss end */}
                <View
                  style={{
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    flexDirection: 'row',
                    paddingHorizontal: responsiveWidth(5),
                    paddingVertical: responsiveHeight(2),
                  }}>
                  <View
                    style={{
                      justifyContent: 'center',
                      alignItems: 'center',
                    }}>
                    <Text
                      style={{
                        color: '#000',
                        fontSize: responsiveFontSize(1.8),
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
                <View
                  style={{
                    width: responsiveWidth(40),
                    height: responsiveHeight(6),
                    justifyContent: 'center',
                    alignItems: 'center',
                    backgroundColor: 'green',
                    borderRadius: responsiveWidth(1),
                  }}>
                  <Text
                    style={{
                      color: '#fff',
                      fontSize: responsiveFontSize(2),
                      fontWeight: '500',
                    }}>
                    Buy {selectedItem.price}
                  </Text>
                </View>
              </View>
            </View>
          </BottomSheetModal>
        </View>
      </View>
    </BottomSheetModalProvider>
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
    paddingTop: responsiveHeight(5),
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
    width: responsiveWidth(95),
    height: responsiveHeight(12),
    backgroundColor: '#fff',
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
    elevation: 5,
    shadowOffset: 2,
    shadowColor: '#000',
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
});
