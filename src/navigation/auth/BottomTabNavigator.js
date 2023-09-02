import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Home from '../../screens/bottomTab/Home';
import LiveTrade from '../../screens/bottomTab/LiveTrade';
import PendingOrder from '../../screens/bottomTab/PendingOrder';
import WatchList from '../../screens/bottomTab/WatchList';
import Account from '../../screens/bottomTab/Account';
import Icon from 'react-native-vector-icons/AntDesign';
import { Image, View } from 'react-native';
import {
  responsiveFontSize,
  responsiveHeight,
  responsiveScreenWidth,
  responsiveWidth,
} from 'react-native-responsive-dimensions';
const Tab = createBottomTabNavigator();

function BottomTabNavigator() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarShowLabel: false,
        tabBarStyle: {
          backgroundColor: '#3949ab',
          width: '90%',
          height: responsiveHeight(8),
          position: 'absolute',
          // borderWidth:responsiveWidth(0.1),
          // borderTopLeftRadius:responsiveWidth(15),
          borderRadius: responsiveWidth(50),
          bottom: responsiveHeight(1),
          // marginHorizontal:responsiveWidth(20),
          alignSelf: 'center',
          justifyContent: 'center',
          left: responsiveWidth(5)

        },
        tabBarLabelStyle: {
          fontSize: responsiveFontSize(1.8),
          fontWeight: '800',
        },
        tabBarInactiveTintColor: '#000 ',
        tabBarActiveTintColor: '#fff',

        tabBarIcon: ({ focused, color, size }) => {
          let iconName;
          // let backgroundColor;
          if (route.name === 'Home') {
            iconName = focused
              ? require('../../../assets/images/1x/HomeG.png')
              : require('../../../assets/images/1x/HomeIcon.png');
          } else if (route.name === 'WatchList') {
            iconName = focused
              ? require('../../../assets/images/1x/WatchlistG.png')
              : require('../../../assets/images/1x/WatchlistIcon.png');
          } else if (route.name === 'PendingOrder') {
            iconName = focused
              ? require('../../../assets/images/1x/PendingTradeG.png')
              : require('../../../assets/images/1x/PendingTradeIcon.png');
          } else if (route.name === 'LiveTrade') {
            iconName = focused
              ? require('../../../assets/images/1x/LiveTradeG.png')
              : require('../../../assets/images/1x/LiveTradeIcon.png');
          } else if (route.name === 'Account') {
            iconName = focused
              ? require('../../../assets/images/1x/AccountG.png')
              : require('../../../assets/images/1x/AccountIcon.png');
          }
          return (
            <View
              style={{
                width: responsiveWidth(12),
                height: responsiveWidth(12),
                borderRadius: 30,
                justifyContent: 'center',
                alignItems: 'center',
                backgroundColor: focused ? '#fff' : 'transparent', // Set background color for the active tab
              }}>
              <Image source={iconName} style={{ width: 25, height: 25 }} />
            </View>
          );
        },
        headerShown: false,
      })}>
      <Tab.Screen name="Home" component={Home} />
      <Tab.Screen name="WatchList" component={WatchList} />
      <Tab.Screen name="PendingOrder" component={PendingOrder} />
      <Tab.Screen name="LiveTrade" component={LiveTrade} />
      <Tab.Screen name="Account" component={Account} />
    </Tab.Navigator>
  );
}
export default BottomTabNavigator;

// const styles = StyleSheet.create({
//   tabIconContainer: {
//     width: 60, // Adjust this to your icon size
//     height: 60, // Adjust this to your icon size
//     borderRadius: 30, // Half of the width/height for a circular background
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
// });
