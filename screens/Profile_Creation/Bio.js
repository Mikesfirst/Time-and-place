import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Image } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from "axios"
import * as ImagePicker from 'expo-image-picker';

function Bio({ navigation }) { 
    console.log("This is bio")
    const [bio, setbio] = useState('');
    const [image1, setImage1] = useState(null);


    const addImage = async () => {
        console.log("Hey im picking an image!")
        let result = await ImagePicker.launchImageLibraryAsync({
          mediaTypes: ImagePicker.MediaTypeOptions.All,
          allowsEditing: true,
          aspect: [4, 3],
          quality: 1,
        }) 
        if (!result.canceled) {
            delete result.cancelled; 
        }
        setImage1(result.uri)
        console.log('This is the image', result)
        console.log('This is image 1:', image1)
    }

    const addBio = async () => {
        try {
            const verificationToken = await AsyncStorage.getItem('verificationToken');
            console.log("This is the verification token: ", verificationToken)

            const user = {
                bio:bio,
                verificationToken: verificationToken,
                image1: image1,
                image2: image2,
                image3: image3,
                image4: image4,

            };

            const response = await axios.post("http://192.168.1.60:8000/addBio", user);
            //Alert.alert("Registration successful", "You have been registered successfully");
            setFirst_Name("");
            setLast_Name("");
            navigation.navigate();        } catch (error) {
            //Alert.alert("Registration failed", "An error occurred while registering");
            console.log("registration failed", error)
        }
    }

    return (
      <View style={styles.screenContainer}>
        <Text>Add up at least 4 images</Text>
        <Button title="Pick an image from camera roll" onPress={addImage} />
      {image1 && <Image source={{ uri: image1 }} style={{ width: 200, height: 200 }} />}
        <Text>Tell us a little about yourself</Text>
        <TextInput 
        placeholder="Once upon a time..."
        value={bio}
        onChangeText={setbio}
      />
   
      <Button 
      title="Start planning!"
       onPress={addBio}></Button>
      </View>
    );
  }
  const styles = StyleSheet.create({
    screenContainer: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
      padding: 20,
    },
  });

  export default Bio;