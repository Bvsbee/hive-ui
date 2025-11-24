import { Text, TextInput, StyleSheet } from "react-native";
import { UserModel } from "../../models/UserModel";
import { useState } from "react";

interface AccountInfoProps {
  newUser: UserModel;
  handleChange: (key: keyof UserModel, value: string) => void;
  confirmPassword: string;
  setConfirmPassword: React.Dispatch<React.SetStateAction<string>>;
}

const AccountInfo = ({
  handleChange,
  newUser,
  setConfirmPassword,
  confirmPassword,
}: AccountInfoProps) => {
  const [emailError, setEmailError] = useState("");
  const validateEmail = (email: string) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!regex.test(email)) {
      setEmailError("Please enter a valid email address");
    } else {
      setEmailError("");
    }
    handleChange("email", email);
  };

  return (
    <>
      <Text style={styles.textLabel}>Email</Text>
      <TextInput
        placeholder="Email"
        value={newUser.email}
        onChangeText={validateEmail}
        style={styles.textInput}
        keyboardType="email-address"
        placeholderTextColor="#b0b0b0"
      />
      {emailError.length > 0 && (
        <Text style={styles.errorText}>{emailError}</Text>
      )}
      <Text style={styles.textLabel}>Password</Text>
      <TextInput
        placeholder="Password"
        value={newUser.password}
        onChangeText={(text) => handleChange("password", text)}
        style={styles.textInput}
        secureTextEntry
        placeholderTextColor="#b0b0b0"
      />
      <Text style={styles.textLabel}>Confirm Password</Text>
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
    </>
  );
};

export default AccountInfo;

const styles = StyleSheet.create({
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
  textLabel: {
    fontSize: 16,
    color: "#f9f6deff",
    marginBottom: 8,
    fontWeight: "500",
  },
  errorText: {
    color: "#FF4D4D",
    fontSize: 14,
    marginTop: 5,
  },
});
