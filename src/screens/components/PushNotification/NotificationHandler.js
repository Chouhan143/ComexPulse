// NotificationHandler.js

import notifee from '@notifee/react-native';

export const displayNotification = async (title, body) => {
  const notification = await notifee.displayNotification({
    title,
    body,
  });

  //   console.log('Notification displayed:', notification);
};

// ... (other functions for handling notification events)
