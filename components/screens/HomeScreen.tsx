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
  useFetchAnime,
  useFetchBooks,
  useFetchMovies,
  useFetchTvShows,
} from "../../services/mediaService";
import { useQueryClient } from "@tanstack/react-query";
import TrendingTVShows from "../TrendingMedia/TrendingTVShows";
import TrendingMovies from "../TrendingMedia/TrendingMovies";
import TrendingAnime from "../TrendingMedia/TrendingAnime";
import { ScrollView } from "react-native-gesture-handler";

export default function HomeScreen() {
  const user = useAuthStore((state) => state.user);

  const queryClient = useQueryClient();

  useEffect(() => {
    queryClient.prefetchQuery({ queryKey: ["tvShows"], queryFn: fetchTvShows });
    queryClient.prefetchQuery({ queryKey: ["movies"], queryFn: fetchMovies });
    queryClient.prefetchQuery({ queryKey: ["books"], queryFn: fetchBooks });
    queryClient.prefetchQuery({ queryKey: ["anime"], queryFn: fetchAnime });
  }, []);

  const [modalVisible, setModalVisible] = useState(false);
  const [selectedList, setSelectedList] = useState<string>("");
  const [dropdownOpen, setDropdownOpen] = useState(false);

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
          </ScrollView>
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
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.6)",
    justifyContent: "flex-end",
  },

  modalSheet: {
    backgroundColor: "#1b1d2e",
    height: "50%", // ⬅️ half-screen modal
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    padding: 20,
    alignItems: "center",
  },

  modalPoster: {
    width: 130,
    height: 190,
    borderRadius: 10,
    marginBottom: 12,
  },

  modalTitle: {
    color: "#ed3838ff",
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center",
  },

  addButton: {
    backgroundColor: "#FFD700",
    paddingVertical: 12,
    paddingHorizontal: 40,
    borderRadius: 12,
    marginBottom: 15,
  },

  addButtonText: {
    color: "#000",
    fontWeight: "bold",
    fontSize: 16,
  },

  closeButton: {
    padding: 8,
  },

  closeText: {
    color: "#FFF",
    fontSize: 15,
  },
  dropdownWrapper: {
    width: "90%",
    marginBottom: 20,
  },

  dropdownBox: {
    backgroundColor: "#1F2236",
    borderRadius: 14,
    borderWidth: 1.2,
    borderColor: "rgba(255, 215, 0, 0.45)",
    paddingHorizontal: 12,
    height: 54,
    justifyContent: "center",
  },

  dropdownMenu: {
    marginTop: 6,
    backgroundColor: "#1F2236",
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "rgba(255, 215, 0, 0.35)",
    overflow: "hidden",
  },

  dropdownItem: {
    paddingVertical: 12,
    paddingHorizontal: 14,
    borderBottomWidth: 1,
    borderColor: "rgba(255,255,255,0.08)",
  },
  pickerLabel: {
    fontSize: 16,
    textAlign: "left",
    fontWeight: "600",
    color: "#FFD700",
    marginBottom: 6,
  },
  scrollContainer: {
    padding: 20,
    paddingBottom: 50,
  },
});
