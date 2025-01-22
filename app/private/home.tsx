import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Button } from 'react-native';
import { useRouter } from 'expo-router';
import { useAuth } from '@/context/AuthContext';
import * as Location from 'expo-location';

export default function Home() {
  const router = useRouter();
    const { user, signOut } = useAuth();
    //  const [location, setLocation] = useState<Location.LocationObject | null>(null);
   
    //  useEffect(() => {
    //    (async () => {
    //      let { status } = await Location.requestForegroundPermissionsAsync();
    //      if (status !== 'granted') {
    //        return;
    //      }
   
    //      let location = await Location.getCurrentPositionAsync({});
    //      setLocation(location);
    //    })();
    //  }, []);
   
    //  const handleBookTric = () => {
    //    if (location) {
    //      // navigation.navigate('Booking', { location });
    //    }
    //  };

   const onSignout = async () => {
      const response = await signOut();
      console.log('sign out => ', response);
      router.push('../')
   } 


  return (
    <View style={styles.container}>
          <Text style={styles.title}>Welcome!</Text>
          <Button title="Book a Tric" />
          <Button title="Sign Out" onPress={onSignout} />
        </View>
  )
}

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      padding: 20,
    },
    title: {
      fontSize: 24,
      marginBottom: 20,
      textAlign: 'center',
    },
  });