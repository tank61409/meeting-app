import React, { useState, useRef, useEffect } from "react";
import { View, Text,  TouchableOpacity} from 'react-native';
import { Audio } from 'expo-av';
import {createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import * as FileSystem from 'expo-file-system';
import { AntDesign,MaterialCommunityIcons} from '@expo/vector-icons'

import { TabBar } from "@/components/TabBar";
import HomeScreen from "./Home"
import Upload from "./Upload";
import styles from './Style';
import Download from "./Download";
import Setting from "./Setting";
import Team from "./Team";

const Tabs = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

const recordingSettings = {
  android: {
    extension: '.wav',
    sampleRate: 44100,
    numberOfChannels: 2,
    bitRate: 128000,
  },
  ios: {
    extension: '.wav',
    sampleRate: 44100,
    numberOfChannels: 2,
    bitRate: 128000,
  },
  web: {
    mimeType: 'audio/wav', // 可以使用 'audio/webm' 或 'audio/wav'
    bitsPerSecond: 128000,
    sampleRate: 44100,
    numberOfChannels: 2,
  },

};
function Record({navigation}) {
  // Refs for the audio
  const AudioRecorder = useRef(new Audio.Recording());
  const AudioPlayer = useRef(new Audio.Sound());

  // States for UI
  const [RecordedURI, SetRecordedURI] = useState<string>("");
  const [AudioPermission, SetAudioPermission] = useState<boolean>(false);
  const [IsRecording, SetIsRecording] = useState<boolean>(false);
  const [IsPLaying, SetIsPLaying] = useState<boolean>(false);

  // Initial Load to get the audio permission
  useEffect(() => {
    GetPermission();
    fetch('',{method:'GET'})
  }, []);

  // Function to get the audio permission
  const GetPermission = async () => {
    const getAudioPerm = await Audio.requestPermissionsAsync();
    SetAudioPermission(getAudioPerm.granted);
  };



  // Function to start recording
  const StartRecording = async () => {
    try {
      // Check if user has given the permission to record
      if (AudioPermission === true) {
        try {
          // Prepare the Audio Recorder
          await AudioRecorder.current.prepareToRecordAsync(
            recordingSettings
          );

          // Start recording
          await AudioRecorder.current.startAsync();
          SetIsRecording(true);
        } catch (error) {
          console.log(error);
        }
      } else {
        // If user has not given the permission to record, then ask for permission
        GetPermission();
      }
    } catch (error) {}
  };

  // Function to stop recording
  const StopRecording = async () => {
    try {
      // Stop recording
      await AudioRecorder.current.stopAndUnloadAsync();

      // Get the recorded URI here
      const result = AudioRecorder.current.getURI();
      

      const fileName = `recording-${Date.now()}.wav`;

      await FileSystem.makeDirectoryAsync(FileSystem.documentDirectory + 'recordings/', { intermediates: true });
      await FileSystem.moveAsync({
          from: result,
          to: FileSystem.documentDirectory + 'recordings/' + `${fileName}`
        });
      if (result) SetRecordedURI(FileSystem.documentDirectory + 'recordings/' + `${fileName}`);
      // Reset the Audio Recorder
      AudioRecorder.current = new Audio.Recording();
      SetIsRecording(false);
    } catch (error) {}
  };

  // Function to play the recorded audio
  const PlayRecordedAudio = async () => {
    try {
      // Load the Recorded URI
      await AudioPlayer.current.loadAsync({ uri: RecordedURI }, {}, true);

      // Get Player Status
      const playerStatus = await AudioPlayer.current.getStatusAsync();

      // Play if song is loaded successfully
      if (playerStatus.isLoaded) {
        if (playerStatus.isPlaying === false) {
          AudioPlayer.current.playAsync();
          SetIsPLaying(true);
        }
      }
    } catch (error) {}
  };

  // Function to stop the playing audio
  const StopPlaying = async () => {
    try {
      //Get Player Status
      const playerStatus = await AudioPlayer.current.getStatusAsync();

      // If song is playing then stop it
      if (playerStatus.isLoaded === true)
        await AudioPlayer.current.unloadAsync();

      SetIsPLaying(false);
    } catch (error) {}
  };

  return (
    <View style={styles.container}>

      <TouchableOpacity onPress={IsRecording ? StopRecording : StartRecording} style = {[styles.button, {top:160, left:2.5}]} >
        <View style={styles.back}><MaterialCommunityIcons name={IsRecording? "stop":"record-rec"} size={50} color="#4F8C6F" /></View>
        <Text style={[styles.buttontext]}>{IsRecording ? "Stop" : "Record"}</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={IsPLaying ? StopPlaying : PlayRecordedAudio} style = {[styles.button, {top:160, left:185}]} >
        <View style={styles.back}><AntDesign name={IsPLaying? "pause":"caretright"} size={50} color="#4F8C6F" /></View>
        <Text style={[styles.buttontext]}>{IsPLaying ? "Stop Sound" : "Sound"}</Text>
      </TouchableOpacity>


      <TouchableOpacity onPress={()=>navigation.navigate('Download')} style = {[styles.button, {top:350, left:2.5}]} >
        <View style={styles.back}><AntDesign name="save" size={50} color="#4F8C6F" /></View>
        <Text style={[styles.buttontext]}>{`Save`}</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={()=>navigation.navigate('Upload')} style = {[styles.button, {top:350, left:185}]} >
        <View style={styles.back}><AntDesign name="clouduploado" size={50} color="#4F8C6F"  /></View>
        <Text style={[styles.buttontext]}>{`Upload`}</Text>
      </TouchableOpacity>

    </View>
  );
}

function TabsNavigator() {
  return (
    <Tabs.Navigator tabBar={props => <TabBar {...props} />}> 
      <Tabs.Screen name="Home" component={HomeScreen} options={{ title: "Home", headerShown:false}} />
      <Tabs.Screen name="Download" component={Download} options={{ title: "Result", headerShown:false}} />
      <Tabs.Screen name="Team" component={Team} options={{ title: "Team", headerShown:false}} />
      <Tabs.Screen name="Setting" component={Setting} options={{ title: "Setting", headerShown:false}} />
    </Tabs.Navigator>
  );
}


function App() {
  return (
      <Stack.Navigator screenOptions={{
        headerTitleAlign: 'center', // 居中标题
        headerStyle: {
          backgroundColor: '#f8f9fa', // 自定义头部背景色
        },
        headerTitleStyle: {
          fontSize: 20,
          fontWeight: 'bold', // 自定义标题样式
        },
      }}>
        <Stack.Screen name="Main" component={TabsNavigator} />       
        <Stack.Screen name="Home" component={HomeScreen}  />
        <Stack.Screen name="Record" component={Record} />
        <Stack.Screen name="Upload" component={Upload} />
        <Stack.Screen name="Download" component={Download} />
        <Stack.Screen name="Setting" component={Setting} />
        <Stack.Screen name="Team" component={Team} />
      </Stack.Navigator>
      
  );
}

export default App;