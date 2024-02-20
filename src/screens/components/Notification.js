import {FlatList, StyleSheet, Text, View, Image} from 'react-native';
import React, {useEffect, useState} from 'react';
import {
  responsiveHeight,
  responsiveWidth,
} from 'react-native-responsive-dimensions';
import img from '../../../assets/images/notification.png';
import axios from 'axios';

const Notification = () => {
  const [data, setData] = useState('');
  const notificationApi = async () => {
    try {
      const res = await axios.get(
        'https://app.srninfotech.com/bullsPanel/api/intraday-calls',
      );
      setData(res.data.data);
      console.log(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    notificationApi();
  }, []);

  const renderItem = ({item}) => {
    return (
      <View style={{flex: 1}}>
        <View style={{flex: 1, flexDirection: 'row', alignItems: 'center'}}>
          <Image
            source={img}
            resizeMode="contain"
            style={{width: responsiveWidth(8), height: responsiveHeight(5)}}
          />

          <View
            style={{
              borderRadius: responsiveWidth(1),
              paddingHorizontal: responsiveWidth(2),
              marginVertical: responsiveHeight(1),
            }}>
            <Text
              style={{
                paddingLeft: responsiveWidth(2),
                color: '#000',
                fontWeight: '700',
              }}>
              {item.title}
            </Text>
            <Text style={{paddingLeft: responsiveWidth(2), color: '#000'}}>
              {item.description}
            </Text>
          </View>
        </View>
      </View>
    );
  };

  return (
    <View style={{flex: 1, backgroundColor: '#ebf6f7'}}>
      <FlatList
        data={data}
        renderItem={renderItem}
        keyExtractor={item => item.id.toString()}
      />
    </View>
  );
};

export default Notification;

const styles = StyleSheet.create({});
