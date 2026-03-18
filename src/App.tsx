import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { NavigationContainer } from "@react-navigation/native";
import { StatusBar } from "expo-status-bar";
import { enableScreens } from "react-native-screens";
import useAuthStore from "./stores/useAuthStore";
import AuthStack from "./components/Auth/AuthNavigation";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Text } from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import ListNavigation from "./components/navigation/ListNavigation";
import HomeScreen from "./screens/HomeScreen";

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
              <Tab.Screen name="List" component={ListNavigation} />
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
