import React, {useEffect} from 'react';
import {
  CardStyleInterpolators,
  createStackNavigator,
} from '@react-navigation/stack';
// import SplaceScreen from '../../screens/SplaceScreen/SplaceScreen';
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
import DocsUpload from '../../screens/auth/DocsUpload';
import {setLoggedInStatus} from '../../redux/market/coinSlice';
import {useSelector} from 'react-redux';
import AsyncStorage from '@react-native-async-storage/async-storage';
import ReanimatedLoaderButton from '../../screens/components/ReanimatedLoaderButton';
import {useNavigation} from '@react-navigation/native';
import {Easing, BackHandler, Alert} from 'react-native';
import Security from '../../screens/components/Security';
import ForgotPassword from '../../screens/auth/ForgotPassword';
import ForgotPasswordOtp from '../../screens/auth/ForgotPasswordOtp';
import Notification from '../../screens/components/Notification';
const Stack = createStackNavigator();

function AuthNavigator() {
  const navigation = useNavigation();
  const isLoggedIn = useSelector(state => state.coin.isLoggedIn);

  useEffect(() => {
    const checkToken = async () => {
      try {
        const token = await AsyncStorage.getItem('accessToken');
        if (token) {
          setLoggedInStatus(token);
          navigation.navigate('DrawerNavigator');
        } else {
          navigation.navigate('Login');
        }
      } catch (error) {
        console.log(error);
      }
    };
    checkToken();

    // back handler logic here
    const backAction = () => {
      BackHandler.exitApp();
      return true;
    };

    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      backAction,
    );
    return () => backHandler.remove();
  }, [setLoggedInStatus, navigation]);

  const config = {
    animation: 'spring',
    config: {
      stiffness: 1000,
      damping: 100,
      mass: 3,
      overshootClamping: false,
      restDisplacementThreshold: 0.01,
      restSpeedThreshold: 0.01,
    },
  };

  const closeConfig = {
    animation: 'timing',
    config: {
      stiffness: 1000,
      duration: 400,
      easing: Easing.linear,
    },
  };

  return (
    <Stack.Navigator
      // initialRouteName="SplaceScreen"
      initialRouteName={isLoggedIn ? 'DrawerNavigator' : 'SplaceScreen'}
      screenOptions={{
        gestureEnabled: true,
        gestureDirection: 'horizontal',
        transitionSpec: {
          open: config,
          close: closeConfig,
        },
        cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
        headerMode: 'float',
      }}>
      {/* {isLoggedIn ? ( */}
      <>
        <Stack.Screen
          name="DrawerNavigator"
          options={{headerShown: false}}
          component={DrawerNavigator}
        />
        <Stack.Screen
          name="SearchData"
          options={{headerShown: false}}
          component={SearchData}
        />
        <Stack.Screen
          name="GraphUI"
          options={{headerShown: false}}
          component={GraphUI}
        />
        <Stack.Screen
          name="Edit"
          options={{headerShown: false}}
          component={Edit}
        />
        <Stack.Screen
          name="ProfileEdit"
          options={{headerShown: false}}
          component={ProfileEdit}
        />
        <Stack.Screen
          name="Funds"
          options={{headerShown: false}}
          component={Funds}
        />
        <Stack.Screen
          name="Deposit"
          options={{headerShown: false}}
          component={Deposit}
        />
        <Stack.Screen
          name="Withdraw"
          options={{headerShown: false}}
          component={Withdraw}
        />
        <Stack.Screen
          name="Help_Support"
          options={{headerShown: false}}
          component={Help_Support}
        />
        <Stack.Screen
          name="BankDetails"
          options={{headerShown: false}}
          component={BankDetails}
        />
        <Stack.Screen
          name="Security"
          options={{headerShown: true}}
          component={Security}
        />
      </>
      {/* ) : ( */}
      <>
        <Stack.Screen
          name="Login"
          options={{headerShown: false}}
          component={Login}
        />
        <Stack.Screen
          name="Signup"
          options={{headerShown: false}}
          component={Signup}
        />
        <Stack.Screen
          name="ForgotPassword"
          options={{headerShown: true}}
          component={ForgotPassword}
        />

        <Stack.Screen
          name="ForgotPasswordOtp"
          options={{headerShown: true}}
          component={ForgotPasswordOtp}
        />

        <Stack.Screen
          name="MobileRegistration"
          options={{headerShown: false}}
          component={MobileRegistration}
        />
        <Stack.Screen
          name="MobileOtp"
          options={{headerShown: false}}
          component={MobileOtp}
        />
        <Stack.Screen
          name="EmailRegistration"
          options={{headerShown: false}}
          component={EmailRegistration}
        />
        <Stack.Screen
          name="EmailOtp"
          options={{headerShown: false}}
          component={EmailOtp}
        />
        <Stack.Screen
          name="UserDetails"
          options={{headerShown: false}}
          component={UserDetails}
        />
        <Stack.Screen
          name="DocsUpload"
          options={{headerShown: false}}
          component={DocsUpload}
        />
        <Stack.Screen
          name="SplaceScreen"
          options={{headerShown: false}}
          initialParams={{initialRoute: 'SplaceScreen'}}
          component={SplaceScreen}
        />

        <Stack.Screen
          name="Notification"
          component={Notification}
          options={{
            headerShown: true,
          }}
        />
      </>
      {/* )} */}
    </Stack.Navigator>
  );
}

export default AuthNavigator;
