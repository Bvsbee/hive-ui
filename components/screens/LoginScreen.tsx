import React, { useState } from "react";
import {
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  Image,
  KeyboardAvoidingView,
  Platform,
  TextInput,
  ActivityIndicator,
  Alert,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { NavigationProp, useNavigation } from "@react-navigation/native";
import { AuthStackParamList } from "../../models/Navigation";
import { useLoginUser } from "../../services/authService";

export default function LoginScreen() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { mutate, isPending, isError, error } = useLoginUser();

  const navigation = useNavigation<NavigationProp<AuthStackParamList>>();

  const handleLogin = () => {
    if (!email || !password) {
      Alert.alert("Please fill in all fields");
      return;
    }

    mutate({ email, password });
  };

  return (
    <LinearGradient colors={["#17192C", "#273e79ff"]} style={{ flex: 1 }}>
      <KeyboardAvoidingView
        style={{ flex: 1, width: "100%" }}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
      >
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => navigation.navigate("Startup")}
        >
          <Text style={styles.backArrow}>←</Text>
        </TouchableOpacity>

        <View style={styles.logoContainer}>
          <Image
            source={require("../../assets/logo.png")}
            style={styles.logoImage}
          />
        </View>

        <Text style={styles.mainTitle}>Welcome Back</Text>
        <Text style={styles.subTitle}>Sign into your HIVE account</Text>

        <View style={{ paddingHorizontal: 20, marginBottom: 30 }}>
          <View style={styles.inputContainer}>
            <Text style={styles.textLabel}>Email</Text>
            <TextInput
              style={styles.textInput}
              placeholder="Enter your email"
              placeholderTextColor="#b0b0b0"
              value={email}
              onChangeText={setEmail}
            />
          </View>

          <View style={styles.inputContainer}>
            <Text style={styles.textLabel}>Password</Text>
            <TextInput
              style={styles.textInput}
              placeholder="Enter your password"
              placeholderTextColor="#b0b0b0"
              secureTextEntry
              value={password}
              onChangeText={setPassword}
            />
            <TouchableOpacity style={{ alignItems: "flex-end", marginTop: 8 }}>
              <Text style={styles.forgotPassword}>Forgot Password?</Text>
            </TouchableOpacity>
          </View>

          <TouchableOpacity
            style={styles.createButton}
            onPress={handleLogin}
            disabled={isPending}
          >
            {isPending ? (
              <ActivityIndicator color="#000" />
            ) : (
              <Text style={styles.createButtonText}>Sign In</Text>
            )}
          </TouchableOpacity>

          {error && (
            <Text
              style={{ color: "#FF4D4D", textAlign: "center", marginTop: 10 }}
            >
              {error.message}
            </Text>
          )}
        </View>
      </KeyboardAvoidingView>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  backButton: { position: "absolute", top: 50, left: 20 },
  backArrow: { fontSize: 24, color: "#ffd700", fontWeight: "bold" },
  logoContainer: {
    flex: 0.75,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 60,
  },
  logoImage: { width: 180, height: 180, borderRadius: 12 },
  mainTitle: {
    fontSize: 50,
    fontWeight: "bold",
    color: "#FFD700",
    textAlign: "center",
    marginBottom: 30,
    textShadowColor: "#FFD700",
    textShadowOffset: { width: 0, height: 0 },
    textShadowRadius: 8,
  },
  subTitle: {
    fontSize: 22,
    color: "#f9f6deff",
    textAlign: "center",
    marginBottom: 20,
  },
  inputContainer: { marginBottom: 20 },
  textLabel: {
    fontSize: 16,
    color: "#f9f6deff",
    marginBottom: 8,
    fontWeight: "500",
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
  forgotPassword: { fontSize: 14, color: "#FFD700", fontWeight: "500" },
  createButton: {
    backgroundColor: "#FFD700",
    borderRadius: 25,
    paddingVertical: 16,
    marginTop: 20,
  },
  createButtonText: {
    color: "#000",
    fontSize: 18,
    fontWeight: "bold",
    textAlign: "center",
  },
});
