import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  FlatList,
  ActivityIndicator,
} from 'react-native';
import React, {useEffect, useRef, useState} from 'react';
import {
  responsiveFontSize,
  responsiveHeight,
  responsiveWidth,
} from 'react-native-responsive-dimensions';
import {useNavigation} from '@react-navigation/native';
import Carousel from '../components/Carousel';
import {useSelector, useDispatch} from 'react-redux';
import {fetchCoinData, DataUpdateBlink} from '../../redux/market/coinSlice';
import {COLORS} from '../../constants/theme';
import Icon from 'react-native-vector-icons/Ionicons';
import * as Animatable from 'react-native-animatable';
import {useFocusEffect} from '@react-navigation/native';
import {BackHandler} from 'react-native';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Home = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(true);
  const StocksData = useSelector(state => state.coin.data);
  // console.log('stocks data>>>>', StocksData);
  const isLoader = useSelector(state => state.coin.isLoader);
  const [prevPrices, setPrevPrices] = useState({});
  const [token, setToken] = useState('dgfdgdgh');
  const [priceTrack, setPriceTrack] = useState('');
  const [allPrices, setAllPrices] = useState([]);
  const [priceColor, setPriceColor] = useState('#fff');

  useEffect(() => {
    // Check if there is a change in price
    if (
      prevPrices[priceTrack.id] &&
      prevPrices[priceTrack.id] !== priceTrack.price
    ) {
      // Update color based on price change
      setPriceColor(
        priceTrack.price > prevPrices[priceTrack.id] ? 'lightgreen' : 'red',
      );

      // Reset color after 2 seconds
      setTimeout(() => {
        setPriceColor('#fff'); // Reset color to default
      }, 2000);
    }

    // Update previous prices
    setPrevPrices(prev => ({
      ...prev,
      [priceTrack.id]: priceTrack.price,
    }));
  }, [priceTrack]);

  const getToken = async () => {
    token = await AsyncStorage.getItem('accessToken');
  };

  // update data
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          'https://skycommodity.in/bullsPanel/api/update-market',
        );
        // console.log('response', response);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    fetchData();
  });

  useFocusEffect(
    React.useCallback(() => {
      console.log('1');
      const onBackPress = () => {
        if (getToken) {
          BackHandler.exitApp();
          return true;
        } else {
          return false;
        }
      };

      const subscription = BackHandler.addEventListener(
        'hardwareBackPress',
        onBackPress,
      );

      return () => subscription.remove();
    }, [token]),
  );

  // Data fetch from the redux
  // console.log(StocksData, 'dddd');
  useEffect(() => {
    console.log('2');
    if (!StocksData) {
      dispatch(fetchCoinData());
      dispatch(DataUpdateBlink());
    }
    const interval = setInterval(() => {
      dispatch(fetchCoinData());
    }, 1000); // 1000 milliseconds = 1 second
    setIsLoading(false);
    return () => clearInterval(interval); // Cleanup function to clear the interval on unmount
  });

  if (!StocksData) {
    return null; // or return a loading indicator
  }

  const Part1 = StocksData.slice(0, StocksData.length / 4);
  const part2 = StocksData.slice(StocksData.length / 4, StocksData.length / 2);
  const part3 = StocksData.slice(
    StocksData.length / 2,
    (3 * StocksData.length) / 4,
  );

  const part4 = StocksData.slice((3 * StocksData.length) / 4);

  // stocksApiDataUi

  const GraphUi = item => {
    navigation.navigate('GraphUI', {selectedItem: item});
  };

  const stocksApiDataUi = ({item}) => {
    // Default color

    setPriceTrack(item);

    return (
      <TouchableOpacity
        style={[styles.container, styles.searchCommodityBox]}
        onPress={() => GraphUi(item)}>
        <View
          style={[
            styles.sideLine,
            {
              backgroundColor: item.percent_chg < 1 ? 'red' : 'green',
            },
          ]}></View>
        <View
          style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            gap: 3,
          }}>
          <Text
            style={{
              color: COLORS.headingTextColor,
              fontSize: responsiveFontSize(1.8),
              fontWeight: '500',
            }}>
            {item.trade_name}
          </Text>
          <Text
            style={{
              color: COLORS.textColor,
              fontSize: responsiveFontSize(1.5),
            }}>
            {item.expiry_date}
          </Text>
          <Text
            style={{
              color: priceColor,

              fontSize: responsiveFontSize(1.4),
              fontWeight: '500',
              // backgroundColor: isIncrease ? 'green' : 'red',
              paddingHorizontal: responsiveWidth(1),
              borderRadius: responsiveWidth(0.5),
            }}>
            {item.price}
          </Text>

          <Text
            style={{
              color: item.percent_chg < 1 ? 'red' : 'green',
              fontSize: responsiveFontSize(1.4),
            }}>
            {item.percent_chg}%
          </Text>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <View style={{flex: 1}}>
      {/* Loader before data comming */}
      {isLoading && (
        <View style={styles.loaderContainer}>
          <ActivityIndicator size="large" color="#3949ab" />
        </View>
      )}

      {!isLoading && (
        <View style={styles.topContiner}>
          <Animatable.Text
            animation="pulse"
            easing="ease-out-cubic"
            iterationCount="infinite"
            style={styles.topContainerText}>
            SkyCommodity
          </Animatable.Text>
          <TouchableOpacity onPress={() => navigation.navigate('Notification')}>
            <Icon name="notifications" size={25} color="#fff" />
            <View
              style={{
                width: responsiveWidth(3),
                height: responsiveWidth(3),
                backgroundColor: 'red',
                borderRadius: responsiveWidth(1.5),
                position: 'absolute',
                right: responsiveWidth(0),
                top: responsiveHeight(0),
              }}></View>
          </TouchableOpacity>
        </View>
      )}
      {/* Top Container*/}
      <View
        style={{
          flex: 1 / 1,
          backgroundColor: '#fff',
        }}>
        <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
          <View style={{margin: responsiveWidth(2), flexDirection: 'row'}}>
            <Text
              style={[
                styles.topContainerText,
                {
                  color: '#000',
                  fontWeight: '500',
                  marginLeft: responsiveWidth(5),
                },
              ]}>
              Commodities News
            </Text>
          </View>
          <TouchableOpacity
            style={{margin: responsiveWidth(3)}}
            onPress={() => navigation.openDrawer()} // Open the drawer on press
          >
            <Image
              source={require('../../../assets/images/menu.png')}
              style={{width: responsiveWidth(6), height: responsiveHeight(3)}}
            />
          </TouchableOpacity>
        </View>
        {/*Carousel Start Here  */}
        <Carousel />
        {/*Carousel End Here  */}

        {/* Flatlist View Start */}
        <View>
          <FlatList
            data={part4}
            renderItem={stocksApiDataUi}
            keyExtractor={item => item.id.toString()}
            horizontal
            showsHorizontalScrollIndicator={false}
          />
          <FlatList
            data={part2}
            renderItem={stocksApiDataUi}
            keyExtractor={item => item.id.toString()}
            horizontal
            showsHorizontalScrollIndicator={false}
          />
          <FlatList
            data={part3}
            renderItem={stocksApiDataUi}
            keyExtractor={item => item.id.toString()}
            horizontal
            showsHorizontalScrollIndicator={false}
          />
          <FlatList
            data={Part1}
            renderItem={stocksApiDataUi}
            keyExtractor={item => item.id.toString()}
            horizontal
            showsHorizontalScrollIndicator={false}
          />
        </View>
        {/* Flatlist View End */}
      </View>
    </View>
  );
};

export default Home;

const styles = StyleSheet.create({
  topContiner: {
    flex: 1 / 10,
    backgroundColor: '#3949ab',
    borderWidth: responsiveWidth(0.1),
    borderBottomRightRadius: responsiveWidth(15),
    display: 'flex',
    justifyContent: 'space-around',
    alignItems: 'center',
    flexDirection: 'row',
  },
  loaderContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  topContainerText: {
    fontSize: responsiveFontSize(2.5),
    fontWeight: '700',
    color: 'white',
    alignSelf: 'center',
    paddingLeft: responsiveWidth(16),
  },
  container: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 6,
    backgroundColor: '#3949ab',
    width: responsiveWidth(30),
    height: responsiveHeight(10.5),
    borderRadius: 5,
    marginBottom: 10,
    marginTop: 6,
  },
  sideLine: {
    width: responsiveWidth(0.7),
    height: responsiveWidth(10),
    position: 'absolute',
    left: 0,
    borderRadius: 10,
  },
  searchEluation: {
    borderBottomWidth: 0.1,
    shadowColor: '#b3b3b3',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 2,
  },
  searchCommodityBox: {
    borderBottomWidth: 0.1,
    shadowColor: COLORS.textColor,
    shadowOffset: {
      width: 2,
      height: 5,
    },
    shadowOpacity: 0.5,
    shadowRadius: 4.84,
    elevation: 5,
  },
});
