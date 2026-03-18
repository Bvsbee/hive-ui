import React from "react";
import { Text, View, StyleSheet, TouchableOpacity, Image } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { NavigationProp, useNavigation } from "@react-navigation/native";
import { AuthStackParamList } from "../models/Navigation";

export default function StartupScreen() {
  const navigation = useNavigation<NavigationProp<AuthStackParamList>>();

  return (
    <LinearGradient
      colors={["#17192C", "#273e79ff"]}
      style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
    >
      <View style={styles.logoContainer}>
        <Image
          source={require("../../assets/logo.png")}
          style={styles.logoImage}
        />
      </View>

      <Text style={styles.mainTitle}>HIVE</Text>
      <Text style={styles.subTitle}>Your Entertainment Universe</Text>
      <Text style={styles.description}>
        Discover, track and organize all your favorite movies, TV shows, books,
        and anime in one beautiful place.
      </Text>

      {/* create account and sign in buttons */}
      <View style={{ paddingTop: 40, width: "80%" }}>
        <TouchableOpacity
          style={[styles.createButton]}
          onPress={() => {
            navigation.navigate("Signup");
          }}
        >
          <Text
            style={{
              color: "#000",
              fontSize: 18,
              fontWeight: "bold",
              textAlign: "center",
            }}
          >
            Create Account
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.signinButton]}
          onPress={() => {
            navigation.navigate("Login");
          }}
        >
          <Text
            style={{
              color: "#FFF",
              fontSize: 18,
              fontWeight: "bold",
              textAlign: "center",
            }}
          >
            Sign In
          </Text>
        </TouchableOpacity>
      </View>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
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
  description: {
    fontSize: 18,
    color: "#f9f6deff",
    textAlign: "center",
    paddingHorizontal: 40,
  },
  createButton: {
    backgroundColor: "#FFD700",
    borderRadius: 25,
    paddingVertical: 16,
    paddingHorizontal: 32,
  },
  createAccText: {
    color: "#000",
    fontSize: 20,
    marginHorizontal: 20,
    padding: 10,
    borderWidth: 2,
  },
  signinButton: {
    backgroundColor: "transparent",
    borderColor: "#FFD700",
    borderRadius: 25,
    borderWidth: 2,
    paddingVertical: 16,
    paddingHorizontal: 32,
    marginTop: 20,
    marginBottom: 40,
  },
  logoContainer: {
    flex: 0.75,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 60,
  },
  logoImage: {
    width: 200,
    height: 200,
  },
});
