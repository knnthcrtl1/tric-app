import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, StyleSheet, Button } from 'react-native';
import { supabase } from '../../configs/supabaseConfig';
// import MapView, { Marker } from 'react-native-maps';

export default function AdminDashboardScreen() {
  const [bookings, setBookings] = useState<any>([]);
  const [drivers, setDrivers] = useState<any>([]);

  useEffect(() => {
    fetchBookings();
    fetchDrivers();
  }, []);

  const fetchBookings = async () => {
    const { data, error } = await supabase
      .from('bookings')
      .select(`
        *,
        users (full_name),
        drivers (user_id)
      `)
      .order('created_at', { ascending: false });

    if (data && !error) {
      setBookings(data);
    }
  };

  const fetchDrivers = async () => {
    const { data, error } = await supabase
      .from('drivers')
      .select(`
        *,
        users (full_name)
      `);

    if (data && !error) {
      setDrivers(data);
    }
  };

  const updateBookingStatus = async (bookingId: string, status: string) => {
    const { error } = await supabase
      .from('bookings')
      .update({ status })
      .eq('id', bookingId);

    if (!error) {
      fetchBookings();
    }
  };

  const assignDriver = async (bookingId: string, driverId: string) => {
    const { error } = await supabase
      .from('bookings')
      .update({ 
        driver_id: driverId,
        status: 'assigned'
      })
      .eq('id', bookingId);

    if (!error) {
      fetchBookings();
    }
  };

  const renderBookingItem = ({ item }: any) => (
    <View style={styles.bookingItem}>
      <Text>Customer: {item.users.full_name}</Text>
      <Text>Status: {item.status}</Text>
      {/* <MapView
        style={styles.map}
        initialRegion={{
          latitude: item.pickup_location.latitude,
          longitude: item.pickup_location.longitude,
          latitudeDelta: 0.005,
          longitudeDelta: 0.005,
        }}
      >
        <Marker
          coordinate={{
            latitude: item.pickup_location.latitude,
            longitude: item.pickup_location.longitude,
          }}
        />
      </MapView> */}
      {!item.driver_id && (
        <View style={styles.driverSelection}>
          {drivers.map((driver: any) => (
            <Button
              key={driver.id}
              title={`Assign ${driver.users.full_name}`}
              onPress={() => assignDriver(item.id, driver.id)}
            />
          ))}
        </View>
      )}
      {item.status === 'assigned' && (
        <Button
          title="Mark In Progress"
          onPress={() => updateBookingStatus(item.id, 'in_progress')}
        />
      )}
      {item.status === 'in_progress' && (
        <Button
          title="Mark Completed"
          onPress={() => updateBookingStatus(item.id, 'completed')}
        />
      )}
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Admin Dashboard</Text>
      <FlatList
        data={bookings}
        renderItem={renderBookingItem}
        keyExtractor={(item: any) => item.id}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
  },
  bookingItem: {
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  map: {
    height: 150,
    marginVertical: 10,
  },
  driverSelection: {
    marginTop: 10,
  },
});