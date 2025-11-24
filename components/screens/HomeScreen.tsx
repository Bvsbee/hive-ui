import React, { useEffect, useState } from "react";
import {
  Text,
  View,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  TextInput,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import useAuthStore from "../stores/useAuthStore";
import {
  fetchAnime,
  fetchBooks,
  fetchMovies,
  fetchTvShows,
} from "../../services/mediaService";
import { useQueryClient } from "@tanstack/react-query";
import TrendingTVShows from "../TrendingMedia/TrendingTVShows";
import TrendingMovies from "../TrendingMedia/TrendingMovies";
import TrendingAnime from "../TrendingMedia/TrendingAnime";
import TrendingBooks from "../TrendingMedia/TrendingBooks";
import { ScrollView } from "react-native-gesture-handler";
import CreateMediaListModal from "../CreateList/CreateMediaListModal";

export default function HomeScreen() {
  const user = useAuthStore((state) => state.user);

  const queryClient = useQueryClient();

  useEffect(() => {
    queryClient.prefetchQuery({ queryKey: ["tvShows"], queryFn: fetchTvShows });
    queryClient.prefetchQuery({ queryKey: ["movies"], queryFn: fetchMovies });
    queryClient.prefetchQuery({ queryKey: ["books"], queryFn: fetchBooks });
    queryClient.prefetchQuery({ queryKey: ["anime"], queryFn: fetchAnime });
  }, []);

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
          <ScrollView contentContainerStyle={styles.scrollContainer}>
            <TrendingTVShows />
            <TrendingMovies />
            <TrendingAnime />
            <TrendingBooks />
          </ScrollView>
        </View>

        {/* <CreateMediaListModal /> */}
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

  scrollContainer: {
    padding: 20,
    paddingBottom: 50,
  },
});
