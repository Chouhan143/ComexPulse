import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  FlatList,
  Alert,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {TextInput, Button} from 'react-native-paper';
import {
  responsiveWidth,
  responsiveHeight,
  responsiveFontSize,
} from 'react-native-responsive-dimensions';
import {useNavigation} from '@react-navigation/native';
import Icon from 'react-native-vector-icons/AntDesign';
import {COLORS} from '../../../constants/theme';
import coinSlice, {
  getLiveTrade,
  updateLiveTrade,
} from '../../../redux/market/coinSlice';
import {useSelector, useDispatch} from 'react-redux';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Entypo from 'react-native-vector-icons/Entypo';
import Modal from 'react-native-modal';
import * as Animatable from 'react-native-animatable';
import axios from 'axios';
import Toast from 'react-native-toast-message';
import AsyncStorage from '@react-native-async-storage/async-storage';
const LiveTrade = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const [selectedItem, setSelectedItem] = useState(null);
  const [los, setLos] = React.useState('');
  const [target, setTarget] = React.useState('');
  const [refreshing, setRefreshing] = useState(false);
  const [isModalVisible, setModalVisible] = useState(false);
  const [showHolding, setShowHolding] = useState(false);

  const LiveTrade = useSelector(state => state.coin.liveTradedata);

  console.log('LiveTrade dfgsdguysygfgdsfuy ===>', LiveTrade);

  const allowSquareOffArray = LiveTrade.map(trade => trade.allow_square_off);

  const allowHoldingArray = LiveTrade.map(trade => trade.allow_to_hold);

  console.log(allowHoldingArray, 'fddf');

  const onRefresh = async () => {
    setRefreshing(true);
    try {
      // Fetch updated data
      await dispatch(getLiveTrade());
    } catch (error) {
      console.error('Error refreshing data:', error);
    } finally {
      setRefreshing(false);
    }
  };

  const openModal = item => {
    setSelectedItem(item);
    setLos(item.stop_loss.toString()); // Initialize with existing values
    setTarget(item.target.toString()); // Initialize with existing values
    setModalVisible(true);
  };

  const closeModal = () => {
    setModalVisible(false);
  };

  useEffect(() => {
    // Dispatch the getLiveTrade action when the component mounts
    const intervalId = setInterval(() => {
      dispatch(getLiveTrade());
      dispatch(updateLiveTrade());
    }, 5000);

    return () => {
      clearInterval(intervalId);
    };
  }, []);

  const squreOffhandle = item => {
    if (item) {
      setSelectedItem(item);
      Alert.alert(
        'Confirm',
        'Are you sure you want to Square Off?',
        [
          {
            text: 'Cancel',
            style: 'cancel',
          },
          {
            text: 'OK',
            onPress: () => SquareOff(item.id),
          },
        ],
        {cancelable: false},
      );
    }
  };

  const SquareOff = async tradeId => {
    try {
      const access_token = await AsyncStorage.getItem('accessToken');

      // console.log(access_token, tradeId, 'get accessToken');
      const config = {
        headers: {
          Authorization: `Bearer ${access_token}`,
        },
      };

      const response = await axios.post(
        `https://skycommodity.in/bullsPanel/api/square-off-trade/${tradeId}`,
        null,
        config,
      );

      if (response.data.Status === 200) {
        const successMsg = response.data.message;
        Toast.show({
          type: 'success', // Assuming you have a type for error messages
          text1: 'success',
          text2: successMsg,
          text1Style: {fontSize: responsiveFontSize(2)},
          text2Style: {fontSize: responsiveFontSize(1.6)},
        });
      }
      await dispatch(getLiveTrade());
    } catch (error) {
      // Handle error appropriately
      console.error('Error in SquareOff:', error.response || error);
    }
  };

  const onSaveEdit = async () => {
    try {
      if (selectedItem) {
        const tradeId = selectedItem.id;

        const payload = {
          stop_loss: los,
          target: target,
        };

        // Dispatch the updateLiveTrade action
        dispatch(updateLiveTrade({tradeId, payload}));

        // After successfully updating the trade, dispatch the getLiveTrade action
        await dispatch(getLiveTrade());
      }
    } catch (error) {
      console.log('error coming ', error.response.data);
    }

    closeModal(); // Close the modal
  };

  const holdTrade = async tradeId => {
    try {
      const access_token = await AsyncStorage.getItem('accessToken');
      const config = {
        headers: {
          Authorization: `Bearer ${access_token}`,
        },
      };
      const res = await axios.get(
        `https://skycommodity.in/bullsPanel/api/hold-trade/${tradeId}`,
        config,
      );
      console.log('response holding', res.data);
      await dispatch(getLiveTrade());
    } catch (error) {
      console.log('error coming', error);
    }
  };

  const holdinghandle = item => {
    if (item) {
      setSelectedItem(item);
      Alert.alert(
        'Confirm',
        'Are you sure you want to Hold trade?',
        [
          {
            text: 'Cancel',
            style: 'cancel',
          },
          {
            text: 'OK',
            onPress: () => holdTrade(item.id),
          },
        ],
        {cancelable: false},
      );
    }
  };

  // Flatlist Ui RenderItem List here
  const RenderUiItems = ({item, index}) => {
    const buySellBgColor = item.trade_mode === 'sell' ? 'red' : 'green';
    const TradeMode = item.trade_mode;
    const trademodeSlice =
      TradeMode.charAt(0).toUpperCase() + TradeMode.slice(1);
    const tradeModeSlice = item.trade_type;
    const trademodeSliceCapit =
      tradeModeSlice.charAt(0).toUpperCase() + tradeModeSlice.slice(1);

    let actualPrice = item.asset != null ? item.asset.price : 0;

    let profitOrLoss = false;
    if (item.trade_mode == 'buy') {
      if (actualPrice > item.limit) {
        profitOrLoss = true;
        // dataFound[0].style.color = 'green';
      } else {
        // dataFound[0].style.color = 'red';
      }
    }
    if (item.trade_mode == 'sell') {
      if (actualPrice < item.limit) {
        profitOrLoss = true;
        // dataFound[0].style.color = 'green';
      } else {
        // dataFound[0].style.color = 'red';
      }
    }
    let profitLossVal = 'Trade is Pending';
    if (item.is_pending == 0) {
      profitLossVal =
        item.trade_mode == 'buy'
          ? (
              (actualPrice - item.limit) *
              item.asset.lot *
              item.max_lot
            ).toFixed(2)
          : (
              (item.limit - actualPrice) *
              item.asset.lot *
              item.max_lot
            ).toFixed(2);
    }

    const profitLoss = profitLossVal;

    // }

    let backgroundColor;
    if (profitLoss > 0) {
      backgroundColor = 'green';
    } else if (profitLoss < 0) {
      backgroundColor = 'red';
    } else {
      backgroundColor = COLORS.dimgray;
    }

    // =================================>
    return (
      <Animatable.View
        animation={'fadeInUp'}
        duration={1000}
        delay={index * 300}>
        <View style={styles.flatlistContainer}>
          <View style={{justifyContent: 'space-between', flexDirection: 'row'}}>
            <View
              style={[
                styles.BuySellContainer,
                {backgroundColor: buySellBgColor},
              ]}>
              <Text
                style={{
                  color: COLORS.white,
                  fontSize: responsiveFontSize(2),
                  fontWeight: '800',
                }}>
                {trademodeSlice}
              </Text>
            </View>
            {/* Second intraday ui  */}

            <View
              style={[
                styles.BuySellContainer,
                {
                  backgroundColor: backgroundColor,
                  width: responsiveWidth(50),
                },
              ]}>
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  // alignSelf: 'flex-start',
                  justifyContent: 'center',
                  paddingHorizontal: responsiveWidth(4),
                }}>
                <Text
                  style={{
                    paddingRight: responsiveWidth(2),
                    color: COLORS.white,
                    fontSize: responsiveFontSize(2),
                    fontWeight: '800',
                  }}>
                  P&L
                </Text>
                <Text
                  style={{
                    color: COLORS.white,
                    fontSize: responsiveFontSize(2),
                    fontWeight: '800',
                  }}>
                  {profitLoss}
                </Text>
              </View>
            </View>

            <View
              style={[styles.BuySellContainer, {width: responsiveWidth(18)}]}>
              <Text
                style={{
                  color: COLORS.white,
                  fontSize: responsiveFontSize(2),
                  fontWeight: '800',
                }}>
                {trademodeSliceCapit}
              </Text>
            </View>
          </View>

          {/* ================================= */}
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-around',
              marginTop: responsiveHeight(2),
            }}>
            <View style={{justifyContent: 'center', alignItems: 'center'}}>
              <Text
                style={{
                  color: COLORS.black,
                  fontWeight: '700',
                  fontSize: responsiveFontSize(2),
                }}>
                Trade Name
              </Text>
              <Text
                style={{
                  color: COLORS.black,
                  fontWeight: '500',
                  fontSize: responsiveFontSize(1.8),
                }}>
                {item.trade_name}
              </Text>
            </View>
            <View style={{justifyContent: 'center', alignItems: 'center'}}>
              <Text
                style={{
                  color: COLORS.black,
                  fontWeight: '500',
                  fontSize: responsiveFontSize(1.8),
                }}>
                Order Price
              </Text>
              <Text
                style={{
                  color: COLORS.dimgray,
                  fontWeight: '500',
                  fontSize: responsiveFontSize(1.8),
                }}>
                {item.asset_trade_price}
              </Text>
            </View>
            <View style={{justifyContent: 'center', alignItems: 'center'}}>
              <Text
                style={{
                  color: COLORS.black,
                  fontWeight: '500',
                  fontSize: responsiveFontSize(1.8),
                }}>
                live price
              </Text>
              <Text
                style={{
                  color: COLORS.dimgray,
                  fontWeight: '500',
                  fontSize: responsiveFontSize(1.8),
                }}>
                {item.asset.price}
              </Text>
            </View>
          </View>

          {/*  stop loss and lot ui   */}

          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-around',
              marginTop: responsiveHeight(2),
            }}>
            <View style={{justifyContent: 'center', alignItems: 'center'}}>
              <Text
                style={{
                  color: COLORS.black,
                  fontWeight: '700',
                  fontSize: responsiveFontSize(2),
                }}>
                Lot
              </Text>
              <Text
                style={{
                  color: COLORS.dimgray,
                  fontWeight: '500',
                  fontSize: responsiveFontSize(1.8),
                }}>
                {item.max_lot}
              </Text>
            </View>
            <View style={{justifyContent: 'center', alignItems: 'center'}}>
              <Text
                style={{
                  color: COLORS.black,
                  fontWeight: '500',
                  fontSize: responsiveFontSize(1.8),
                }}>
                Stop Loss
              </Text>
              <Text
                style={{
                  color: COLORS.dimgray,
                  fontWeight: '500',
                  fontSize: responsiveFontSize(1.8),
                }}>
                {item.stop_loss}
              </Text>
            </View>
            <View style={{justifyContent: 'center', alignItems: 'center'}}>
              <Text
                style={{
                  color: COLORS.black,
                  fontWeight: '500',
                  fontSize: responsiveFontSize(1.8),
                }}>
                Target
              </Text>
              <Text
                style={{
                  color: COLORS.dimgray,
                  fontWeight: '500',
                  fontSize: responsiveFontSize(1.8),
                }}>
                {item.target}
              </Text>
            </View>
          </View>

          {/* button ui here */}

          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              marginTop: responsiveHeight(2),
              backgroundColor: '#fff',
              paddingHorizontal: responsiveWidth(4),
              paddingVertical: responsiveWidth(2),
              borderRadius: responsiveWidth(20),
            }}>
            <TouchableOpacity
              style={styles.editBtn}
              onPress={() => openModal(item)}>
              <Entypo
                name={'edit'}
                size={responsiveFontSize(1.8)}
                color={'#000'}
              />
              <Text style={styles.editBtnText}>Edit</Text>
            </TouchableOpacity>

            {allowSquareOffArray[index] == 1 ? (
              <TouchableOpacity
                style={styles.editBtn}
                onPress={() => squreOffhandle(item)}>
                <Entypo
                  name={'reply-all'}
                  size={responsiveFontSize(1.8)}
                  color={'#000'}
                />
                <Text style={styles.editBtnText}>SqureOff</Text>
              </TouchableOpacity>
            ) : null}

            {allowHoldingArray[index] ? (
              <TouchableOpacity
                style={styles.editBtn}
                onPress={() => holdinghandle(item)}>
                <Entypo
                  name={'sweden'}
                  size={responsiveFontSize(1.8)}
                  color={'#000'}
                />
                <Text style={styles.editBtnText}>Holding</Text>
              </TouchableOpacity>
            ) : null}
          </View>
        </View>
      </Animatable.View>
    );
  };

  return (
    <View style={{flex: 1, backgroundColor: COLORS.lightWhite}}>
      <View
        style={{
          flex: 1,
          display: 'flex',
          width: responsiveWidth(100),
          height: responsiveHeight(100),
          backgroundColor: '#fff',
          borderTopRightRadius: responsiveWidth(8),
          borderTopLeftRadius: responsiveWidth(8),
          marginTop: responsiveHeight(4),
          shadowColor: '#000',
          elevation: 5,
          padding: responsiveHeight(2),
        }}>
        {/*Rounded  ui started here   */}

        {LiveTrade && LiveTrade.length > 0 ? (
          <View style={{marginBottom: responsiveHeight(6)}}>
            <FlatList
              data={LiveTrade}
              renderItem={RenderUiItems}
              ItemSeparatorComponent={
                Platform.OS !== 'android' &&
                (({highlighted}) => (
                  <View style={[highlighted && {marginLeft: 0}]} />
                ))
              }
              keyExtractor={item => item.id.toString()}
              refreshing={refreshing}
              onRefresh={onRefresh}
            />
          </View>
        ) : (
          <View>
            <Image
              source={require('../../../../assets/images/pendingImageOrder.png')}
              style={{
                width: responsiveWidth(90),
                // height: responsiveHeight(50),
                alignSelf: 'center',
                resizeMode: 'contain',
              }}
            />
            <Text
              style={{
                fontSize: responsiveFontSize(2.5),
                color: 'purple',
                fontWeight: '700',
                alignSelf: 'center',
                paddingHorizontal: responsiveWidth(25),
                textAlign: 'center',
              }}>
              You Have Not Placed Any Order !
            </Text>
          </View>
        )}

        {selectedItem && (
          <Modal
            isVisible={isModalVisible}
            animationIn={'slideInUp'}
            animationOut={'slideOutDown'}
            animationInTiming={300}
            animationOutTiming={300}>
            <View
              style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
              <View
                style={{
                  width: responsiveWidth(90),
                  height: responsiveHeight(40),
                  backgroundColor: COLORS.lightGray,
                  paddingTop: responsiveHeight(5),
                  borderRadius: responsiveWidth(2),
                }}>
                <View
                  style={{
                    position: 'absolute',
                    top: responsiveHeight(-5),
                    left: responsiveWidth(70 - 36),
                    width: responsiveWidth(20),
                    height: responsiveWidth(20),
                    backgroundColor: '#fff',
                    borderRadius: responsiveWidth(10),
                    borderWidth: responsiveWidth(2),
                    borderColor: 'rgba(0,0,0,0.2)',
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}>
                  <TouchableOpacity onPress={closeModal}>
                    <AntDesign
                      name={'closecircle'}
                      size={responsiveFontSize(6)}
                      color={'#000'}
                    />
                  </TouchableOpacity>
                </View>

                <View>
                  <TextInput
                    label="Stop Loss"
                    value={los}
                    onChangeText={text => setLos(text)}
                    textColor="#000"
                    style={{
                      marginTop: responsiveHeight(2),
                      backgroundColor: '#fff',
                      marginHorizontal: responsiveWidth(5),
                    }}
                    mode="outlined"
                  />
                  <TextInput
                    label="Target"
                    value={target}
                    onChangeText={text => setTarget(text)}
                    textColor="#000"
                    style={{
                      marginTop: responsiveHeight(2),
                      backgroundColor: '#fff',
                      marginHorizontal: responsiveWidth(5),
                      color: '#000',
                    }}
                    mode="outlined"
                  />

                  <Button
                    // icon="save"
                    mode="contained"
                    onPress={onSaveEdit}
                    style={{
                      width: responsiveWidth(40),
                      alignSelf: 'center',
                      marginTop: responsiveHeight(5),
                    }}>
                    Update
                  </Button>
                </View>
              </View>
            </View>
          </Modal>
        )}
      </View>
    </View>
  );
};

export default LiveTrade;

const styles = StyleSheet.create({
  backIcon: {
    justifyContent: 'center',
    alignItems: 'center',
    width: responsiveWidth(10),
    height: responsiveWidth(10),
    borderRadius: responsiveWidth(5),
    backgroundColor: '#616DBC',
    margin: responsiveWidth(4),
  },
  flatlistContainer: {
    width: responsiveWidth(90),
    height: responsiveHeight(28),
    backgroundColor: COLORS.lightGray,
    marginVertical: responsiveHeight(1),
    borderRadius: responsiveWidth(3),
    padding: responsiveWidth(2),
  },

  BuySellContainer: {
    backgroundColor: COLORS.primary,
    width: responsiveWidth(15),
    height: responsiveHeight(3),
    borderRadius: responsiveWidth(1),
    justifyContent: 'center',
    alignItems: 'center',
  },
  editBtn: {
    backgroundColor: COLORS.lightGray,
    paddingHorizontal: responsiveWidth(2),
    paddingVertical: responsiveWidth(1),
    borderRadius: responsiveWidth(20),
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
  },
  editBtnText: {
    color: '#000',
    paddingLeft: responsiveWidth(1.5),
  },
});
