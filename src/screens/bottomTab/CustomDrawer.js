import {
  Image,
  ImageBackground,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
} from 'react-native';
import React from 'react';
import {
  DrawerContentScrollView,
  DrawerItemList,
} from '@react-navigation/drawer';
import {
  responsiveFontSize,
  responsiveHeight,
  responsiveWidth,
} from 'react-native-responsive-dimensions';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
const CustomDrawer = props => {
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
    <View style={{ flex: 1 }}>
      <DrawerContentScrollView
        {...props}
        contentContainerStyle={{
          //   backgroundColor: '#f7a5cb',

          backgroundColor: '#7F7FD5',
        }}>
        <ImageBackground
          source={require('../../../assets/images/texture.jpg')}
          style={{
            padding: responsiveWidth(10),
          }}>
          <Image
            source={require('../../../assets/images/DummyUser.png')}
            resizeMode="center"
            style={{
              width: responsiveWidth(25),
              height: responsiveWidth(25),
              borderRadius: responsiveWidth(12.5),
            }}
          />
          <Text
            style={{
              color: '#fbd490',
              fontSize: responsiveFontSize(2.5),
              fontWeight: '800',
              letterSpacing: responsiveWidth(0.8),
              paddingTop: responsiveHeight(2),
            }}>
            Raj Malhotra
          </Text>
        </ImageBackground>
        <View
          style={{
            flex: 1,
            backgroundColor: '#fff',
            paddingTop: responsiveHeight(1.5),
          }}>
          <DrawerItemList {...props} />
        </View>
      </DrawerContentScrollView>
      <View
        style={{
          padding: responsiveWidth(4),
          borderTopWidth: responsiveWidth(0.3),
          borderTopColor: '#7F7FD5',
        }}>
        <TouchableOpacity
          style={{
            flexDirection: 'row',
          }} onPress={logout}>
          <MaterialCommunityIcons name="logout" size={22} color="#333" />
          <Text
            style={{
              color: '#333',
              fontSize: responsiveFontSize(2.2),
              fontWeight: '600',
              marginLeft: responsiveWidth(2),
            }}>
            Sign Out
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default CustomDrawer;

const styles = StyleSheet.create({});
