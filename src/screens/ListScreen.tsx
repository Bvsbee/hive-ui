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
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { NavigationProp, useNavigation } from "@react-navigation/native";
import { AuthStackParamList } from "../../models/Navigation";
import { ListStackParamList } from "../../models/Navigation";
import { useFetchRecentlyAddedMedia, useFetchUserLists } from "../../services/listService";
import CreateMediaListModal from "../../components/CreateList/CreateMediaListModal";
import useAuthStore from "../stores/useAuthStore";



export default function ListScreen() {

  //const navigation = useNavigation<NavigationProp<AuthStackParamList>>();
  const navigation = useNavigation<NavigationProp<ListStackParamList>>();
  const user = useAuthStore((state) => state.user);
  const { data: lists, isLoading } = useFetchUserLists(user?.guid);
  const{data: recentMedia, isLoading: isLoadingRecent} = useFetchRecentlyAddedMedia(user?.guid);

  const baseUrl = "https://image.tmdb.org/t/p/w500/";

  // get image url based on media type
  const getImageUrl = (item: any) => {
    const media = item.media;
    const mediaType = media.mediaType;

    // movies and tv show
    if (mediaType === "MOVIE"  && media.movieDetails){
      return `${baseUrl}${media.movieDetails.posterPath}`;
    }
    if (mediaType === "TV" && media.tvDetails){
      return `${baseUrl}${media.tvDetails.postPath}`;
    }
    // anime uses direct url
    if (mediaType === "ANIME" && media.animeDetails){
      return media.animeDetails.coverImageUrl;
    }
    // book uses direct url
    if (mediaType === "BOOK" && media.bookDetails){
      return media.bookDetails.bookImageUrl;
    }
    return null;
  };


  return (
    
    <LinearGradient colors={["#17192C", "#273e79ff"]} style={{ flex: 1 }}>
      <KeyboardAvoidingView
        style={{ flex: 1, width: "100%" }}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
      >

        <View style={styles.header}>
          <Text style={styles.headerTitle}>My Collection</Text>
        </View>

        <ScrollView style = {{flex: 1}} showsVerticalScrollIndicator={false}>
            <View style={styles.sections}>
                <Text style = {styles.sectionTitle}>
                    Recently Added
                </Text>
            

            <ScrollView 
             horizontal
             showsHorizontalScrollIndicator={false} 
             style={{paddingLeft: 20}}
             >
                       
                
                  {isLoadingRecent ? (
                  <View style={styles.loadingContainer}>
                    <ActivityIndicator size="small" color="#FFD700" />
                  </View>
                ) : recentMedia && recentMedia.length > 0 ? (
                  recentMedia.map((item: any, index: number) => {
                    const imageUrl = getImageUrl(item);
                    const mediaTitle = item.media.title;
                    
                    return (
                      <View key={item.guid || index} style={styles.recentCard}>
                        {imageUrl ? (
                          <Image
                            source={{
                              uri: imageUrl,
                            }}
                            style={styles.recentImage}
                          />
                        ) : (
                          <View style={[styles.recentImage, styles.placeholder]}>
                            <Text style={{ color: "#FFF", fontSize: 12 }}>No Image</Text>
                          </View>
                        )}
                        <Text 
                          style={styles.recentMediaTitle}
                          numberOfLines={2}
                          
                        >
                          {mediaTitle}
                        </Text>
                      </View>
                    );
                  })
                ) : (
                  <View style={{ padding: 20,alignItems:"center"} }>
                    <Text style={{ color: "#f9f6deff", fontSize: 14 }}>
                      No recently added items
                    </Text>
                  </View>
                )} 
            </ScrollView>
            </View>

            <View style={styles.sections}>
                <Text style={styles.sectionTitle}>My Lists</Text>

            {isLoading ? (
              <View style={styles.loadingContainer}>
                <ActivityIndicator size="large" color="#FFD700" />
              </View>
            ) : lists && lists.length > 0 ? (
              lists.map((list: any) => (
                <TouchableOpacity
                  key={list.guid}
                  style={styles.listItem}
                  onPress={() => {
                    navigation.navigate("ListDetailScreen", {
                      listGuid: list.guid,
                      listName: list.name,
                    });
                  }}
                    // nav to list detail modal
                    
                  
                >
                  <View
                    style={{
                      flexDirection: "row",
                      alignItems: "center",
                      justifyContent: "center",
                      flex: 1,
                    }}
                  >
                    <View style={styles.listIcon}>
                      <Text style={{ fontSize: 22 }}>{list.icon || "📋"}</Text>
                    </View>

                    <View style={{ flex: 1, alignItems: "center" }}>
                      <Text style={styles.listItemTitle}>{list.name}</Text>
                      <Text style={{ color: "#f9f6deff" }}>
                        {list.items?.length || 0} items
                      </Text>
                    </View>
                  </View>
                </TouchableOpacity>
              ))
            ) : (
              <View style={styles.emptyContainer}>
                <Text style={styles.emptyText}>You dont have any lists yet. Create one to get started!</Text>
              </View>
            )}
          </View>
        </ScrollView>
        <CreateMediaListModal />
      </KeyboardAvoidingView>
    </LinearGradient>
    
  );
}

const styles = StyleSheet.create({
  backButton: { position: "absolute", top: 50, left: 20 },
  backArrow: { fontSize: 24, color: "#ffd700", fontWeight: "bold" },

    header: {
    alignItems: "center",
    paddingTop: 80,
    paddingHorizontal: 20,
  },
  headerTitle: {
    fontSize: 32,
    fontWeight: "bold",
    color: "#FFD700",
    textAlign: "center",
    textShadowColor: "#FFD700",
    textShadowOffset: { width: 0, height: 0 },
    textShadowRadius: 8,
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
  recentCard: {
    marginRight: 15,
    alignItems: "center",
  },
  recentImage: {    
    width: 120,
    height: 180,
    borderRadius: 12,
    backgroundColor: "#4A5A7A",
  },
    listItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "rgba(255, 255, 255, 0.05)",
    marginHorizontal: 20,
    marginBottom: 10,
    padding: 15,
    borderRadius: 15,
    borderWidth: 1,
    borderColor: "rgba(255, 215, 0, 0.2)",
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
    listItemTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#f9f6deff",
    marginBottom: 4,
    textAlign: "center",
    },
    loadingContainer: {
    padding: 40,
    alignItems: "center",
  },
    emptyContainer: {
    padding: 40,
    alignItems: "center",
  },
  emptyText: {
    color: "#f9f6deff",
    fontSize: 16,
    textAlign: "center",
  },
  placeholder: {
    justifyContent: "center",
    alignItems: "center",
  },
  emptyRecentContainer: {
    padding: 40,
    alignItems: "center",
  },
  recentMediaTitle: {
    color: "#FFF",
    marginTop: 8,
    fontSize: 12,
    textAlign: "center",
    width: 120,
  },
});
