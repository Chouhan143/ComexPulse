import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  FlatList,
} from 'react-native';
import Reac, {useEffect} from 'react';
import {
  responsiveWidth,
  responsiveHeight,
  responsiveFontSize,
} from 'react-native-responsive-dimensions';
import {useNavigation} from '@react-navigation/native';
import Icon from 'react-native-vector-icons/AntDesign';
import {COLORS} from '../../constants/theme';
import {getLiveTrade} from '../../redux/market/coinSlice';
import {useSelector, useDispatch} from 'react-redux';
import * as Animatable from 'react-native-animatable';
const LiveTrade = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();

  useEffect(() => {
    // Dispatch the getLiveTrade action when the component mounts
    dispatch(getLiveTrade());
  }, [dispatch]);

  const LiveTrade = useSelector(state => state.coin.liveTradedata);

  // Flatlist Ui RenderItem List here

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
              justifyContent: 'space-between',
              marginTop: responsiveHeight(2),
            }}>
            <View>
              <Text
                style={{
                  color: COLORS.black,
                  fontWeight: '700',
                  fontSize: responsiveFontSize(2),
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
                LTP
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
        </View>
      </Animatable.View>
    );
  };

  return (
    <View style={{flex: 1}}>
      <View>
        <Image
          source={require('../../../assets/images/topBg.jpg')}
          style={{
            width: responsiveWidth(100),
            height: responsiveHeight(40),
            position: 'absolute',
          }}
        /> 
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <Text
            style={{
              color: '#fff',
              fontSize: responsiveFontSize(3),
              fontWeight: '700',
              marginTop: responsiveHeight(2),
            }}>
            Live Trade
          </Text>
          <Image
            source={require('../../../assets/images/feed.png')}
            style={{
              width: responsiveWidth(5),
              height: responsiveHeight(5),
            }}
            resizeMode="contain"
          />
        </View>
      </View>
      {/* header End here */}

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
            />
          </View>
        ) : (
          <View>
            <Image
              source={require('../../../assets/images/pendingImageOrder.png')}
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
    height: responsiveHeight(12),
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
