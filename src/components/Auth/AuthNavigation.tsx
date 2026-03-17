import { createStackNavigator } from "@react-navigation/stack";
import SignUpPage from "../../src/screens/SignUpPage";
import StartupScreen from "../../src/screens/StartupScreen";
import ListScreen from "../../src/screens/ListScreen";
import LoginScreen from "../../src/screens/LoginScreen";
import { AuthStackParamList } from "../../models/Navigation";


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
