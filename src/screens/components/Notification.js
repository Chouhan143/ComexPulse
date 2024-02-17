import {FlatList, StyleSheet, Text, View, Image} from 'react-native';
import React from 'react';
import {
  responsiveHeight,
  responsiveWidth,
} from 'react-native-responsive-dimensions';

const Notification = () => {
  const Notifications = [
    {
      id: 1,
      massage: 'Silver buy 56020.01 order is pending.',
      img: require('../../../assets/images/bullish.png'),
    },
    {
      id: 2,
      massage: 'Gold sel 70500.01 order is pending.',
      img: require('../../../assets/images/bullish.png'),
    },
    {
      id: 3,
      massage: 'Silver buy 5620.01 order is pending.',
      img: require('../../../assets/images/bullish.png'),
    },
    {
      id: 4,
      massage: 'Silver buy 5620.01 order is pending.',
      img: require('../../../assets/images/bullish.png'),
    },
    {
      id: 5,
      massage:
        'Silver buy 5620.01 order is pending.Silver buy 5620.01 order is pending',
      img: require('../../../assets/images/bullish.png'),
    },
  ];

  const renderItem = ({item}) => {
    return (
      <View style={{flex: 1}}>
        <View
          style={{
            width: responsiveWidth(98),
            height: responsiveHeight(8),
            marginVertical: responsiveWidth(1),
            alignSelf: 'center',
            borderRadius: responsiveWidth(1),
            justifyContent: 'flex-start',
            flexDirection: 'row',
            alignItems: 'center',
            paddingHorizontal: responsiveWidth(2),
          }}>
          <Image
            source={item.img}
            resizeMode="contain"
            style={{width: responsiveWidth(8)}}
          />
          <Text style={{paddingLeft: responsiveWidth(2), color: '#000'}}>
            {item.massage}
          </Text>
        </View>
      </View>
    );
  };

  return (
    <View style={{flex: 1, backgroundColor: '#ebf6f7'}}>
      <FlatList
        data={Notifications}
        renderItem={renderItem}
        keyExtractor={item => item.id}
      />
    </View>
  );
};

export default Notification;

const styles = StyleSheet.create({});
