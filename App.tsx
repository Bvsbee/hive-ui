/**
 * App.tsx - Main Navigation Setup
 *
 * This file sets up the main navigation for the app using React Navigation's bottom tab navigator.
 *
 * Key Points for Beginners:
 * - NavigationContainer: Enables navigation features for the app.
 * - createBottomTabNavigator: Creates a tab bar at the bottom of the app.
 * - HomeScreen: The only tab currently, imported from components/screens/HomeScreen.
 * - enableScreens: Improves navigation performance by using native screens.
 *
 * How to Add More Tabs:
 *   1. Import your new screen (e.g., import ProfileScreen from './components/screens/ProfileScreen').
 *   2. Add another <Tab.Screen name="Profile" component={ProfileScreen} /> inside <Tab.Navigator>.
 *
 * This is a standard way to set up navigation in React Native apps. You can add more screens by following the pattern above.
 */
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { NavigationContainer } from "@react-navigation/native";
import { StatusBar } from "expo-status-bar";
import HomeScreen from "./components/screens/HomeScreen";
import { enableScreens } from "react-native-screens";
import useAuthStore from "./components/stores/useAuthStore";
import AuthStack from "./components/Auth/AuthNavigation";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

enableScreens();
const Tab = createBottomTabNavigator();

export default function App() {
  const user = useAuthStore((state) => state.user);

  const queryClient = new QueryClient();

  return (
    <NavigationContainer>
      <QueryClientProvider client={queryClient}>
        {user ? (
          <Tab.Navigator>
            <Tab.Screen name="Home" component={HomeScreen} />
          </Tab.Navigator>
        ) : (
          <AuthStack />
        )}
        <StatusBar style="auto" />
      </QueryClientProvider>
    </NavigationContainer>
  );
}
