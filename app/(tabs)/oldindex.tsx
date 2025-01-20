import React, { useState } from "react";
import { View, Text, TextInput, Button, StyleSheet, Alert } from "react-native";
import { supabase } from "../../configs/supabaseConfig";

export default function LoginRegisterScreen() {
  const [isRegistering, setIsRegistering] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [user, setUser] = useState<any>(null);

  const handleRegister = async () => {
    try {
      const { error } = await supabase.auth.signUp({
        email,
        password,
      });
      if (error) throw error;
      Alert.alert("Success", "Check your email to confirm your registration!");
    } catch (error) {
      Alert.alert("Error", (error as any).message);
    }
  };

  const handleLogin = async () => {
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });
      if (error) throw error;
      setUser(data.user); // Save the logged-in user
      Alert.alert("Success", "You are logged in!");
    } catch (error) {
      Alert.alert("Error", (error as any).message);
    }
  };

  const handleLogout = async () => {
    try {
      const { error } = await supabase.auth.signOut();
      if (error) throw error;
      setUser(null); // Clear the user session
      Alert.alert("Success", "You are logged out!");
    } catch (error) {
      Alert.alert("Error", (error as any).message);
    }
  };

  return (
    <View style={styles.container}>
      {user ? (
        // Logged-in View
        <View>
          <Text style={styles.title}>Welcome, {user.email}!</Text>
          <Button title="Logout" onPress={handleLogout} />
        </View>
      ) : (
        // Login/Register View
        <View>
          <Text style={styles.title}>{isRegistering ? "Register" : "Login"}</Text>
          <TextInput
            style={styles.input}
            placeholder="Email"
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
            autoCapitalize="none"
          />
          <TextInput
            style={styles.input}
            placeholder="Password"
            value={password}
            onChangeText={setPassword}
            secureTextEntry
          />
          <Button
            title={isRegistering ? "Register" : "Login"}
            onPress={isRegistering ? handleRegister : handleLogin}
          />
          <Button
            title={isRegistering ? "Switch to Login" : "Switch to Register"}
            onPress={() => setIsRegistering(!isRegistering)}
            color="gray"
          />
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    padding: 20,
    backgroundColor: "#f5f5f5",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center",
  },
  input: {
    height: 50,
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 5,
    marginBottom: 15,
    paddingHorizontal: 10,
    backgroundColor: "#fff",
  },
});
