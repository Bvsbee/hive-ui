import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import SignUpPage from "../screens/SignUpPage";
import StartupScreen from "../screens/StartupScreen";
import { AuthStackParamList } from "../../models/user/Navigation";

const Stack = createStackNavigator<AuthStackParamList>();

export default function AuthStack() {
  return (
    <Stack.Navigator
      initialRouteName="Startup"
      screenOptions={{ headerShown: false }}
    >
      <Stack.Screen name="Startup" component={StartupScreen} />
      <Stack.Screen name="Signup" component={SignUpPage} />
    </Stack.Navigator>
  );
}
