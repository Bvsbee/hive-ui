import { useState } from "react";
import { useFetchTvShows } from "../../services/mediaService";
import {
  FlatList,
  Image,
  Modal,
  StyleSheet,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from "react-native";

const TrendingTVShows = () => {
  const [selectedShow, setSelectedShow] = useState<any>(null);
  const [modalVisible, setModalVisible] = useState<boolean>(false);
  const [dropdownOpen, setDropdownOpen] = useState<boolean>(false);
  const [selectedList, setSelectedList] = useState<string>("");
  const { data: tvShows, isLoading, isError, error } = useFetchTvShows();

  const baseUrl = "https://image.tmdb.org/t/p/w500/";

  if (isLoading)
    return <Text style={{ color: "white" }}>Loading TV Shows...</Text>;
  if (error) return <Text>Error loading TV Shows</Text>;

  return (
    <>
      <Text
        style={{ fontSize: 18, fontWeight: "bold", margin: 10, color: "white" }}
      >
        🎬 Trending TV Shows
      </Text>
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
                source={{
                  uri: `${baseUrl}${item.posterPath}`,
                }}
                style={styles.poster}
              />
            </TouchableOpacity>
            <Text style={styles.movieTitle}>{item.title}</Text>

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
                <TouchableWithoutFeedback
                  onPress={() => setDropdownOpen(false)}
                >
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
                        console.log("Added to list");
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
          </>
        )}
      />
    </>
  );
};

export default TrendingTVShows;

const styles = StyleSheet.create({
  poster: {
    width: 120,
    height: 180,
    borderRadius: 12,
    backgroundColor: "#273e79",
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
});
