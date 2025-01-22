import React, { useEffect, useState } from "react";
import { View, StyleSheet, Button, Alert, Text } from "react-native";
import MapView, { Marker } from "react-native-maps";
import { supabase } from "../configs/supabaseConfig";
import { useAuth } from "../context/AuthContext";
import { useLocalSearchParams } from "expo-router/build/hooks";

export default function BookingScreen() {
  const { latitude, longitude }: any = useLocalSearchParams();

  const { user } = useAuth();
  const [loading, setLoading] = useState(false);
  const [selectedLocation, setSelectedLocation] = useState<any>({
    latitude: 0,
    longitude: 0,
    latitudeDelta: 0.005,
    longitudeDelta: 0.005,
  });

  useEffect(() => {
    setLoading(true);
    if (latitude && longitude) {
      setSelectedLocation({ ...selectedLocation, latitude, longitude });
      setLoading(false);
    }
  }, [
    selectedLocation.latitude,
    selectedLocation.latitude,
    latitude,
    longitude,
  ]);

  console.log(selectedLocation);

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

  if (!selectedLocation?.latitude) return null;

  return (
    <View style={styles.container}>
      <View>
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
          {/* <Marker
            coordinate={{
              latitude: 0 || latitude,
              longitude: 0 || longitude,
            }}
          /> */}
        </MapView>
      </View>
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
