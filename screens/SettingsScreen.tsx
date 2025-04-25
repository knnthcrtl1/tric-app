import React, { useState } from "react";
import { View, TextInput, Button, StyleSheet, Alert } from "react-native";
import { useSelector } from "react-redux";
import { RootState } from "@/reducer/store";
import { supabase } from "@/configs/supabaseConfig";

export default function SettingsScreen() {
  const userAuthInfo = useSelector(
    (state: RootState) => state.userSlice.userAuthInfo
  );

  const { email, id } = userAuthInfo || {};

  const [fullName, setFullname] = useState("tabons");
  const [phoneNum, setPhoneNum] = useState("09675682385");
  const [address, setAddress] = useState("Block 112 Lot 5");

  const updateProfile = async () => {
    await supabase.from("tbl_profile_status").upsert([
      {
        user_id: id,
        status: "pending",
      },
    ]);
  };

  const handleSubmit = async () => {
    try {
      // Validate inputs1
      if (!fullName || !phoneNum || !address) {
        Alert.alert("Error", "Please fill in all fields");
        return;
      }

      // Step 1: Check if email exists in the tbl_users table
      const { data: checkUserData } = await supabase
        .from("tbl_users")
        .select("email")
        .eq("email", email)
        .single();

      if (checkUserData?.email) {
        await supabase.from("tbl_users").update({
          user_id: id,
          full_name: fullName,
          email: email,
          phone_number: phoneNum,
        });

        updateProfile();

        Alert.alert("Success", "Updated Successfully!", [{ text: "OK" }]);
        return;
      }

      const { error: userError } = await supabase.from("tbl_users").upsert({
        user_id: id,
        full_name: fullName,
        email: email,
        phone_number: phoneNum,
      });

      if (userError) {
        alert("Failed to update profile: " + userError.message);
        return;
      }

      await supabase.from("tbl_users").upsert([
        {
          user_id: id,
          full_name: fullName,
          user_type: "passenger",
          email: email,
        },
      ]);

      updateProfile();

      Alert.alert("Success", "Updated Successfully!", [{ text: "OK" }]);
    } catch (error: any) {
      Alert.alert("Error", error?.message);
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
      <Button title="Submit" onPress={handleSubmit} />
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
