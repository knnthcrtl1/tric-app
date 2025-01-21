import React, { useState } from 'react';
import { View, StyleSheet, Button, Alert } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import { supabase } from '../configs/supabaseConfig';
import { useAuth } from '../context/AuthContext';

export default function BookingScreen({ route, navigation }: any) {
  const { location } = route.params;
  const { user } = useAuth();
  const [selectedLocation, setSelectedLocation] = useState({
    latitude: location.coords.latitude,
    longitude: location.coords.longitude,
  });

  const handleBooking = async () => {
    const { error } = await supabase
      .from('bookings')
      .insert({
        user_id: user.id,
        pickup_location: selectedLocation,
      });

    if (error) {
      Alert.alert('Error', 'Failed to create booking');
    } else {
      Alert.alert('Success', 'Booking created successfully');
      navigation.goBack();
    }
  };

  return (
    <View style={styles.container}>
      <MapView
        style={styles.map}
        initialRegion={{
          latitude: selectedLocation.latitude,
          longitude: selectedLocation.longitude,
          latitudeDelta: 0.005,
          longitudeDelta: 0.005,
        }}
        onPress={(e) => setSelectedLocation(e.nativeEvent.coordinate)}
      >
        <Marker coordinate={selectedLocation} />
      </MapView>
      <Button title="Confirm Booking" onPress={handleBooking} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    flex: 1,
  },
});