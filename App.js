import * as React from 'react';
import {
  NavigationContainer,
  useNavigationContainerRef,
} from '@react-navigation/native';
import AuthNavigator from './src/navigation/auth/AuthNavigator';
import {useFlipper} from '@react-navigation/devtools';
import {Provider} from 'react-redux';
import {store} from './src/redux/store';
import {PaperProvider} from 'react-native-paper';
import {BottomSheetModalProvider} from '@gorhom/bottom-sheet';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import Toast from 'react-native-toast-message';
import messaging from '@react-native-firebase/messaging';
import {Alert, Platform} from 'react-native';
import {useEffect} from 'react';
import notifee, {EventType} from '@notifee/react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {displayNotification} from './src/screens/components/PushNotification/NotificationHandler';
import {setupFirebaseMessaging} from './src/screens/components/PushNotification/FirebaseMessaging';
export default function App() {
  const navigationRef = useNavigationContainerRef();

  // getFCM Token for notification
  const getDeviceToken = async () => {
    let fcmToken = await messaging().getToken();
    await AsyncStorage.setItem('fcmToken', fcmToken);
  };

  useEffect(() => {
    getDeviceToken();
  }, []);

  useEffect(() => {
    // Setup Firebase Messaging
    const unsubscribeFirebaseMessaging = setupFirebaseMessaging();
    return () => {
      // Clean up Firebase Messaging subscriptions
      unsubscribeFirebaseMessaging();
    };
  }, []);

  // Handle foreground messages with Notifee
  useEffect(() => {
    const unsubscribe = messaging().onMessage(async remoteMessage => {
      displayNotification(
        remoteMessage.notification.title,
        remoteMessage.notification.body,
      );
    });

    return unsubscribe;
  }, []);

  useFlipper(navigationRef);
  return (
    <Provider store={store}>
      <PaperProvider>
        <GestureHandlerRootView style={{flex: 1}}>
          <BottomSheetModalProvider>
            <NavigationContainer ref={navigationRef}>
              <AuthNavigator />
            </NavigationContainer>
          </BottomSheetModalProvider>
        </GestureHandlerRootView>
      </PaperProvider>
      <Toast />
    </Provider>
  );
}
