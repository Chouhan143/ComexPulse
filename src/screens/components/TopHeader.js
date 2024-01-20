import {StyleSheet, Text, View, Image, TouchableOpacity} from 'react-native';
import React from 'react';
import {
  responsiveHeight,
  responsiveWidth,
  responsiveFontSize,
} from 'react-native-responsive-dimensions';
import {useNavigation} from '@react-navigation/native';
import Icon from 'react-native-vector-icons/Ionicons';
import Icon2 from 'react-native-vector-icons/Feather';
import {COLORS} from '../../constants/theme';
import ReanimatedLoaderButton from './ReanimatedLoaderButton';

const TopHeader = () => {
  const navigation = useNavigation();

  const navigationHandle = () => {
    navigation.navigate('Home');
  };
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
          justifyContent: 'space-between',
          alignItems: 'center',
          flexDirection: 'row',
          paddingVertical: responsiveHeight(2.5),
          //   paddingHorizontal: responsiveWidth(4),
        }}>
        <TouchableOpacity onPress={navigationHandle}>
          <Icon
            name="chevron-back-circle"
            size={responsiveFontSize(5)}
            color={COLORS.white}
          />
        </TouchableOpacity>
        <View>
          <Text style={styles.headingText}>Watchlist</Text>
        </View>
        <View>
          <ReanimatedLoaderButton />
        </View>
      </View>
    </View>
  );
};

export default TopHeader;

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
    position: 'absolute',
    bottom: responsiveHeight(0),
    right: responsiveWidth(0),
    width: responsiveWidth(15),
    height: responsiveWidth(10),
    backgroundColor: '#616DBC',
    borderTopLeftRadius: responsiveWidth(6),
    borderBottomLeftRadius: responsiveWidth(6),
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    elevation: 10,
  },
  searchInput: {
    flex: 1,
    paddingLeft: responsiveWidth(3),
    color: COLORS.white,
  },

  topMiddle: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  headingText: {
    color: COLORS.white,
    fontSize: responsiveFontSize(3),
    fontWeight: '600',
  },
  topLast: {
    flexDirection: 'row',
    gap: 5,
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
});
