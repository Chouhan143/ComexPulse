import react from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import SplaceScreen from '../../screens/SplaceScreen/SlaceScreen';
import Login from '../../screens/auth/Login';
import Signup from '../../screens/auth/Signup';
import DrawerNavigator from './DrawerNavigator';
import SearchData from '../../screens/components/SearchData';
import GraphUI from '../../screens/components/GraphUI';
import Edit from '../../screens/components/Edit';
import ProfileEdit from '../../screens/components/ProfileEdit';
import Funds from '../../screens/components/Funds';
const Stack = createStackNavigator();

function AuthNavigator() {
  return (
    <Stack.Navigator initialRouteName='SplaceScreen'>
      <Stack.Screen name="Login" options={{headerShown:false}} component={Login} />
      <Stack.Screen name="Signup" options={{headerShown:false}} component={Signup} />
      <Stack.Screen name="SplaceScreen"  options={{headerShown:false}} initialParams={{initialRoute:"SplaceScreen"}} component={SplaceScreen} />
      <Stack.Screen name="DrawerNavigator" options={{headerShown:false}} component={DrawerNavigator}/>
      <Stack.Screen name="SearchData" options={{headerShown:false}} component={SearchData}/>
      <Stack.Screen name="GraphUI" options={{headerShown:false}} component={GraphUI}/>
      <Stack.Screen name="Edit" options={{headerShown:false}} component={Edit}/>
      <Stack.Screen name="ProfileEdit" options={{headerShown:false}} component={ProfileEdit}/>
      <Stack.Screen name="Funds" options={{headerShown:false}} component={Funds}/>
    
    </Stack.Navigator>
  );
}

export default AuthNavigator;