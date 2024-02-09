import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Home from '../../screens/bottomTab/Home';
// import LiveTrade from '../../screens/bottomTab/LiveTrade';
// import PendingOrder from '../../screens/bottomTab/PendingOrder';
import WatchList from '../../screens/bottomTab/WatchList';
import Account from '../../screens/bottomTab/Account';
import Icon from 'react-native-vector-icons/AntDesign';
import LiveTrade from '../../screens/components/TopTabScreens/LiveTrade';
import PendingTrade from '../../screens/components/TopTabScreens/PendingTrade';
import HoldingTrade from '../../screens/components/TopTabScreens/HoldingTrade';
import PastTrade from '../../screens/components/TopTabScreens/PastTrade';
import {Image, View, StyleSheet} from 'react-native';
import {
  responsiveFontSize,
  responsiveHeight,
  responsiveScreenWidth,
  responsiveWidth,
} from 'react-native-responsive-dimensions';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import {COLORS} from '../../constants/theme';

const TopTab = createMaterialTopTabNavigator();
const Tab = createBottomTabNavigator();

function BottomTabNavigator() {
  return (
    <Tab.Navigator
      screenOptions={({route}) => ({
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
          left: responsiveWidth(5),
        },
        tabBarLabelStyle: {
          fontSize: responsiveFontSize(1.8),
          fontWeight: '800',
        },
        tabBarInactiveTintColor: '#000 ',
        tabBarActiveTintColor: '#fff',

        tabBarIcon: ({focused, color, size}) => {
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
          } else if (route.name === 'Pending_Live') {
            iconName = focused
              ? require('../../../assets/images/1x/PendingTradeG.png')
              : require('../../../assets/images/1x/PendingTradeIcon.png');
          } else if (route.name === 'Holding_Past') {
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
              <Image source={iconName} style={{width: 25, height: 25}} />
            </View>
          );
        },
        headerShown: false,
      })}>
      <Tab.Screen name="Home" component={Home} />
      <Tab.Screen name="WatchList" component={WatchList} />
      <Tab.Screen name="Pending_Live" component={Pending_Live} />
      <Tab.Screen name="Holding_Past" component={Holding_Past} />
      <Tab.Screen name="Account" component={Account} />
    </Tab.Navigator>
  );
}
export default BottomTabNavigator;

function Pending_Live() {
  return (
    <TopTab.Navigator
      screenOptions={{
        tabBarStyle: styles.containerStyle,
        tabBarIndicatorStyle: styles.indicator,
        tabBarLabelStyle: styles.lable,
        tabBarActiveTintColor: COLORS.headingTextColor,
        tabBarInactiveTintColor: '#fff',
      }}>
      <TopTab.Screen
        options={{
          tabBarIndicatorStyle: [
            styles.indicator,
            {marginLeft: responsiveWidth(2.5)},
          ],
        }}
        name="Pending"
        component={PendingTrade}
      />
      <TopTab.Screen
        options={{
          tabBarIndicatorStyle: [
            styles.indicator,
            {width: responsiveWidth(45)},
          ],
        }}
        name="LiveTrade"
        component={LiveTrade}
      />
    </TopTab.Navigator>
  );
}

function Holding_Past() {
  return (
    <TopTab.Navigator
      screenOptions={{
        tabBarStyle: styles.containerStyle,
        tabBarIndicatorStyle: styles.indicator,
        tabBarLabelStyle: styles.lable,
        tabBarActiveTintColor: COLORS.headingTextColor,
        tabBarInactiveTintColor: '#fff',
      }}>
      <TopTab.Screen
        options={{
          tabBarIndicatorStyle: [
            styles.indicator,
            {marginLeft: responsiveWidth(2.5)},
          ],
        }}
        name="Holding"
        component={HoldingTrade}
      />
      <TopTab.Screen
        options={{
          tabBarIndicatorStyle: [
            styles.indicator,
            {width: responsiveWidth(45)},
          ],
        }}
        name="Past"
        component={PastTrade}
      />
    </TopTab.Navigator>
  );
}

const styles = StyleSheet.create({
  indicator: {
    backgroundColor: '#fff',
    position: 'absolute',
    zIndex: -1,
    bottom: responsiveHeight(0.8),
    height: responsiveHeight(4.3),
  },

  containerStyle: {
    marginVertical: responsiveHeight(1),
    backgroundColor: COLORS.secondary,
    width: responsiveWidth(95),
    height: responsiveHeight(6),
    alignSelf: 'center',
    borderRadius: responsiveWidth(1),
  },

  lable: {
    fontWeight: 'bold',
  },
});
