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

const LiveTrade = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();

  useEffect(() => {
    // Dispatch the getLiveTrade action when the component mounts
    dispatch(getLiveTrade());
  }, [dispatch]);

  const LiveTrade = useSelector(state => state.coin.liveTradedata);

  const handleGoBack = () => {
    navigation.goBack(); // Go back to the previous screen
  };

  const renderUi = ({item}) => {
    return (
      <View>
        <Text>{item.users_id}</Text>
      </View>
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
        <View style={{flexDirection: 'row'}}>
          <TouchableOpacity onPress={handleGoBack} style={styles.backIcon}>
            <Icon
              name="left"
              size={responsiveFontSize(2)}
              color={COLORS.white}
            />
          </TouchableOpacity>

          <Text
            style={{
              color: '#fff',
              fontSize: responsiveFontSize(3),
              fontWeight: '700',
              margin: responsiveWidth(4),
            }}>
            Live Trade
          </Text>
        </View>
      </View>
      {/* header End here */}

      <FlatList data={LiveTrade}
      renderItem={renderUi}
      keyExtractor={} />
      {/* 
      <View
        style={{
          display: 'flex',
          width: responsiveWidth(100),
          height: responsiveHeight(100),
          backgroundColor: '#fff',
          borderTopRightRadius: responsiveWidth(8),
          borderTopLeftRadius: responsiveWidth(8),
          marginTop: responsiveHeight(4),
          shadowColor: '#000',
          elevation: 5,
          paddingTop: responsiveHeight(10),
        }}>
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
      </View> */}
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
});
