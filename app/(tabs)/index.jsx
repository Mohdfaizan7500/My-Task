import * as Notifications from 'expo-notifications';
import { useEffect } from 'react';
import { StyleSheet } from 'react-native';
import Navigation from '../../src/Navigation/Navigation';

const index = () => {
  useEffect(() => {
    Notifications.setNotificationHandler({
      handleNotification: async () => ({
        shouldPlaySound: true,
        shouldSetBadge: true,
        shouldShowBanner: true,
        shouldShowList: true,
      }),
    });
    // Optional: Request notification permissions
    const requestPermissions = async () => {
      await Notifications.requestPermissionsAsync();
    };
    requestPermissions();
  }, []);
  return (
    <Navigation />
  )
}

export default index

const styles = StyleSheet.create({})