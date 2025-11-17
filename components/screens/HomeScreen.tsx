import React, { useState } from "react";
import {
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  TouchableWithoutFeedback,
  ScrollView,
  Image,
  KeyboardAvoidingView,
  Platform,
  TextInput,
  ActivityIndicator,
  Alert,
  FlatList,
  Modal,
} from "react-native";
import { Picker } from "@react-native-picker/picker";

import { LinearGradient } from "expo-linear-gradient";
import { NavigationProp, useNavigation } from "@react-navigation/native";
import { AuthStackParamList } from "../../models/Navigation";
import { UserModel } from "../../models/UserModel";
import { useFetchTvShows } from "../../services/mediaService";

export default function HomeScreen() {
  // const { user } = useAuthStore((state) => console.log(state));

  const [selectedShow, setSelectedShow] = useState<any>(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedList, setSelectedList] = useState<string>("");
  const [dropdownOpen, setDropdownOpen] = useState(false);


  const mockLists = [
    { id: "1", name: "Favorites" },
    { id: "2", name: "Watch Later" },
    { id: "3", name: "TV" },
  ];

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
                    setSelectedShow(item);
                    setModalVisible(true);
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
        <Modal
          visible={modalVisible}
          transparent
          animationType="slide"
          onRequestClose={() => setModalVisible(false)}
        >
          {/* CLOSE MODAL WHEN CLICKING OUTSIDE */}
          <TouchableOpacity
            activeOpacity={1}
            style={styles.modalOverlay}
            onPress={() => {
              setModalVisible(false);
              setDropdownOpen(false);
            }}
          >
            <TouchableWithoutFeedback onPress={() => setDropdownOpen(false)}>
              <View style={styles.modalSheet}>

                {/* Poster */}
                {selectedShow && (
                  <Image
                    source={{ uri: `${baseUrl}${selectedShow.posterPath}` }}
                    style={styles.modalPoster}
                  />
                )}            
                <View style={styles.dropdownWrapper}>
                  <Text style={styles.pickerLabel}>Add to List</Text>

                  <TouchableOpacity
                    style={styles.dropdownBox}
                    onPress={() => setDropdownOpen(!dropdownOpen)}
                    activeOpacity={0.8}
                  >
                    <Text style={{ color: "#FFF" }}>
                      {selectedList
                        ? mockLists.find((l) => l.id === selectedList)?.name
                        : "Select a list..."}
                    </Text>
                  </TouchableOpacity>

                  {dropdownOpen && (
                    <View style={styles.dropdownMenu}>
                      {mockLists.map((list) => (
                        <TouchableOpacity
                          key={list.id}
                          style={styles.dropdownItem}
                          onPress={() => {
                            setSelectedList(list.id);
                            setDropdownOpen(false);
                          }}
                        >
                          <Text style={{ color: "#FFF" }}>{list.name}</Text>
                        </TouchableOpacity>
                      ))}
                    </View>
                  )}
                </View>

                <TouchableOpacity
                  style={styles.addButton}
                  onPress={() => {
                    if (!selectedList) {
                    console.log("No list selected");
                      return;
                    }
                  console.log ("Added to list")                    
                  setModalVisible(false);
                  }}
                >
                  <Text style={styles.addButtonText}>Add to List</Text>
                </TouchableOpacity>

                <TouchableOpacity
                  onPress={() => setModalVisible(false)}
                  style={styles.closeButton}
                >
                  <Text style={styles.closeText}>Close</Text>
                </TouchableOpacity>

              </View>
            </TouchableWithoutFeedback>
          </TouchableOpacity>
        </Modal>


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
    height: "50%",            // ⬅️ half-screen modal
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
  }


});
