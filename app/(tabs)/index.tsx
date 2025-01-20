import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { AuthProvider } from '../../context/AuthContext';
import LoginScreen from '../screens/LoginScreen';
import RegisterScreen from '../screens/RegisterScreen';
import UserHomeScreen from '../screens/UserHomeScreen';
import AdminDashboardScreen from '../screens/AdminDashboardScreen';
import BookingScreen from '../screens/BookingScreen';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <AuthProvider>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Login">
          <Stack.Screen name="Login" component={LoginScreen} />
          <Stack.Screen name="Register" component={RegisterScreen} />
          <Stack.Screen name="UserHome" component={UserHomeScreen} />
          <Stack.Screen name="AdminDashboard" component={AdminDashboardScreen} />
          <Stack.Screen name="Booking" component={BookingScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    </AuthProvider>
  );
}