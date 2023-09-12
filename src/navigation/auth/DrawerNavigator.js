import react from 'react';
import {createDrawerNavigator} from '@react-navigation/drawer';
import BottomTabNavigator from './BottomTabNavigator';
import WatchList from '../../screens/bottomTab/WatchList';
import PendingOrder from '../../screens/bottomTab/PendingOrder';
import LiveTrade from '../../screens/bottomTab/LiveTrade';
import Account from '../../screens/bottomTab/Account';
import CustomDrawer from '../../screens/bottomTab/CustomDrawer';
import Entypo from 'react-native-vector-icons/Entypo';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {responsiveFontSize} from 'react-native-responsive-dimensions';
const Drawer = createDrawerNavigator();

function DrawerNavigator() {
  return (
    <Drawer.Navigator
      drawerPosition="right" // This sets the drawer position to right
      drawerType="slide" // This sets the drawer type to slide
      drawerContent={props => <CustomDrawer {...props} />}
      screenOptions={{
        drawerActiveBackgroundColor: '#7F7FD5',
        drawerActiveTintColor: '#fff',
        drawerInactiveTintColor: '#333',
        drawerLabelStyle: {
          fontSize: responsiveFontSize(2.2),
        },
      }}>
      <Drawer.Screen
        name="Home"
        component={BottomTabNavigator}
        options={{
          headerShown: false,
          drawerIcon: ({color}) => {
            <Entypo name="home" size={22} color={color} />;
          },
        }}
      />
      <Drawer.Screen
        name="WatchList"
        component={WatchList}
        options={{
          headerShown: false,
          drawerIcon: ({color}) => {
            <MaterialIcons name="favorite" size={22} color={color} />;
          },
        }}
      />
      <Drawer.Screen
        name="PendingOrder"
        component={PendingOrder}
        options={{headerShown: false}}
      />
      <Drawer.Screen
        name="LiveTrade"
        component={LiveTrade}
        options={{headerShown: false}}
      />
      <Drawer.Screen
        name="Account"
        component={Account}
        options={{headerShown: false}}
      />
      {/* <Drawer.Screen name="Article" component={Article} /> */}
    </Drawer.Navigator>
  );
}
export default DrawerNavigator;
