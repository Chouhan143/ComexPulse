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
import BankDetails from '../../screens/components/BankDetails';
import Help_Support from '../../screens/components/Help_Support';
import Deposit from '../../screens/components/Deposit';
import Withdraw from '../../screens/components/Withdraw';
import MobileRegistration from '../../screens/auth/MobileRegistration';
import MobileOtp from '../../screens/auth/MobileOtp';
import EmailRegistration from '../../screens/auth/EmailRegistration';
import EmailOtp from '../../screens/auth/EmailOtp';
import UserDetails from '../../screens/auth/UserDetails';
import Document from '../../screens/auth/Document';
const Stack = createStackNavigator();

function AuthNavigator() {
  return (
    <Stack.Navigator initialRouteName="SplaceScreen">
      <Stack.Screen
        name="Login"
        options={{ headerShown: false }}
        component={Login}
      />
      <Stack.Screen
        name="Signup"
        options={{ headerShown: false }}
        component={Signup}
      />
      <Stack.Screen
        name="MobileRegistration"
        options={{ headerShown: false }}
        component={MobileRegistration}
      />
      <Stack.Screen
        name="MobileOtp"
        options={{ headerShown: false }}
        component={MobileOtp}
      />
      <Stack.Screen
        name="EmailRegistration"
        options={{ headerShown: false }}
        component={EmailRegistration}
      />
      <Stack.Screen
        name="EmailOtp"
        options={{ headerShown: false }}
        component={EmailOtp}
      />
      <Stack.Screen
        name="UserDetails"
        options={{ headerShown: false }}
        component={UserDetails}
      />
      <Stack.Screen
        name="Document"
        options={{ headerShown: false }}
        component={Document}
      />
      <Stack.Screen
        name="SplaceScreen"
        options={{ headerShown: false }}
        initialParams={{ initialRoute: 'SplaceScreen' }}
        component={SplaceScreen}
      />
      <Stack.Screen
        name="DrawerNavigator"
        options={{ headerShown: false }}
        component={DrawerNavigator}
      />
      <Stack.Screen
        name="SearchData"
        options={{ headerShown: false }}
        component={SearchData}
      />
      <Stack.Screen
        name="GraphUI"
        options={{ headerShown: false }}
        component={GraphUI}
      />
      <Stack.Screen
        name="Edit"
        options={{ headerShown: false }}
        component={Edit}
      />
      <Stack.Screen
        name="ProfileEdit"
        options={{ headerShown: false }}
        component={ProfileEdit}
      />
      <Stack.Screen
        name="Funds"
        options={{ headerShown: false }}
        component={Funds}
      />
      <Stack.Screen
        name="Deposit"
        options={{ headerShown: false }}
        component={Deposit}
      />
      <Stack.Screen
        name="Withdraw"
        options={{ headerShown: false }}
        component={Withdraw}
      />
      <Stack.Screen
        name="Help_Support"
        options={{ headerShown: false }}
        component={Help_Support}
      />
      <Stack.Screen
        name="BankDetails"
        options={{ headerShown: false }}
        component={BankDetails}
      />
    </Stack.Navigator>
  );
}

export default AuthNavigator;
