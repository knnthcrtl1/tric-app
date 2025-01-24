import React, { useState } from "react";
import { View, TextInput, Button, StyleSheet, Alert } from "react-native";
import { useAuth } from "../context/AuthContext";
import { useRouter } from "expo-router";
import { useSelector } from "react-redux";
import { RootState } from "@/reducer/store";

export default function SettingsScreen() {
  const router = useRouter();
  const userAuthInfo = useSelector(
    (state: RootState) => state.userSlice.userAuthInfo
  );

  console.log("user auth info =>", userAuthInfo);

  const [fullName, setFullname] = useState("tabons");
  const [phoneNum, setPhoneNum] = useState("09675682385");
  const [address, setAddress] = useState("Block 112 Lot 5");

  const handleUserUpdate = async () => {
    try {
      //   const response: { user: { id: string } } = await signIn(email, password);

      //   console.log("response =>", response?.user?.email);
      router.push("/private/home");
      // setUser(response); // Save the logged-in user
      Alert.alert("Success", "You are logged in!");
    } catch (error) {
      Alert.alert("Error", (error as any).message);
    }
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Email"
        value={fullName}
        onChangeText={setFullname}
        autoCapitalize="none"
      />
      <TextInput
        style={styles.input}
        placeholder="Email"
        value={phoneNum}
        onChangeText={setPhoneNum}
        autoCapitalize="none"
      />
      <TextInput
        style={styles.input}
        placeholder="Email"
        value={address}
        onChangeText={setAddress}
        autoCapitalize="none"
      />
      {/* <Button title="Login" onPress={handleLogin} /> */}
      {/* <Button title="Register" onPress={() => router.push("/register")} /> */}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    padding: 20,
  },
  input: {
    height: 40,
    borderColor: "gray",
    borderWidth: 1,
    marginBottom: 10,
    padding: 10,
    borderRadius: 5,
  },
});
