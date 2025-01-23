import React, { useState } from "react";
import { View, TextInput, Button, StyleSheet, Alert } from "react-native";
import { supabase } from "../configs/supabaseConfig";

export default function RegisterScreen({ navigation }: any) {
  const [email, setEmail] = useState("vortexbears@gmail.com");
  const [password, setPassword] = useState("!Knnthcrtl123");
  const [fullName, setFullName] = useState("kai");

  const handleRegister = async () => {
    try {
      // Validate inputs1
      if (!email || !password || !fullName) {
        Alert.alert("Error", "Please fill in all fields");
        return;
      }

      // Step 1: Check if email exists in the tbl_users table
      const { error: emailCheckError } = await supabase
        .from("tbl_users")
        .select("email")
        .eq("email", email)
        .single();

      console.log("email check error => ", emailCheckError);

      // Step 2: If email exists, show error message
      if (emailCheckError) {
        // Register user with Supabase Auth
        const { data: authData, error: authError } = await supabase.auth.signUp(
          {
            email,
            password,
          }
        );

        if (authError) throw authError;

        if (authData.user) {
          // Create user profile in users table
          // const { error: profileError } = await supabase
          //   .from("tbl_users")
          //   .insert([
          //     {
          //       id: authData.user.id,
          //       full_name: fullName,
          //     },
          //   ]);

          // const { error: userProfileError } = await supabase
          //   .from("tbL_profiles")
          //   .insert([
          //     {
          //       user_id: authData.user.id,
          //       email: email,
          //     },
          //   ]);

          // const { error: userProfileStatus } = await supabase
          //   .from("tbl_profile_status")
          //   .insert([
          //     {
          //       user_id: authData.user.id,
          //     },
          //   ]);

          // if (profileError || userProfileError || userProfileStatus)
          // throw profileError;

          Alert.alert("Success", "Registration successful! Please log in.", [
            { text: "OK", onPress: () => navigation.navigate("Login") },
          ]);
        }
      } else {
        Alert.alert("Error", "Email already exists");
      }
    } catch (error: any) {
      Alert.alert("Error", error.message);
    }
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Full Name"
        value={fullName}
        onChangeText={setFullName}
        autoCapitalize="words"
      />
      <TextInput
        style={styles.input}
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        autoCapitalize="none"
        keyboardType="email-address"
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />
      <Button title="Register" onPress={handleRegister} />
      <Button
        title="Already have an account? Login"
        onPress={() => navigation.navigate("Login")}
      />
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
