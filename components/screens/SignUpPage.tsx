import React, { use, useState } from "react";
import {
  Text,
  View,
  Image,
  TouchableOpacity,
  StyleSheet,
  TextInput,
  Alert,
  ScrollView,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { createUser } from "../../services/authService";
import { UserModel } from "../../models/user/UserModel";
import useAuthStore from "../stores/useAuthStore";

export default function SignUpPage() {
  const [newUser, setNewUser] = useState<UserModel>({
    username: "",
    email: "",
    password: "",
    firstName: "",
    lastName: "",
  });
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleChange = (key: keyof UserModel, value: string) => {
    setNewUser((prev) => ({ ...prev, [key]: value }));
  };

  const signIn = useAuthStore((state) => state.signIn);

  const handleSignUp = async () => {
    if (newUser.password !== confirmPassword) {
      Alert.alert("Passwords do not match");
      return;
    }

    try {
      ("Hello");
      const user = await createUser(newUser);
      signIn(user);
    } catch (error: any) {
      Alert.alert(
        "Signup failed",
        error.response?.data?.message || error.message
      );
    }
  };

  return (
    <LinearGradient colors={["#17192C", "#273E79"]} style={styles.container}>
      <ScrollView
        contentContainerStyle={styles.scrollContainer}
        keyboardShouldPersistTaps="handled"
      >
        <View style={styles.logoContainer}>
          <Image
            source={require("../../assets/logo.png")}
            style={styles.logoImage}
          />
        </View>

        <View style={styles.formContainer}>
          <TextInput
            placeholder="First Name"
            value={newUser.firstName}
            onChangeText={(text) => handleChange("firstName", text)}
            style={styles.textInput}
            placeholderTextColor="#b0b0b0"
          />
          <TextInput
            placeholder="Last Name"
            value={newUser.lastName}
            onChangeText={(text) => handleChange("lastName", text)}
            style={styles.textInput}
            placeholderTextColor="#b0b0b0"
          />
          <TextInput
            placeholder="Username"
            value={newUser.username}
            onChangeText={(text) => handleChange("username", text)}
            style={styles.textInput}
            placeholderTextColor="#b0b0b0"
          />
          <TextInput
            placeholder="Email"
            value={newUser.email}
            onChangeText={(text) => handleChange("email", text)}
            style={styles.textInput}
            keyboardType="email-address"
            autoCapitalize="none"
            placeholderTextColor="#b0b0b0"
          />
          <TextInput
            placeholder="Password"
            value={newUser.password}
            onChangeText={(text) => handleChange("password", text)}
            style={styles.textInput}
            secureTextEntry
            placeholderTextColor="#b0b0b0"
          />
          <TextInput
            placeholder="Confirm Password"
            value={confirmPassword}
            onChangeText={setConfirmPassword}
            style={styles.textInput}
            secureTextEntry
            placeholderTextColor="#b0b0b0"
          />
          {confirmPassword && confirmPassword !== newUser.password && (
            <Text style={styles.errorText}>Passwords do not match</Text>
          )}
        </View>

        <TouchableOpacity style={styles.button} onPress={handleSignUp}>
          <Text style={styles.buttonText}>Create Account</Text>
        </TouchableOpacity>
      </ScrollView>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollContainer: {
    flexGrow: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 30,
    paddingVertical: 50,
  },
  logoContainer: {
    marginBottom: 40,
    alignItems: "center",
  },
  logoImage: {
    width: 180,
    height: 180,
    resizeMode: "contain",
  },
  formContainer: {
    width: "100%",
    marginBottom: 30,
  },
  textInput: {
    backgroundColor: "#2D3B5C",
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 14,
    borderWidth: 1,
    borderColor: "#4A5A7A",
    fontSize: 16,
    color: "#f9f6deff",
  },
  button: {
    backgroundColor: "#FFD700",
    paddingVertical: 16,
    paddingHorizontal: 40,
    borderRadius: 30,
    alignItems: "center",
    width: "100%",
  },
  buttonText: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#000",
  },
  errorText: {
    color: "#FF4D4D",
    fontSize: 14,
    marginTop: 5,
  },
});
