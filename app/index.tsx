import React, { useState } from 'react';
import { View, TextInput, Button, StyleSheet, Alert } from 'react-native';
import { useAuth } from '../context/AuthContext';
import LoginScreen from '../screens/LoginScreen';
import { useRouter } from 'expo-router';

export default function Home() {
  const router = useRouter();
  return <LoginScreen router={router}/>
}

