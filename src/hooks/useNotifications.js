import React from 'react';
import { Notifications } from 'expo';
import * as Permissions from 'expo-permissions';

import expoPushTokensApi from '../api/expoPushtoken';

export default function useNotifications(notificationListener) {
  React.useEffect(() => {
    registerForPushNotifications();

    if (notificationListener) Notifications.addListener(notificationListener);
  }, []);

  const registerForPushNotifications = async () => {
    try {
      const permission = await Permissions.askAsync(Permissions.NOTIFICATIONS);
      if (!permission.granted) return;

      const token = await Notifications.getExpoPushTokenAsync();
      expoPushTokensApi.register(token);
    } catch (error) {
      console.log('Error getting a push token', error);
    }
  };
}
