import {
  Text,
  View,
  StyleSheet,
  ScrollView,
  Image,
  TouchableOpacity,
  Alert,
  Share,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { SafeAreaView } from "react-native-safe-area-context";
import { useRoute, RouteProp } from "@react-navigation/native";
import { ListStackParamList } from "../../models/Navigation";
import useAuthStore from "../stores/useAuthStore";
import { useFetchUserLists } from "../../services/listService";
import {
  getImageUrl,
  getMediaTypeLabel,
  getYear,
  getRating,
} from "../../services/mediaHelper";

type ListDetailScreenProps = RouteProp<ListStackParamList, "ListDetailScreen">;

export default function ListDetailScreen() {
  const route = useRoute<ListDetailScreenProps>();
  const { listGuid, listName } = route.params;

  const user = useAuthStore((state) => state.user);
  const { data: userLists, isLoading } = useFetchUserLists(user?.guid);

  //get list items based
  const currentList = userLists?.find((list) => list.guid === listGuid);
  const listItems = currentList ? currentList.items : [];

  function buildShareMessage(listName: string, items: any[]) {
    if (!items || items.length === 0) {
      return `List "${listName}" is currently empty.`;
    }

    const lines = items.map((item: any, index: number) => {
      const title = item?.media?.title ?? "Untitled";
      const mediaTypeLabel = getMediaTypeLabel(item);
      const year = getYear(item);
      const rating = getRating(item);
      const dateString = item.createdAt
        ? new Date(item.createdAt).toLocaleDateString(undefined, {
            year: "numeric",
            month: "short",
            day: "numeric",
          })
        : "";

      let line = `${index + 1}. ${title}`;

      if (mediaTypeLabel || year) {
        line += " (";
        if (mediaTypeLabel) line += mediaTypeLabel;
        if (mediaTypeLabel && year) line += " • ";
        if (year) line += year;
        line += ")";
      }

      if (typeof rating === "number") {
        line += ` ★ ${rating.toFixed(1)}`;
      }

      if (dateString) {
        line += ` — ${dateString}`;
      }

      return line;
    });

    return `List: "${listName}"\n\n` + lines.join("\n");
  }

  const handleSharePress = async () => {
    try {
      if (!listItems || listItems.length === 0) {
        Alert.alert("Nothing to share", "This list has no items yet.");
        return;
      }

      const message = buildShareMessage(listName, listItems);

      await Share.share({ message });
    } catch (error) {
      console.error("Error sharing list:", error);
      Alert.alert("Error", "Something went wrong while sharing the list.");
    }
  };

  return (
    <LinearGradient colors={["#17192C", "#273e79ff"]} style={{ flex: 1 }}>
      <SafeAreaView style={styles.container}>
        {/* //list name */}
        <View style={styles.header}>
          <Text style={styles.listname}>{listName}</Text>

          <TouchableOpacity
            style={styles.shareButton}
            onPress={handleSharePress}
          >
            <Text style={styles.shareButtonText}>Share</Text>
          </TouchableOpacity>
        </View>

        {/* list items with vertical scroll */}
        <ScrollView
          style={{ flex: 1 }}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.scrollList}
        >
          {" "}
          {/* list items */}
          {isLoading ? (
            <View style={styles.loadingContainer}>
              <Text style={{ color: "#FFF" }}>Loading...</Text>
            </View>
          ) : listItems && listItems.length > 0 ? (
            listItems.map((item: any) => {
              const imageUrl = getImageUrl(item);
              const mediaTypeLabel = getMediaTypeLabel(item);
              const rating = getRating(item);

              return (
                <View key={item.guid} style={styles.mediaCard}>
                  {/* image on left */}
                  {imageUrl ? (
                    <Image
                      source={{ uri: imageUrl }}
                      style={styles.mediaImage}
                    />
                  ) : (
                    <View
                      style={[
                        styles.mediaImage,
                        { justifyContent: "center", alignItems: "center" },
                      ]}
                    >
                      <Text style={{ color: "#FFF" }}>No Image</Text>
                    </View>
                  )}
                  <View style={{ flex: 1, justifyContent: "space-between" }}>
                    {/* media title */}
                    <Text style={styles.mediaTitle} numberOfLines={2}>
                      {item.media.title}
                    </Text>

                    {/* media label*/}
                    <Text
                      style={{
                        color: "#AAA",
                        fontSize: 14,
                        marginBottom: 10,
                        textAlignVertical: "top",
                      }}
                    >
                      {mediaTypeLabel}
                      {" • "}
                      {getYear(item)}
                    </Text>

                    {/* ratings */}
                    {rating && (
                      <View
                        style={{
                          flexDirection: "row",
                          alignItems: "center",
                          marginBottom: 8,
                        }}
                      >
                        <Text style={styles.rating}>★ {rating.toFixed(1)}</Text>
                      </View>
                    )}
                  </View>
                  {/* rightside date added */}
                  <View style={styles.rightSide}>
                    <Text style={{ color: "#888", fontSize: 12 }}>
                      {item.createdAt
                        ? new Date(item.createdAt).toLocaleDateString(
                            undefined,
                            {
                              year: "numeric",
                              month: "short",
                              day: "numeric",
                            }
                          )
                        : ""}
                    </Text>
                  </View>
                </View>
              );
            })
          ) : (
            <View style={{ padding: 20, alignItems: "center" }}>
              <Text style={{ color: "#FFF", fontWeight: "bold" }}>
                No items in this list
              </Text>
            </View>
          )}
        </ScrollView>
      </SafeAreaView>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    paddingTop: 20,
    paddingHorizontal: 20,
    paddingBottom: 20,
  },
  listname: {
    fontSize: 32,
    fontWeight: "bold",
    color: "#FFD700",
    textAlign: "center",
    textShadowColor: "#FFD700",
    textShadowOffset: { width: 0, height: 0 },
    textShadowRadius: 8,
  },
  shareButton: {
    position: "absolute",
    right: 20,
    bottom: 20,
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 999,
    borderWidth: 1,
    borderColor: "#FFD700",
    backgroundColor: "rgba(23, 25, 44, 0.7)",
  },
  shareButtonText: {
    color: "#FFD700",
    fontWeight: "600",
    fontSize: 14,
  },
  scrollList: {
    paddingHorizontal: 20,
    paddingTop: 0,
    paddingBottom: 100,
  },
  loadingContainer: {
    padding: 40,
    alignItems: "center",
  },
  mediaCard: {
    flexDirection: "row",
    backgroundColor: "rgba(255, 255, 255, 0.05)",
    borderRadius: 15,
    padding: 15,
    marginBottom: 15,
    borderWidth: 1,
    borderColor: "rgba(255, 215, 0, 0.2)",
  },
  mediaImage: {
    width: 80,
    height: 120,
    borderRadius: 8,
    backgroundColor: "#4A5A7A",
    marginRight: 15,
  },
  mediaTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#FFF",
    marginBottom: 6,
  },
  rightSide: {
    justifyContent: "flex-end",
    //alignItems: "flex-end",
    marginLeft: 10,
  },
  rating: {
    fontSize: 14,
    color: "#FFD700",
    marginRight: 10,
  },
});
