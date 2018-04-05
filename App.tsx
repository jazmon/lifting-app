/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import * as React from 'react';
import { Platform, StyleSheet, Text, View, Button } from 'react-native';
import ReactNativeAN from 'react-native-alarm-notification';
import * as dateFns from 'date-fns';

const ID = '1234';
const date = dateFns.format(
  dateFns.addSeconds(new Date(), 5),
  'DD-MM-YYYY HH:mm:ss',
);
console.log('date', date);
const alarmNotifData = {
  id: ID, // Required
  title: 'My Notification Title', // Required
  message: 'My Notification Message', // Required
  ticker: 'My Notification Ticker',
  auto_cancel: true, // default: true
  vibrate: true,
  vibration: 100, // default: 100, no vibration if vibrate: false
  small_icon: 'ic_launcher', // Required
  large_icon: 'ic_launcher',
  play_sound: true,
  sound_name: null, // Plays custom notification ringtone if sound_name: null
  color: 'red',
  schedule_once: true, // Works with ReactNativeAN.scheduleAlarm so alarm fires once
  tag: 'some_tag',
  fire_date: date, // Date for firing alarm, Required for ReactNativeAN.scheduleAlarm. Format: dd-MM-yyyy HH:mm:ss
};

const instructions = Platform.select({
  ios: 'Press Cmd+R to reload,\n' + 'Cmd+D or shake for dev menu',
  android:
    'Double tap R on your keyboard to reload,\n' +
    'Shake or press menu button for dev menu',
});

type Props = {};
export default class App extends React.Component<Props> {
  alarm = () => {
    //Schedule Future Alarm
    ReactNativeAN.scheduleAlarm(alarmNotifData);

    // Delete Scheduled Alarm
    // ReactNativeAN.deleteAlarm("12345");

    // //Send Local Notification Now
    // ReactNativeAN.sendNotification(alarmNotifData);

    // //Get All Scheduled Alarms
    // ReactNativeAN.getScheduledAlarms().then(alarmNotif=>console.log(alarmNotif));

    // //Clear Notification(s) From Notification Center/Tray
    // ReactNativeAN.removeAllFiredNotifications()
    // ReactNativeAN.removeFiredNotification("12345")

    // //Removes Future Local Notifications
    // ReactNativeAN.cancelAllNotifications()
    // ReactNativeAN.cancelNotification("12345")
  };

  clearAlarm = () => {
    ReactNativeAN.deleteAlarm(ID);
    // ReactNativeAN.deleteAlarm('12345');
    // ReactNativeAN.removeFiredNotification('12345');
    // ReactNativeAN.cancelAllNotifications();
    // ReactNativeAN.removeAllFiredNotifications();
    // ReactNativeAN.cancelNotification('12345');
  };

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.welcome}>Welcome to React Native!</Text>
        <Text style={styles.instructions}>To get started, edit App.js</Text>
        <Text style={styles.instructions}>{instructions}</Text>
        <Button title="alarm" onPress={this.alarm} />
        <Button title="mute alarm" onPress={this.clearAlarm} />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});
