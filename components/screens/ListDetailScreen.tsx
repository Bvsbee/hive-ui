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
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { NavigationProp, useNavigation } from "@react-navigation/native";
import { AuthStackParamList } from "../../models/user/Navigation";
import { useLoginUser } from "../../services/authService";
import { SafeAreaView } from "react-native-safe-area-context";

export default function ListScreen() {

  const navigation = useNavigation<NavigationProp<AuthStackParamList>>();
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
                {/* style recent cards show most recently added iten from each category */}        
                <View style={styles.recentCard}>
                    {/* sample image replace with users most recent added movie */}
                    <Image
                        source={{uri: 'https://www.themoviedb.org/t/p/w1280/ulzhLuWrPK07P1YkdWQLZnQh1JL.jpg'}}
                        style={styles.recentImage}
                    />
                    <Text style={{color: "#FFF", marginTop: 8}}>Movie</Text>
                </View>
                

                <View style={styles.recentCard}>
                    {/* sample image replace with users most recent added show */}
                    <Image
                        source={{uri: 'https://www.themoviedb.org/t/p/w1280/rOYLWCdAifpUtPlTf1WHxyaxeMt.jpg'}}
                        style={styles.recentImage}
                    />
                    <Text style={{color: "#FFF", marginTop: 8}}>TV Show</Text>
                </View>
                
                <View style={styles.recentCard}>
                    {/* sample image replace with users most recent added anime */}
                    <Image
                        source={{uri: 'https://cdn.myanimelist.net/images/anime/1168/148347.jpg'}}
                        style={styles.recentImage}
                    />
                    <Text style={{color: "#FFF", marginTop: 8}}>Anime</Text>
                </View>

                <View style={styles.recentCard}>
                    {/* sample image replace with users most recent added book */}
                    <Image
                        source={{uri: 'https://m.media-amazon.com/images/S/compressed.photo.goodreads.com/books/1531891848i/11.jpg'}}
                        style={styles.recentImage}
                    />
                    <Text style={{color: "#FFF", marginTop: 8}}>Anime</Text>
                </View>    
            </ScrollView>
            </View>

            <View style={styles.sections}>
                <Text style = {styles.sectionTitle}> My Lists  </Text>

                {/* list items */}

                <TouchableOpacity style={styles.listItem}>
                  <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "center", flex: 1 }}>
                    <View style={styles.listIcon}>
                    <Text style={{fontSize: 22}}> 📺 </Text>
                    </View>

                    <View style={{flex: 1, alignItems: "center"}}>
                        <Text style={styles.listItemTitle}>Watching</Text>
                        {/* replace with actual items*/}
                        <Text style={{color: "#f9f6deff"}}>23 items </Text>
                    </View>

                  </View>   
                </TouchableOpacity>

                <TouchableOpacity style={styles.listItem}>
                  <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "center", flex: 1 }}>
                    <View style={styles.listIcon}>
                    <Text style={{fontSize: 22}}> ⭐ </Text>
                    </View>

                    <View style={{flex: 1, alignItems: "center"}}>
                        <Text style={styles.listItemTitle}>Favorites</Text>
                        {/* replace with actual items*/}
                        <Text style={{color: "#f9f6deff"}}> 6 items </Text>
                    </View>

                  </View>   
                </TouchableOpacity>

                <TouchableOpacity style={styles.listItem}>
                  <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "center", flex: 1 }}>
                    <View style={styles.listIcon}>
                    <Text style={{fontSize: 22}}> 📚 </Text>
                    </View>

                    <View style={{flex: 1, alignItems: "center"}}>
                        <Text style={styles.listItemTitle}>Want To Read</Text>
                        {/* replace with actual items in list */}
                        <Text style={{color: "#f9f6deff"}}>4 items </Text>
                    </View>

                  </View>   
                </TouchableOpacity>

                <TouchableOpacity style={styles.listItem}>
                  <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "center", flex: 1 }}>
                    <View style={styles.listIcon}>
                    <Text style={{fontSize: 22}}> 🎬 </Text>
                    </View>

                    <View style={{flex: 1, alignItems: "center"}}>
                        <Text style={styles.listItemTitle}>Movies</Text>
                        {/* replace with actual items*/}
                        <Text style={{color: "#f9f6deff"}}> 26 items </Text>
                    </View>

                  </View>   
                </TouchableOpacity>

                <TouchableOpacity style={styles.listItem}>
                  <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "center", flex: 1 }}>
                    <View style={styles.listIcon}>
                    <Text style={{fontSize: 22}}> 🎬 </Text>
                    </View>

                    <View style={{flex: 1, alignItems: "center"}}>
                        <Text style={styles.listItemTitle}>Anime</Text>
                        {/* replace with actual items*/}
                        <Text style={{color: "#f9f6deff"}}> 7 items </Text>
                    </View>

                  </View>   
                </TouchableOpacity>

            </View>

        </ScrollView>
      </KeyboardAvoidingView>
    </LinearGradient>
    
  );
}

const styles = StyleSheet.create({
  backButton: { position: "absolute", top: 50, left: 20 },
//   backArrow: { fontSize: 24, color: "#ffd700", fontWeight: "bold" },

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
    backgroundColor: "rgba(26, 100, 104, 0.5)",
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

});
