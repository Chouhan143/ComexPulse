import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  opacity,
  Image,
} from 'react-native';
import React from 'react';
import {
  responsiveWidth,
  responsiveHeight,
  responsiveFontSize,
} from 'react-native-responsive-dimensions';
import Icon from 'react-native-vector-icons/FontAwesome';
import Icon1 from 'react-native-vector-icons/MaterialCommunityIcons';
import Font5 from 'react-native-vector-icons/FontAwesome5';
import Font6 from 'react-native-vector-icons/FontAwesome6';
import Iconic from 'react-native-vector-icons/Ionicons';
import Material from 'react-native-vector-icons/MaterialIcons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';

const Account = () => {
  const navigation = useNavigation();
  const logout = async () => {
    try {
      await AsyncStorage.removeItem('accessToken');
      navigation.navigate('Login');
    } catch (error) {
      console.error('Error while logging out:', error);
    }
  };


  return (
    <View style={{ flex: 1, backgroundColor: '#fff' }}>
      <View style={styles.top}>
        <Image
          source={require('../../../assets/images/topBg.jpg')}
          style={{
            width: responsiveWidth(100),
            height: responsiveHeight(25),
            position: 'absolute',
          }}
        />
        <TouchableOpacity style={{
          alignSelf: 'flex-end', marginHorizontal: responsiveWidth(5),
          marginVertical: responsiveHeight(1),
          backgroundColor: '#fff',
          width: responsiveWidth(8),
          height: responsiveWidth(8),
          borderRadius: responsiveWidth(4),
          justifyContent: 'center',
          alignItems: 'center'
        }} onPress={logout}>
          <Font5 name="power-off" size={25} color="red" />
        </TouchableOpacity>

        <Image
          source={require('../../../assets/images/user.jpg')}
          style={{
            width: responsiveWidth(50),
            height: responsiveWidth(50),
            borderRadius: responsiveWidth(25),
            backgroundColor: 'green',
            justifyContent: 'center',
            alignItems: 'center',
            display: 'flex',
            alignSelf: 'center',
            marginTop: responsiveHeight(8),
          }}
        />
        <View
          style={{
            justifyContent: 'center',
            alignItems: 'center',
            marginTop: responsiveHeight(2),
          }}>
          <Text
            style={{
              color: '#000',
              fontSize: responsiveFontSize(3),
              fontWeight: '700',
            }}>
            Johan Singh
          </Text>
        </View>
      </View>

      <View style={styles.bottom}>
        <View style={{ marginTop: responsiveHeight(2) }}>
          <View style={styles.item}>
            <TouchableOpacity
              style={styles.item_icon}
              onPress={() => navigation.navigate('ProfileEdit')}>
              <Font5 name="user-plus" size={22} color={'black'} />
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.item_content}
              onPress={() => navigation.navigate('ProfileEdit')}>
              <Text style={styles.item_text}>Edit Profile</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.sperator}></View>

          <View style={styles.item}>
            <TouchableOpacity style={styles.item_icon}>
              <Icon1 name="cash-refund" size={25} color={'black'} />
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.item_content}
              onPress={() => navigation.navigate('Funds')}>
              <Text style={styles.item_text}>Funds</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.sperator}></View>

          <View style={styles.item}>
            <TouchableOpacity
              style={styles.item_icon}
              onPress={() => navigation.navigate('BankDetails')}>
              <Icon name="bank" size={22} color={'black'} />
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.item_content}
              onPress={() => navigation.navigate('BankDetails')}>
              <Text style={styles.item_text}>Bank Details</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.sperator}></View>

          <View style={styles.item}>
            <TouchableOpacity
              style={styles.item_icon}
              onPress={() => navigation.navigate('Help_Support')}>
              <Material name="headset-mic" size={25} color={'black'} />
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.item_content}
              onPress={() => navigation.navigate('Help_Support')}>
              <Text style={styles.item_text}>Help & Support</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.sperator}></View>
          <View style={styles.item}>
            <TouchableOpacity style={styles.item_icon}>
              <Iconic name="settings" size={25} color={'black'} />
            </TouchableOpacity>
            <TouchableOpacity style={styles.item_content}>
              <Text style={styles.item_text}>Settings</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  top: {
    // backgroundColor: 'lightblue',
  },
  bottom: {
    backgroundColor: '#fff',
    // marginTop: responsiveHeight(20),
  },
  item: {
    flexDirection: 'row',
    padding: responsiveWidth(5),
  },
  item_icon: {
    marginRight: responsiveWidth(1),
  },
  item_content: {
    marginLeft: responsiveWidth(4),
    justifyContent: 'center',
  },
  item_text: {
    fontSize: 16,
    color: 'black',
    fontWeight: '500',
  },
  sperator: {
    height: responsiveWidth(0.2),
    backgroundColor: 'gray',
    opacity: 0.5,
  },
});
export default Account;
