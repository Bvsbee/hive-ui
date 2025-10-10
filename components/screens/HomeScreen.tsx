import React from "react";
import { Text, View } from "react-native";
import useAuthStore from "../stores/useAuthStore";

export default function HomeScreen() {
  const { user } = useAuthStore((state) => console.log(state));

  return (
    <View>
      <Text>Hello</Text>
    </View>
  );
}
