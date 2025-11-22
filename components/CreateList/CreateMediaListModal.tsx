import { useState } from "react";
import { Modal, StyleSheet, Text, TouchableOpacity, Alert, View, TextInput, ActivityIndicator } from "react-native";
import useAuthStore from "../stores/useAuthStore";
import { useCreateList } from "../../services/listService";


const CreateMediaListModal = () => {
  const [modalVisible, setModalVisible] = useState<boolean>(false);
  const [listName, setListName] = useState("");
  const [icon, setIcon] = useState("");
  const user = useAuthStore((state) => state.user);
  //const{mutate: createList} = useCreateList();
  const { mutate: createList, isPending } = useCreateList();

  const handleCreate=() => {

    //createList({userGuid: user.guid, name: listName, icon: icon});
    createList(
      { 
        userGuid: user.guid,
        name: listName,
        icon: icon,
        allowedMediaTypes: ["MOVIE", "TV", "BOOK", "ANIME"],
      },
      { onSuccess: () => {
          setModalVisible(false);
          setListName("");
          setIcon("");
        },
        onError: (error: any) => {
          Alert.alert(
            "Error",
            error.response?.data?.message || error.message || "Failed to create list"
          );
        },
      }
    );



  };

  return (
    <>
      <TouchableOpacity
        style={styles.addButton}
        onPress={() => {
          setModalVisible(true);
        }}
      >
        <Text style={styles.addButtonText}>Create List</Text>
      </TouchableOpacity>

      <Modal
        visible={modalVisible}
        transparent
        animationType="slide"
        onRequestClose={() => setModalVisible(false)}
      >

      <View style={styles.modal}>
        <View style={styles.modalContent}> 
          <Text style={styles.modalTitle}>
            Create New List</Text>

            <Text style={{fontSize: 16,color: "#f9f6deff", marginBottom: 8}}>
              List Name:</Text>
            <TextInput 
              style={styles.input}
              placeholder="Enter list name"
              placeholderTextColor="#b0b0b0"
              value={listName}
              onChangeText={setListName}
            />

            <Text style={{fontSize: 16,color: "#f9f6deff", marginBottom: 8}}>
              Emoji Icon </Text>
            <TextInput
              style={styles.input}
              placeholder="Enter emoji Icon"
              placeholderTextColor="#b0b0b0"
              value={icon}
              onChangeText={setIcon}
              maxLength={2}
            />

            <View style={styles.buttons}>
                <TouchableOpacity
                style={[styles.button, styles.cancelButton]}
                onPress={() => {
                  setModalVisible(false);
                  setListName("");
                  setIcon("");
                }}
                disabled={isPending}
              >
                <Text style={styles.cancelButtonText}>Cancel</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={[styles.button, styles.createButton]}
                onPress={handleCreate}
                disabled={isPending}
              >
                {isPending ? (
                  <ActivityIndicator color="#000" />
                ) : (
                  <Text style={styles.createButtonText}>Create</Text>
                )}
              </TouchableOpacity>
            </View>
            


        </View>
        
        </View>  
      </Modal>
    </>
  );
};

export default CreateMediaListModal;

const styles = StyleSheet.create({
  addButton: {
    backgroundColor: "#FFD700",
    paddingVertical: 12,
    paddingHorizontal: 40,
    borderRadius: 12,
    marginBottom: 15,
    alignSelf: "center",
  },
  addButtonText: {
    color: "#000",
    fontWeight: "bold",
    fontSize: 16,
  },
  modal: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.7)",
    justifyContent: "center",
    alignItems: "center",
  },
  modalContent: {
    backgroundColor: "#17192C",
    borderRadius: 20,
    padding: 25,
    width: "85%",
    borderWidth: 1,
    borderColor: "rgba(255, 215, 0, 0.3)",
  },modalTitle: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#FFD700",
    marginBottom: 20,
    textAlign: "center",
  },input: {
    backgroundColor: "#2D3B5C",
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 14,
    borderWidth: 1,
    borderColor: "#4A5A7A",
    fontSize: 16,
    color: "#f9f6deff",
    marginBottom: 15,
  },
    buttons: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 10,
  },
    button: {
    flex: 1,
    paddingVertical: 14,
    borderRadius: 12,
    alignItems: "center",
  },
  cancelButton: {
    backgroundColor: "transparent",
    borderWidth: 1,
    borderColor: "#4A5A7A",
    marginRight: 10,
  },
  cancelButtonText: {
    color: "#f9f6deff",
    fontWeight: "bold",
    fontSize: 16,
  },
  createButton: {
    backgroundColor: "#FFD700",
    marginLeft: 10,
  },
  createButtonText: {
    color: "#000",
    fontWeight: "bold",
    fontSize: 16,
  },

});
