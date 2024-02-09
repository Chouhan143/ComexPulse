import {StyleSheet, Text, View, Image, TouchableOpacity} from 'react-native';
import React, {useEffect} from 'react';
import {
  responsiveWidth,
  responsiveHeight,
  responsiveFontSize,
} from 'react-native-responsive-dimensions';
import {useNavigation} from '@react-navigation/native';
import Icon from 'react-native-vector-icons/AntDesign';
import {COLORS} from '../../../constants/theme';
import {getPastTrade} from '../../../redux/market/coinSlice';
import {useSelector, useDispatch} from 'react-redux';
const PendingTrade = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    // Dispatch the getLiveTrade action when the component mounts
    dispatch(getPastTrade());
  }, [dispatch]);

  const pastTrade = useSelector(state => state.coin.pastTradedata);

  return (
    <View style={{flex: 1, backgroundColor: COLORS.lightWhite}}>
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
      <View></View>
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
});
