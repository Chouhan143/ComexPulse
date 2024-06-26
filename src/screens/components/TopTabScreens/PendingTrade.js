import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  FlatList,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import * as Animatable from 'react-native-animatable';
import {
  responsiveWidth,
  responsiveHeight,
  responsiveFontSize,
} from 'react-native-responsive-dimensions';
import {useNavigation} from '@react-navigation/native';
import Icon from 'react-native-vector-icons/AntDesign';
import {COLORS} from '../../../constants/theme';
import {getPrndingTrade} from '../../../redux/market/coinSlice';
import {useSelector, useDispatch} from 'react-redux';
const PendingTrade = () => {
  const dispatch = useDispatch();
  const [refreshing, setRefreshing] = useState(false);
  useEffect(() => {
    const Interval = setInterval(() => {
      dispatch(getPrndingTrade());
    }, 2000);

    return () => {
      clearInterval(Interval);
    };
  }, [dispatch]);
  const onRefresh = async () => {
    setRefreshing(true);
    try {
      // Fetch updated data
      await dispatch(getPrndingTrade());
    } catch (error) {
      console.error('Error refreshing data:', error);
    } finally {
      setRefreshing(false);
    }
  };

  const pendingTrade = useSelector(state => state.coin.pendingTradedata);

  const RenderUiItems = ({item, index}) => {
    const buySellBgColor = item.trade_mode === 'sell' ? 'red' : 'green';
    const TradeMode = item.trade_mode;
    const trademodeSlice =
      TradeMode.charAt(0).toUpperCase() + TradeMode.slice(1);
    const tradeModeSlice = item.trade_type;
    const trademodeSliceCapit =
      tradeModeSlice.charAt(0).toUpperCase() + tradeModeSlice.slice(1);

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

        {pendingTrade && pendingTrade.length > 0 ? (
          <View style={{marginBottom: responsiveHeight(6)}}>
            <FlatList
              data={pendingTrade}
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

export default PendingTrade;

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
    height: responsiveHeight(20),
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
