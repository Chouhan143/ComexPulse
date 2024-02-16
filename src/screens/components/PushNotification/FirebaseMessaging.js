import messaging from '@react-native-firebase/messaging';
import AsyncStorage from '@react-native-async-storage/async-storage';

import notifee, {AndroidImportance} from '@notifee/react-native';
export const setupFirebaseMessaging = () => {
  // Register background handler
  messaging().setBackgroundMessageHandler(async remoteMessage => {
    console.log('Message handled in the background!', remoteMessage);
    // Add your custom logic for background message handling
    const channelId = await notifee.createChannel({
      id: 'important',
      name: 'Important Notifications',
      importance: AndroidImportance.HIGH,
    });
    // Display a notification using notifee
    notifee.displayNotification({
      title: remoteMessage.notification.title,
      body: remoteMessage.notification.body,

      android: {
        channelId, // Make sure this matches the channelId you created
        sound: 'default',
        importance: AndroidImportance.HIGH,
      },
    });
  });

  // Handle initial notification when app is in quit state
  messaging().getInitialNotification(async remoteMessage => {
    console.log('Message handled in the Quit State!', remoteMessage);
    // Add your custom logic for handling initial notification in quit state
    const channelId = await notifee.createChannel({
      id: 'important',
      name: 'Important Notifications',
      importance: AndroidImportance.HIGH,
    });
    // Display a notification using notifee
    notifee.displayNotification({
      title: remoteMessage.notification.title,
      body: remoteMessage.notification.body,

      android: {
        channelId, // Make sure this matches the channelId you created
        sound: 'default',
        importance: AndroidImportance.HIGH,
      },
    });
  });

  // Handle foreground messages
  const unsubscribe = messaging().onMessage(async remoteMessage => {
    // console.log('A new FCM message arrived!', remoteMessage);
    // Add your custom logic for handling foreground messages
    const channelId = await notifee.createChannel({
      id: 'important',
      name: 'Important Notifications',
      importance: AndroidImportance.HIGH,
    });
    // Display a notification using notifee
    notifee.displayNotification({
      title: remoteMessage.notification.title,
      body: remoteMessage.notification.body,

      android: {
        channelId, // Make sure this matches the channelId you created
        sound: 'default',
        importance: AndroidImportance.HIGH,
      },
    });
  });

  return unsubscribe;
};
