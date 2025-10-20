import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import SignUpPage from "../screens/SignUpPage";
import StartupScreen from "../screens/StartupScreen";
import ListScreen from "../screens/ListScreen";
import { AuthStackParamList } from "../../models/user/Navigation";
import LoginScreen from "../screens/LoginScreen";

import AccountInfo from "../AccountCreation/AccountInfo";
import ProfileSetup from "../AccountCreation/ProfileSetup";

const Stack = createStackNavigator<AuthStackParamList>();

export default function AuthStack() {
  return (
    <Stack.Navigator
      initialRouteName="Startup"
      screenOptions={{ headerShown: false }}
    >
      <Stack.Screen name="Startup" component={StartupScreen} />
      <Stack.Screen name="Signup" component={SignUpPage} />
      <Stack.Screen name="Login" component={LoginScreen} />
      <Stack.Screen name="List" component={ListScreen} />
    </Stack.Navigator>
  );
}
