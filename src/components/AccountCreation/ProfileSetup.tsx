import { Text, TextInput, StyleSheet } from "react-native";
import { UserModel } from "../../models/UserModel";

interface ProfileSetupProps {
  newUser: UserModel;
  handleChange: (key: keyof UserModel, value: string) => void;
}

const ProfileSetup = ({ handleChange, newUser }: ProfileSetupProps) => {
  return (
    <>
      <Text style={styles.textLabel}>First Name</Text>
      <TextInput
        placeholder="First Name"
        value={newUser.firstName}
        onChangeText={(text) => handleChange("firstName", text)}
        style={styles.textInput}
        placeholderTextColor="#b0b0b0"
      />
      <Text style={styles.textLabel}>Last Name</Text>
      <TextInput
        placeholder="Last Name"
        value={newUser.lastName}
        onChangeText={(text) => handleChange("lastName", text)}
        style={styles.textInput}
        placeholderTextColor="#b0b0b0"
      />
      <Text style={styles.textLabel}>Username</Text>
      <TextInput
        placeholder="Username"
        value={newUser.username}
        onChangeText={(text) => handleChange("username", text)}
        style={styles.textInput}
        placeholderTextColor="#b0b0b0"
      />
    </>
  );
};

export default ProfileSetup;

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
});
