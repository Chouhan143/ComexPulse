import React, {useEffect} from 'react';
import {
  ScrollView,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  FlatList,
  Image,
} from 'react-native';
import Icon from 'react-native-vector-icons/AntDesign';
import Icon2 from 'react-native-vector-icons/Feather';
import Icon3 from 'react-native-vector-icons/AntDesign';
import {useNavigation} from '@react-navigation/native';
import {useSelector, useDispatch} from 'react-redux';
import Icon4 from 'react-native-vector-icons/MaterialCommunityIcons';
import {
  fetchCoinData,
  removeAllFromWatchlist,
  removeFromWatchlist,
  initWatchlistData,
} from '../../redux/market/coinSlice';
import {COLORS} from '../../constants/theme';
import {
  responsiveFontSize,
  responsiveHeight,
  responsiveWidth,
} from 'react-native-responsive-dimensions';

const WatchList = () => {
  const navigation = useNavigation();
  const watchlistData = useSelector(state => state.coin.watchlistData);
  console.log('watchlist', watchlistData);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchCoinData()).catch(error => {
      console.log('Error fetching coin data:', error);
    });
  }, []);

  useEffect(() => {
    dispatch(initWatchlistData()).catch(error => {
      console.log('error fetching inititwatchlist data', error);
    });
  }, []);

  const handleRemoveAll = () => {
    dispatch(removeAllFromWatchlist());
  };

  const handleRemoveItem = itemId => {
    dispatch(removeFromWatchlist(itemId));
  };

  const navigationHandle = () => {
    navigation.navigate('SearchData');
  };

  const renderHeader = () => {
    return (
      <View>
        <Image
          source={require('../../../assets/images/topBg.jpg')}
          style={{
            width: responsiveWidth(100),
            height: responsiveHeight(20),
            position: 'absolute',
          }}
        />

        <View
          style={{
            justifyContent: 'center',
            alignItems: 'center',
            flexDirection: 'row',
            paddingVertical: responsiveHeight(2.5),
          }}>
          <TouchableOpacity onPress={handleGoBack}>
            <Icon
              name="arrowleft"
              size={responsiveFontSize(3)}
              color={COLORS.white}
            />
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.searchInputContainer}
            onPress={navigationHandle}>
            <Icon2
              name="search"
              size={responsiveFontSize(2.5)}
              color={COLORS.black}
            />
            <Text
              style={[
                styles.searchInput,
                {fontSize: responsiveFontSize(2.1), color: '#000'},
              ]}>
              Search
            </Text>
          </TouchableOpacity>
          <View
            style={{
              display: 'flex',
              alignItems: 'flex-end',
              paddingLeft: responsiveWidth(9),
            }}>
            <TouchableOpacity style={styles.addBox} onPress={navigationHandle}>
              <Icon name="plus" size={responsiveFontSize(3)} color="#fff" />
            </TouchableOpacity>
          </View>
        </View>
      </View>
    );
  };

  const GraphUi = item => {
    navigation.navigate('GraphUI', {selectedItem: item});
  };

  const renderItem = ({item}) => {
    return (
      <ScrollView>
        <TouchableOpacity
          style={{
            width: responsiveWidth(90),
            height: responsiveHeight(10),
            backgroundColor: '#fff',
            marginVertical: 1,
            justifyContent: 'center',
            paddingHorizontal: responsiveWidth(3),
            alignSelf: 'center',
            borderBottomColor: 'rgba(200,200,200,0.8)',
            shadowColor: 'black',
            // shadowOffset: 15,
            elevation: 10,
            borderBottomWidth: responsiveWidth(0.3),
            borderRadius: responsiveWidth(2),
          }}
          onPress={() => GraphUi(item)}>
          <View style={styles.topMiddle}>
            <View>
              <Text style={styles.topText}>{item.trade_name}</Text>
            </View>
            <View style={styles.topLast}>
              <Text style={[styles.topText, {paddingRight: 60}]}>
                {item.price}
              </Text>
              <Text style={styles.topText}>{item.percent_chg}%</Text>
            </View>
            <TouchableOpacity
              style={{
                padding: responsiveWidth(1.5),
                backgroundColor: '#323860',
                borderRadius: responsiveWidth(7),
              }}
              onPress={() => handleRemoveItem(item.id)}>
              {/* <Icon4 name="delete-circle-outline" size={22} color="red" /> */}
              <Text style={{color: 'white'}}>Remove</Text>
            </TouchableOpacity>
          </View>
        </TouchableOpacity>
      </ScrollView>
    );
  };

  const handleGoBack = () => {
    navigation.goBack(); // Go back to the previous screen
  };
  return (
    <View style={styles.container}>
      {/* Top Header Fuction Call Here */}
      {renderHeader()}

      <View
        style={{
          width: responsiveWidth(100),
          height: responsiveHeight(100),
          backgroundColor: '#fff',
          alignSelf: 'center',
          borderTopLeftRadius: responsiveWidth(8),
          borderTopRightRadius: responsiveWidth(8),
          marginTop: responsiveHeight(3),
        }}>
        <View
          style={{
            flex: 1,
            marginBottom: responsiveHeight(22),
            marginTop: responsiveHeight(3),
          }}>
          {watchlistData && watchlistData.length > 0 ? (
            <FlatList
              data={watchlistData}
              renderItem={renderItem}
              keyExtractor={item => item.id}
            />
          ) : (
            <View style={styles.noItemsContainer}>
              <Text style={{color: '#000', fontSize: responsiveFontSize(2.5)}}>
                No items in watchlist
              </Text>
            </View>
          )}

          {/* <TouchableOpacity style={styles.addBox} onPress={navigationHandle}>
        <Icon name="plus" size={responsiveFontSize(2.5)} color="#fff" />
      </TouchableOpacity> */}
        </View>
      </View>
    </View>
  );
};

export default WatchList;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.white,
  },

  searchInputContainer: {
    width: responsiveWidth(60),
    height: responsiveWidth(10),
    // backgroundColor: 'rgba(200,200,200,0.7)',
    backgroundColor: '#fff',
    borderRadius: responsiveWidth(5),
    flexDirection: 'row',
    alignItems: 'center',
    paddingLeft: responsiveWidth(5),
    marginLeft: responsiveWidth(6),
  },
  addBox: {
    // position: 'absolute',
    // bottom: responsiveHeight(12),
    // right: responsiveWidth(5),
    width: responsiveWidth(10),
    height: responsiveWidth(10),
    backgroundColor: '#616DBC',

    borderRadius: responsiveWidth(6),
    justifyContent: 'center',
    alignItems: 'center',
  },
  searchInput: {
    flex: 1,
    paddingLeft: responsiveWidth(3),
    color: COLORS.white,
  },
  profileIconContainer: {
    width: responsiveWidth(11),
    height: responsiveWidth(11),
    borderRadius: responsiveWidth(5),
    backgroundColor: COLORS.bgColor,
    justifyContent: 'center',
    alignItems: 'center',
  },
  topMiddle: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  topText: {
    color: COLORS.black,
    fontSize: 12,
    fontWeight: '400',
  },
  topLast: {
    flexDirection: 'row',
    gap: 5,
  },
  noItemsContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },

  topContainer: {
    width: responsiveWidth(100),
    height: responsiveWidth(16),
    backgroundColor: '#323860',
    // marginTop: responsiveHeight(1),
    justifyContent: 'center',
    alignSelf: 'center',
    paddingHorizontal: responsiveWidth(5),
  },
  topMiddle: {
    display: 'flex',
    justifyContent: 'space-between',
    flexDirection: 'row',
    alignItems: 'center',
  },
  topLast: {
    display: 'flex',
    justifyContent: 'space-between',
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
  },
  topText1: {
    color: COLORS.black,
    fontSize: responsiveWidth(3.5),
    fontWeight: '700',
    paddingRight: responsiveWidth(5),
    backgroundColor: `rgba(57, 73, 171,1)`, // Using rgba() with 40% opacity
    padding: responsiveWidth(2),
    borderWidth: responsiveWidth(0.1),
    borderColor: 'transparent',
    borderRadius: responsiveWidth(2),
    textAlign: 'center',
    alignSelf: 'center',
  },
  topText: {
    color: COLORS.black,
    fontSize: 14,
    fontWeight: '500',
  },
});
