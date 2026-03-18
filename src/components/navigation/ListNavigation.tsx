import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import ListScreen from "../../screens/ListScreen";
import ListDetailScreen from "../../screens/ListDetailScreen";
import { ListStackParamList } from "../../models/Navigation";

const Stack = createStackNavigator<ListStackParamList>();

export default function ListNavigation() {
  return (
    <Stack.Navigator
      initialRouteName="ListScreen"
      screenOptions={{ headerShown: false }}
    >
      <Stack.Screen name="ListScreen" component={ListScreen} />
      <Stack.Screen name="ListDetailScreen" component={ListDetailScreen} />
    </Stack.Navigator>
  );
}
