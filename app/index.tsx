import React, { useState } from 'react';
import { View, TextInput, Button, StyleSheet, Alert } from 'react-native';
import { useAuth } from '../context/AuthContext';
import LoginScreen from '../screens/LoginScreen';

export default function Home({ navigation }: any) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { signIn } = useAuth();
  const [user, setUser] = useState<any>(null);

  const handleLogin = async () => {
    try {
      const response = await signIn(email, password);
      setUser(response); // Save the logged-in user
      Alert.alert("Success", "You are logged in!");
    } catch (error) {
      Alert.alert("Error", (error as any).message);
    }
  };

  return <LoginScreen />
}

