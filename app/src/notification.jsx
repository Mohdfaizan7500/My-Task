import Constants from 'expo-constants';
import * as Device from 'expo-device';
import * as Notifications from 'expo-notifications';
import { useEffect, useState } from 'react';
import { Alert, Platform, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';


Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldPlaySound: true,
    shouldSetBadge: true,
    shouldShowBanner: true,
    shouldShowList: true,
  }),
});

const Notification = () => {
  const [title, setTitle] = useState('');
  const [body, setBody] = useState('')
  const [time, setTime] = useState('')



  useEffect(() => {
    registerForPushNotificationsAsync().then(token => console.log("Token Faizan:",token));

    if (Platform.OS === 'android') {
      Notifications.getNotificationChannelsAsync().then(value =>console.log(value ?? []));
    }
    const notificationListener = Notifications.addNotificationReceivedListener(notification => {
      console.log(notification);
    });

    const responseListener = Notifications.addNotificationResponseReceivedListener(response => {
      console.log(response);
    });

    return () => {
      notificationListener.remove();
      responseListener.remove();
    };
  }, []);

  async function schedulePushNotification() {
    console.log("start")
    await Notifications.scheduleNotificationAsync({
      content: {
        title: title,
        body: body,
        data: { data: 'goes here', test: { test1: 'more data' } },
      },
      trigger: {
        type: Notifications.SchedulableTriggerInputTypes.TIME_INTERVAL,
        seconds: Number(time),
      },
    });
    console.log("End")
  }

  const handle =async () => {
    Alert.alert("Send")
    await schedulePushNotification()
    // setTitle('')
    // setBody('')
    // setTime("")
  }
  return (
    <View style={styles.container}>
      <Text style={{ fontSize: 20, fontWeight: "800", marginBottom: 50 }}>Send Notification</Text>
      <TextInput
        placeholder='Enter Title here '
        placeholderTextColor={"gray"}
        value={title}
        onChangeText={(txt) => setTitle(txt)}
        style={styles.TextInput} />
      <TextInput
        placeholder='Enter body here '
        placeholderTextColor={"gray"}
        value={body}
        onChangeText={(txt) => setBody(txt)}
        style={styles.TextInput} />
      <TextInput
        placeholder='Enter Time here '
        placeholderTextColor={"gray"}
        value={time}
        onChangeText={(txt) => setTime(txt)}
        style={styles.TextInput} />
      <TouchableOpacity style={styles.Button} onPress={handle}>
        <Text style={{ color: "#fff", fontWeight: "700" }}>Press Me!</Text>
      </TouchableOpacity>

    </View>
  )
}



async function registerForPushNotificationsAsync() {
  let token;

  if (Platform.OS === 'android') {
    await Notifications.setNotificationChannelAsync('myNotificationChannel', {
      name: 'A channel is needed for the permissions prompt to appear',
      importance: Notifications.AndroidImportance.MAX,
      vibrationPattern: [0, 250, 250, 250],
      lightColor: '#FF231F7C',
    });
  }

  if (Device.isDevice) {
    const { status: existingStatus } = await Notifications.getPermissionsAsync();
    let finalStatus = existingStatus;
    if (existingStatus !== 'granted') {
      const { status } = await Notifications.requestPermissionsAsync();
      finalStatus = status;
    }
    if (finalStatus !== 'granted') {
      alert('Failed to get push token for push notification!');
      return;
    }
    // Learn more about projectId:
    // https://docs.expo.dev/push-notifications/push-notifications-setup/#configure-projectid
    // EAS projectId is used here.
    try {
      const projectId =
        Constants?.expoConfig?.extra?.eas?.projectId ?? Constants?.easConfig?.projectId;
      if (!projectId) {
        throw new Error('Project ID not found');
      }
      token = (
        await Notifications.getExpoPushTokenAsync({
          projectId,
        })
      ).data;
      console.log(token);
    } catch (e) {
      token = `${e}`;
    }
  } else {
    alert('Must use physical device for Push Notifications');
  }

  return token;
}


export default Notification

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    height: "100%",
    flex: 1,
    backgroundColor: "white",
  },
  TextInput: {
    width: "90%",
    borderWidth: 0.5,
    borderRadius: 12,
    borderColor: "gray",
    marginBottom: 25,
    paddingStart: 20
  },
  Button: {
    width: "90%",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(30, 104, 216, 0.7)",
    paddingVertical: 15,
    borderRadius: 12
  }
})