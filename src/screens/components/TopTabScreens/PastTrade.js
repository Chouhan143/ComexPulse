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
import {getPastTrade} from '../../../redux/market/coinSlice';
import {useSelector, useDispatch} from 'react-redux';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Entypo from 'react-native-vector-icons/Entypo';
import Modal from 'react-native-modal';
import * as Animatable from 'react-native-animatable';
import axios from 'axios';
import Toast from 'react-native-toast-message';
const PastTrade = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const [selectedItem, setSelectedItem] = useState(null);
  const [los, setLos] = React.useState('');
  const [target, setTarget] = React.useState('');

  const [isModalVisible, setModalVisible] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const PastTrade = useSelector(state => state.coin.pastTradedata);

  const onRefresh = async () => {
    setRefreshing(true);
    try {
      // Fetch updated data
      await dispatch(getPastTrade());
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
    dispatch(getPastTrade());
  }, []);

  const SquareOff = async () => {
    try {
      const tradeId = selectedItem.id;
      console.log(tradeId, 'get tradeId');
      const response = await axios.post(
        `https://app.srninfotech.com/bullsPanel/api/squareOff-user-trade/${tradeId}`,
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

      console.log('check response ', response);
    } catch (error) {
      // Handle error appropriately
      console.error('Error in SquareOff:', error.response);
    }
  };

  const squreOffhandle = () => {
    if (selectedItem) {
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
            onPress: SquareOff, // Remove the parentheses here to pass the function reference
          },
        ],
        {cancelable: false},
      );
    }
  };

  // const toggleModal = tradeId => {
  //   setIsModalVisible(!isModalVisible);
  //   setSelectedTradeId(tradeId);
  // };

  const onSaveEdit = async () => {
    try {
      if (selectedItem) {
        const tradeId = selectedItem.id;

        const payload = {
          stop_loss: los,
          target: target,
        };

        console.log(payload, 'fdsf');

        const response = await axios.post(
          `https://scripts.bulleyetrade.com/api/trades/${tradeId}`,
          payload,
        );

        console.log('check ---', response);
      }
      // Perform any necessary actions or state updates after the API call is successful
    } catch (error) {
      console.log('error coming ', error.response.data);
    }

    closeModal(); // Close the modal
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

    const profitLoss = parseInt(item.trade_outcome).toFixed(2);

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

            {/* 3rd ui */}
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
                  color: COLORS.white,
                  fontWeight: '700',
                  fontSize: responsiveFontSize(2),
                }}>
                Trade Name
              </Text>
              <Text
                style={{
                  color: COLORS.white,
                  fontWeight: '500',
                  fontSize: responsiveFontSize(1.8),
                }}>
                {item.trade_name}
              </Text>
            </View>
            <View style={{justifyContent: 'center', alignItems: 'center'}}>
              <Text
                style={{
                  color: COLORS.white,
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
                  color: COLORS.white,
                  fontWeight: '500',
                  fontSize: responsiveFontSize(1.8),
                }}>
                Closed
              </Text>
              <Text
                style={{
                  color: COLORS.dimgray,
                  fontWeight: '500',
                  fontSize: responsiveFontSize(1.8),
                }}>
                {item.square_off_at}
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
                  color: COLORS.white,
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
                  color: COLORS.white,
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
                  color: COLORS.white,
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

        {PastTrade && PastTrade.length > 0 ? (
          <View style={{marginBottom: responsiveHeight(6)}}>
            <FlatList
              data={PastTrade}
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
                    style={{
                      marginTop: responsiveHeight(2),
                      backgroundColor: '#fff',
                      marginHorizontal: responsiveWidth(5),
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

export default PastTrade;

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
    backgroundColor: COLORS.textColorBlue,
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
