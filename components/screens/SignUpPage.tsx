import React, { use, useEffect, useState } from "react";
import {
  Text,
  View,
  Image,
  TouchableOpacity,
  StyleSheet,
  Alert,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  BackHandler,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { UserModel } from "../../models/user/UserModel";
import AccountInfo from "../AccountCreation/AccountInfo";
import ProfileSetup from "../AccountCreation/ProfileSetup";
import { NavigationProp, useNavigation } from "@react-navigation/native";
import { AuthStackParamList } from "../../models/user/Navigation";
import { useCreateUser } from "../../services/authService";

export default function SignUpPage() {
  const [newUser, setNewUser] = useState<UserModel>({
    username: "",
    email: "",
    password: "",
    firstName: "",
    lastName: "",
  });
  const { mutate, isError, error, isPending } = useCreateUser();
  const [confirmPassword, setConfirmPassword] = useState("");
  const [step, setStep] = useState(1);

  const navigation = useNavigation<NavigationProp<AuthStackParamList>>();

  const handleChange = (key: keyof UserModel, value: string) => {
    setNewUser((prev) => ({ ...prev, [key]: value }));
  };
  const handleNext = () => {
    if (step === 1) {
      // Validate step 1
      if (!newUser.email || !newUser.password) {
        Alert.alert("Please fill in all fields");
        return;
      }

      if (newUser.password !== confirmPassword) {
        Alert.alert("Passwords do not match");
        return;
      }
      setStep(2);
    } else {
      if (!newUser.username || !newUser.firstName || !newUser.lastName) {
        return Alert.alert("Please fill in all fields");
      }
      // On step 2, trigger signup
      handleSignUp();
    }
  };

  const handleBack = () => {
    if (step > 1) {
      setStep(step - 1);
    } else {
      navigation.navigate("Startup");
    }
  };
  useEffect(() => {
    const backAction = () => {
      if (step > 1) {
        setStep(step - 1); // go to previous step
        return true; // prevent default navigation
      }
      return false; // allow default navigation (Startup screen or exit)
    };

    const backHandler = BackHandler.addEventListener(
      "hardwareBackPress",
      backAction
    );

    return () => backHandler.remove();
  }, [step]);

  const handleSignUp = async () => {
    try {
      mutate(newUser);
      if (!isPending && !isError) navigation.navigate("Login");
    } catch (error: any) {
      Alert.alert(
        "Signup failed",
        error.response?.data?.message || error.message
      );
    }
  };

  return (
    <LinearGradient colors={["#17192C", "#273E79"]} style={styles.container}>
      {isError && <Text>{error?.message}</Text>}
      <KeyboardAvoidingView
        style={{ flex: 1, width: "100%" }}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
      >
        <TouchableOpacity style={styles.backButton} onPress={handleBack}>
          <Text style={{ fontSize: 24, color: "#ffd700", fontWeight: "bold" }}>
            ←
          </Text>
        </TouchableOpacity>
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
            {step == 1 && (
              <AccountInfo
                handleChange={handleChange}
                newUser={newUser}
                confirmPassword={confirmPassword}
                setConfirmPassword={setConfirmPassword}
              />
            )}
            {step == 2 && (
              <ProfileSetup handleChange={handleChange} newUser={newUser} />
            )}
          </View>

          <TouchableOpacity style={styles.button} onPress={handleNext}>
            <Text style={styles.buttonText}>
              {step === 1 ? "Next" : "Create Account"}
            </Text>
          </TouchableOpacity>
        </ScrollView>
      </KeyboardAvoidingView>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  backButton: {
    position: "absolute",
    top: 50,
    left: 20,
    zIndex: 10,
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
  textLabel: {
    fontSize: 16,
    color: "#f9f6deff",
    marginBottom: 8,
    fontWeight: "500",
  },
});
