import react from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import BottomTabNavigator from './BottomTabNavigator';
const Drawer = createDrawerNavigator();

function DrawerNavigator() {
  return (
    <Drawer.Navigator 
    drawerPosition="right" // This sets the drawer position to right
    drawerType="slide" // This sets the drawer type to slide
    >
      <Drawer.Screen name="MainHome" component={BottomTabNavigator} options={{headerShown:false}}  />
      {/* <Drawer.Screen name="Article" component={Article} /> */}
    </Drawer.Navigator>
  );
}
export default DrawerNavigator;