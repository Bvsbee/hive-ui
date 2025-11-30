import { useState } from "react";
import { useFetchBooks } from "../../services/mediaService";
import { useFetchUserLists } from "../../services/listService";
import useAuthStore from "../stores/useAuthStore"
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


const TrendingBooks = () => {
    const [selectedBook, setSelectedBook] = useState<any>(null);
    const [modalVisible, setModalVisible] = useState(false);
    const [dropdownOpen, setDropdownOpen] = useState<boolean>(false);
    const [selectedList, setSelectedList] = useState<string>("");
    const user = useAuthStore((state: any) => state.user);

    const userGuid = user?.guid;

    const { data: books, isLoading, isError, error } = useFetchBooks();
    const { data: userLists, isLoading: listsLoading } = useFetchUserLists(userGuid ?? "");

    if (isLoading)
        return <Text style={{ color: "white" }}>Loading Books...</Text>;
    if (error) return <Text>Error loading Books</Text>;
    console.log(user);

    return (
        <>
            <Text
                style={{ fontSize: 18, fontWeight: "bold", margin: 10, color: "white" }}
            >
                📚 Trending Books

            </Text>

            <FlatList
                data={books}
                horizontal
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={{ paddingHorizontal: 10 }}
                renderItem={({ item }) => (
                    <>
                        <TouchableOpacity
                            onPress={(e) => {
                                setSelectedBook(item);
                                setModalVisible(true);
                            }}
                            style={styles.card}
                        >
                            <Image
                                source={{
                                    uri: `${item.book_image}`,
                                }}
                                style={styles.poster}
                            />
                        </TouchableOpacity>
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
                                        {selectedBook && (
                                            <Text style={styles.bookTitle}>{selectedBook.title}</Text>
                                        )}

                                        {/* ROW: Poster Left --- Description Right */}
                                        <View style={styles.infoRow}>
                                            {selectedBook && (
                                                <Image
                                                    source={{ uri: selectedBook.book_image }}                                 
                                                    style={styles.leftPoster}
                                                />
                                            )}


                                            <View style={styles.rightInfo}>
                                            
                                                {selectedBook && (
                                                    <Text style={styles.ratingText}>Author: {selectedBook.author} </Text>
                                                )}
                                        

                                                {selectedBook && (
                                                    <Text style={styles.bookDescription}>
                                                        {selectedBook.description}
                                                    </Text>
                                                )}
                                            </View>
                                        </View>

                                        {/* DROPDOWN + Add to List BELOW the row */}
                                        <View style={styles.dropdownWrapper}>
                                            <Text style={styles.pickerLabel}>Add to List</Text>

                                            <TouchableOpacity
                                                style={styles.dropdownBox}
                                                onPress={() => setDropdownOpen(!dropdownOpen)}
                                            >
                                                <Text style={{ color: "#FFF" }}>
                                                    {selectedList
                                                        ? userLists?.find((l: any) => l.id === selectedList)?.name
                                                        : "Select a list..."}

                                                </Text>
                                            </TouchableOpacity>

                                            {dropdownOpen && userLists?.length > 0 && (
                                                <View style={styles.dropdownMenu}>
                                                    {userLists.map((list: any) => (
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
                                                if (!selectedList) return;
                                                console.log("Added");
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

export default TrendingBooks;

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
        height: "80%", // ⬅️ half-screen modal
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
    infoRow: {
        flexDirection: "row",
        alignItems: "flex-start",
        width: "100%",
        marginTop: 10,
        marginBottom: 20,
        gap: 16,
    },

    leftPoster: {
        width: 130,
        height: 200,
        borderRadius: 12,
        backgroundColor: "#273e79",
    },

    rightInfo: {
        flex: 1,
        justifyContent: "flex-start",
        paddingLeft: 10,
    },

    bookTitle: {
        fontSize: 20,
        fontWeight: "bold",
        color: "#ED3838",
        textAlign: "center",
        marginBottom: 15,
    },

    bookDescription: {
        fontSize: 15,
        color: "#EEE",
        lineHeight: 20,
        textAlign: "left",

    }, ratingText: {
        fontSize: 16,
        color: "#FFD700",
        fontWeight: "600",
        marginBottom: 12,
    },


});
