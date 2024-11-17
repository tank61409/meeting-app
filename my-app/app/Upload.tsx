import React, { useState } from "react";
import { View, StyleSheet, Button, Alert } from 'react-native';
import * as DocumentPicker from 'expo-document-picker';
import axios from 'axios';

function Upload() {
  const [fileUri, setFileUri] = useState<string>("");

  const pickAudio = async () => {
    try {
      const apiUrl = 'http://192.168.1.191:5000';
      const docRes = await DocumentPicker.getDocumentAsync({
        type: "audio/*",
        multiple: false
      });

      if (docRes.type === "cancel") {
        console.log("User cancelled document picking.");
        return;
      }

      const file = docRes.assets?.[0];
      if (!file) {
        console.error("No file selected.");
        return;
      }

      const formData = new FormData();
      const audioFile = {
        name: file.name.split(".")[0],
        uri: file.uri,
        type: file.mimeType,
      };

      const fileToUpload = {
        uri: audioFile.uri,
        type: audioFile.type,
        name: audioFile.name,
      };

      formData.append("audioFile", fileToUpload);
      console.log(formData._parts)
      axios.post(apiUrl, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        }
      })
      .then((response) => {
        console.log(response.data);
        Alert.alert("Success", "File uploaded successfully!");
      })
      .catch((error) => {
        console.error("Error uploading file:", error);
        Alert.alert("Error", "File upload failed!");
      });
    } catch (error) {
      console.error("Error while selecting file:", error);
    }
    
  };

  return (
    <View style={styles.container}>
      <Button title="Pick an audio file" onPress={pickAudio} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    backgroundColor: "#ecf0f1",
    padding: 8,
  },
});

export default Upload;
