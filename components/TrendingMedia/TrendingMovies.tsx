import { useState } from "react";
import { useFetchMovies } from "../../services/mediaService";
import {
  FlatList,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
} from "react-native";

const TrendingMovies = () => {
  const [selectedShow, setSelectedShow] = useState<any>(null);
  const [modalVisible, setModalVisible] = useState(false);

  const { data: movies, isLoading, isError, error } = useFetchMovies();

  const baseUrl = "https://image.tmdb.org/t/p/w500/";

  if (isLoading)
    return <Text style={{ color: "white" }}>Loading Movies...</Text>;
  if (error) return <Text>Error loading Movies</Text>;

  return (
    <>
      <Text
        style={{ fontSize: 18, fontWeight: "bold", margin: 10, color: "white" }}
      >
        📺 Trending Movies
      </Text>
      <FlatList
        data={movies}
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
          </>
        )}
      />
    </>
  );
};

export default TrendingMovies;

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
});

//  <Modal
//           visible={modalVisible}
//           transparent
//           animationType="slide"
//           onRequestClose={() => setModalVisible(false)}
//         >
//           {/* CLOSE MODAL WHEN CLICKING OUTSIDE */}
//           <TouchableOpacity
//             activeOpacity={1}
//             style={styles.modalOverlay}
//             onPress={() => {
//               setModalVisible(false);
//               setDropdownOpen(false);
//             }}
//           >
//             <TouchableWithoutFeedback onPress={() => setDropdownOpen(false)}>
//               <View style={styles.modalSheet}>
//                 {/* Poster */}
//                 {selectedShow && (
//                   <Image
//                     source={{ uri: `${baseUrl}${selectedShow.posterPath}` }}
//                     style={styles.modalPoster}
//                   />
//                 )}
//                 <View style={styles.dropdownWrapper}>
//                   <Text style={styles.pickerLabel}>Add to List</Text>

//                   <TouchableOpacity
//                     style={styles.dropdownBox}
//                     onPress={() => setDropdownOpen(!dropdownOpen)}
//                     activeOpacity={0.8}
//                   >
//                     <Text style={{ color: "#FFF" }}>
//                       {selectedList
//                         ? mockLists.find((l) => l.id === selectedList)?.name
//                         : "Select a list..."}
//                     </Text>
//                   </TouchableOpacity>

//                   {dropdownOpen && (
//                     <View style={styles.dropdownMenu}>
//                       {mockLists.map((list) => (
//                         <TouchableOpacity
//                           key={list.id}
//                           style={styles.dropdownItem}
//                           onPress={() => {
//                             setSelectedList(list.id);
//                             setDropdownOpen(false);
//                           }}
//                         >
//                           <Text style={{ color: "#FFF" }}>{list.name}</Text>
//                         </TouchableOpacity>
//                       ))}
//                     </View>
//                   )}
//                 </View>

//                 <TouchableOpacity
//                   style={styles.addButton}
//                   onPress={() => {
//                     if (!selectedList) {
//                       console.log("No list selected");
//                       return;
//                     }
//                     console.log("Added to list");
//                     setModalVisible(false);
//                   }}
//                 >
//                   <Text style={styles.addButtonText}>Add to List</Text>
//                 </TouchableOpacity>

//                 <TouchableOpacity
//                   onPress={() => setModalVisible(false)}
//                   style={styles.closeButton}
//                 >
//                   <Text style={styles.closeText}>Close</Text>
//                 </TouchableOpacity>
//               </View>
//             </TouchableWithoutFeedback>
//           </TouchableOpacity>
//         </Modal>
