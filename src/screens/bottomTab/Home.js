import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  FlatList,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {
  responsiveFontSize,
  responsiveHeight,
  responsiveWidth,
} from 'react-native-responsive-dimensions';
import {useNavigation} from '@react-navigation/native';
import Carousel from '../components/Carousel';
import {useSelector, useDispatch} from 'react-redux';
import {fetchCoinData} from '../../redux/market/coinSlice';
import { COLORS } from '../../constants/theme';
import axios from 'axios';
const Home = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const StocksData = useSelector(state => state.coin.data);
// const [data,setData]=useState('')


//  const commodityData =  async () => {
//     try {
//       const response = await axios.get(
//         'https://scripts.bulleyetrade.com/api/getMarket',
//       );
//       const result = response.data.Data;
//       setData(result)
//       console.log("test api",result);
     
      
//     } catch (error) {
//       console.log('error test Api', error);
//       throw error;
//     }
//   };

// useEffect(()=>{
//   commodityData();
// },[])



 
  // Data fetch from the redux

  useEffect(() => {

    if (!StocksData) {
      dispatch(fetchCoinData());
    }

    const interval = setInterval(() => {
      dispatch(fetchCoinData());
    }, 10000); // 1000 milliseconds = 1 second
    return () => clearInterval(interval); // Cleanup function to clear the interval on unmount
  }, []);

  if (!StocksData) {
    return null; // or return a loading indicator
  }

    // Breack data ui 

    const Part1 = StocksData.slice(0,StocksData.length/4);
    const part2 = StocksData.slice(StocksData.length / 4, StocksData.length / 2);
    const part3 = StocksData.slice(StocksData.length / 2, (3 * StocksData.length) / 4);
    const part4 = StocksData.slice((3 * StocksData.length) / 4);


    // const Part1 = data.slice(0,data.length/4);
    // const part2 = data.slice(data.length / 4, data.length / 2);
    // const part3 = data.slice(data.length / 2, (3 * data.length) / 4);
    // const part4 = data.slice((3 * StocksData.length) / 4);


  // stocksApiDataUi

  const GraphUi = (item) =>{
    navigation.navigate('GraphUI',{selectedItem:item,});
  }


  const stocksApiDataUi = ({item}) => {
    return (
      <TouchableOpacity style={[styles.container, styles.searchCommodityBox]} onPress={() => GraphUi(item)} >
      <View
        style={[
          styles.sideLine,
          {
            backgroundColor: item.percent_chg < 1 ? 'red' : 'green',
          },
        ]}
      ></View>
      <View style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: 3 }}>
        <Text style={{ color: COLORS.headingTextColor, fontSize: responsiveFontSize(1.8), fontWeight: '500' }}>{item.trade_name}</Text>
        <Text style={{ color: COLORS.textColor, fontSize: responsiveFontSize(1.5) }}>{item.expiry_date}</Text>
        <Text style={{ color: COLORS.textColor, fontSize: responsiveFontSize(1.4), fontWeight: '500' }}>{item.price}</Text>
        <Text style={{ color: item.percent_chg < 1 ? 'red' : 'green', fontSize: responsiveFontSize(1.4) }}>{item.percent_chg}%</Text>
      </View>
    </TouchableOpacity>
    );
  };

  return (
    <View style={{flex: 1}}>
      <View style={styles.topContiner}>
        <Text style={styles.topContainerText}>ComexPulse</Text>
      </View>
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
    justifyContent: 'center',
    alignItems: 'center',
  },
  topContainerText: {
    fontSize: responsiveFontSize(2.5),
    fontWeight: '700',
    color: 'white',
  },
  container: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 6,
    backgroundColor: "#3949ab",
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
