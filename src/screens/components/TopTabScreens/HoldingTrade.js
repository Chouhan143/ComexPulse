import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  FlatList,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

import {
  responsiveWidth,
  responsiveHeight,
  responsiveFontSize,
} from 'react-native-responsive-dimensions';
import {useNavigation} from '@react-navigation/native';
import Icon from 'react-native-vector-icons/AntDesign';
import {COLORS} from '../../../constants/theme';
import {getHoldingTrade} from '../../../redux/market/coinSlice';
import {useSelector, useDispatch} from 'react-redux';
import * as Animatable from 'react-native-animatable';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import Toast from 'react-native-toast-message';

const HoldingTrade = () => {
  const dispatch = useDispatch();
  const [refreshing, setRefreshing] = useState(false);
  useEffect(() => {
    // Dispatch the getLiveTrade action when the component mounts
    const Interwal = setInterval(() => {
      dispatch(getHoldingTrade());
    }, 5000);

    return () => {
      clearInterval(Interwal);
    };
  }, [dispatch]);

  const onRefresh = async () => {
    setRefreshing(true);
    try {
      // Fetch updated data
      await dispatch(getHoldingTrade());
    } catch (error) {
      console.error('Error refreshing data:', error);
    } finally {
      setRefreshing(false);
    }
  };

  const unholdApi = async tradeId => {
    try {
      const access_token = await AsyncStorage.getItem('accessToken');
      console.log(access_token, tradeId, 'get accessToken');
      const config = {
        headers: {
          Authorization: `Bearer ${access_token}`,
        },
      };

      const response = await axios.get(
        `https://skycommodity.in/bullsPanel/api/unhold-trade/${tradeId}`,
        config,
      );

      console.log(response.data);
      if (response.data.status === 200) {
        const successMsg = response.data.message;
        Toast.show({
          type: 'success', // Assuming you have a type for error messages
          text1: 'success',
          text2: successMsg,
          text1Style: {fontSize: responsiveFontSize(2)},
          text2Style: {fontSize: responsiveFontSize(1.6)},
        });
      }
      await dispatch(getHoldingTrade());
    } catch (error) {
      console.log('error', error);
    }
  };

  const holdingTrade = useSelector(state => state.coin.holdingTradedata);

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
                Opning
              </Text>
              <Text
                style={{
                  color: COLORS.dimgray,
                  fontWeight: '500',
                  fontSize: responsiveFontSize(1.8),
                }}>
                {item.limit}
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
          <TouchableOpacity
            style={{
              width: responsiveWidth(85),
              backgroundColor: '#fff',
              height: responsiveHeight(5),
              borderRadius: responsiveWidth(10),
              justifyContent: 'center',
              alignItems: 'center',
              flexDirection: 'row',
              shadowColor: '#000',
            }}
            onPress={() => unholdApi(item.id)}>
            <Image
              source={require('../../../../assets/images/play-button.png')}
              style={{
                marginRight: responsiveWidth(2),
                width: responsiveWidth(5),
                height: responsiveWidth(5),
              }}
            />
            <Text
              style={{
                color: '#000',
                fontSize: responsiveFontSize(2),
                fontWeight: '500',
              }}>
              Unhold
            </Text>
          </TouchableOpacity>

          {/* button ui here */}
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

        {holdingTrade && holdingTrade.length > 0 ? (
          <View style={{marginBottom: responsiveHeight(6)}}>
            <FlatList
              data={holdingTrade}
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
      </View>
    </View>
  );
};

export default HoldingTrade;

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
    height: responsiveHeight(25),
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
});
