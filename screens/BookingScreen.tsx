import React, { useEffect, useState } from "react";
import { View, StyleSheet, Button, Alert, Text } from "react-native";
import MapView, { Marker } from "react-native-maps";
import { supabase } from "../configs/supabaseConfig";
import { useAuth } from "../context/AuthContext";
import { useLocalSearchParams } from "expo-router/build/hooks";

const DEFAULT_REGION = {
  latitude: 37.7749, // San Francisco
  longitude: -122.4194,
  latitudeDelta: 0.0922,
  longitudeDelta: 0.0421,
};

export default function BookingScreen() {
  const { latitude, longitude }: any = useLocalSearchParams();

  const { user } = useAuth();
  const [loading, setLoading] = useState(false);
  const [selectedLocation, setSelectedLocation] = useState<any>({
    latitude: Number(latitude),
    longitude: Number(longitude),
    latitudeDelta: 0.005,
    longitudeDelta: 0.005,
  });

  const handleBooking = async () => {
    const { error } = await supabase.from("bookings").insert({
      user_id: user.id,
      // pickup_location: selectedLocation,
    });

    if (error) {
      Alert.alert("Error", "Failed to create booking");
    } else {
      Alert.alert("Success", "Booking created successfully");
      // navigation.goBack();
    }
  };

  const { latitude: lat, longitude: long } = selectedLocation;

  return (
    <View style={styles.container}>
      <MapView
        style={styles.map}
        initialRegion={
          latitude && longitude
            ? {
                latitude: lat, // San Francisco
                longitude: long,
                latitudeDelta: 0.005,
                longitudeDelta: 0.005,
              }
            : DEFAULT_REGION
        }
      >
        <Marker
          coordinate={{
            latitude: lat,
            longitude: long,
          }}
        />
      </MapView>
      <Button title="Confirm Booking" onPress={handleBooking} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    padding: 20,
  },
  map: {
    flex: 1,
  },
});
