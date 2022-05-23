import Constants from 'expo-constants';
import * as Notifications from 'expo-notifications';
import React, { useState, useEffect, useRef } from 'react';
import { Text, View, Button, Platform } from 'react-native';

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: false,
    shouldSetBadge: false,
  }),
});

export default function notificationControll() {
  useEffect(() => {
    schedulePushNotification()
  });
  return (
    <View
      style={{
        flex: 1,
        alignItems: 'center',
        justifyContent: 'space-around',
      }}
    >
      <Button
        title="Press to schedule a notification"
        onPress={async () => {
          schedulePushNotification();
        }}
      />
    </View>
  );
}

function schedulePushNotification() {
  Notifications.scheduleNotificationAsync({
    content: {
      title: "แจ้งเตือนรับประทานยา",
      body: 'คุณต้องรับประทานยา พารา จำนวน 2 เม็ด',
      data: { data: 'goes here' },
    },
    trigger: { seconds: 1 },
  });
}
