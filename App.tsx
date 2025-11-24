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
import ListScreen from "./components/screens/ListScreen";
import { Text } from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import DiscoverScreen from "./components/screens/DiscoverScreen";

enableScreens();
const Tab = createBottomTabNavigator();

export default function App() {
  const user = useAuthStore((state) => state.user);

  const queryClient = new QueryClient();

  return (
    <NavigationContainer>
      <GestureHandlerRootView style={{ flex: 1 }}>
        <QueryClientProvider client={queryClient}>
          {user?.email ? (
            <Tab.Navigator
              screenOptions={({ route }) => ({
                // Access route information
                headerShown: false,
                tabBarStyle: {
                  backgroundColor: "#090f0f",
                },
                tabBarIcon: ({ focused, color, size }) => {
                  let iconEmoji;

                  if (route.name === "Home") {
                    iconEmoji = "🏠"; // Home emoji
                  } else if (route.name === "List") {
                    iconEmoji = "📋";
                  } else if (route.name == "Discover") {
                    iconEmoji = "🔎";
                  }
                  return (
                    <>
                      <Text style={{ fontSize: size, color: color }}>
                        {iconEmoji}
                      </Text>
                    </>
                  );
                },
                tabBarActiveTintColor: "white", // Example active color
                tabBarInactiveTintColor: "gray", // Example inactive color
              })}
            >
              <Tab.Screen
                name="Home"
                component={HomeScreen}
                options={{ headerShown: false }}
              />
              <Tab.Screen name="List" component={ListScreen} />
              <Tab.Screen name="Discover" component={DiscoverScreen} />
            </Tab.Navigator>
          ) : (
            <AuthStack />
          )}

          <StatusBar style="auto" />
        </QueryClientProvider>
      </GestureHandlerRootView>
    </NavigationContainer>
  );
}
