import React, { useState } from "react";
import {
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Image,
  KeyboardAvoidingView,
  Platform,
  TextInput,
  ActivityIndicator,
  Alert,
  FlatList,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { NavigationProp, useNavigation } from "@react-navigation/native";
import { AuthStackParamList } from "../../models/Navigation";
import { UserModel } from "../../models/UserModel";
import { useFetchTvShows } from "../../services/mediaService";

export default function HomeScreen() {
  // const { user } = useAuthStore((state) => console.log(state));

  const [user, setUser] = useState<UserModel>({
    username: "john123",
    firstName: "John",
    lastName: "Doe",
    email: "john@example.com",
    password: "hidden",
  });

  const { data: tvShows, isLoading, isError, error } = useFetchTvShows();

  console.log({ tvShows });

  const baseUrl = "https://image.tmdb.org/t/p/w500/";

  return (
    <LinearGradient colors={["#17192C", "#273e79ff"]} style={{ flex: 1 }}>
      <KeyboardAvoidingView
        style={{ flex: 1, width: "100%" }}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
      >
        <View style={styles.header}>
          <Text style={styles.headerTitle}> {`Hello, ${user.firstName}!`}</Text>
        </View>
        <TextInput
          style={styles.searchInput}
          placeholder="Search..."
          placeholderTextColor="#aaa"
        />
        <View style={styles.container}>
          <Text style={styles.sectionTitle}>Shows</Text>
          <FlatList
            data={tvShows}
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={{ paddingHorizontal: 10 }}
            renderItem={({ item }) => (
              <>
                <TouchableOpacity
                  onPress={(e) => {
                    console.log();
                  }}
                  style={styles.card}
                >
                  <Image
                    source={{ uri: `${baseUrl}${item.posterPath}` }}
                    style={styles.poster}
                  />
                </TouchableOpacity>
                <Text style={styles.movieTitle}>{item.title}</Text>
              </>
            )}
          />
        </View>
      </KeyboardAvoidingView>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  backButton: { position: "absolute", top: 50, left: 20 },
  backArrow: { fontSize: 24, color: "#ffd700", fontWeight: "bold" },

  header: {
    paddingTop: 80,
    paddingHorizontal: 20,
  },
  headerTitle: {
    fontSize: 32,
    fontWeight: "bold",
    color: "#FFD700",
    textAlign: "left",
    textShadowColor: "#FFD700",
    textShadowOffset: { width: 0, height: 0 },
    textShadowRadius: 8,
  },
  container: {
    flex: 1,
    padding: 20,
  },
  searchInput: {
    backgroundColor: "#17192C",
    borderRadius: 12,
    padding: 10,
    color: "#f9f6deff",
    fontSize: 16,
    marginBottom: 15,
  },
  sections: {
    marginTop: 30,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#FFF",
    marginBottom: 15,
    paddingHorizontal: 20,
  },

  listIcon: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: "rgba(255, 215, 0, 0.2)",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 15,
  },
  movieTitle: {
    fontSize: 14,
    fontWeight: "light",
    color: "#f9f6deff",
    marginBottom: 4,
    textAlign: "center",
  },
  card: {
    marginRight: 12,
    alignItems: "center",
  },
  poster: {
    width: 120,
    height: 180,
    borderRadius: 12,
    backgroundColor: "#273e79",
  },
});
