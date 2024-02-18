import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from "axios"

function Name({ navigation }) { 
    const [First_Name, setFirst_Name] = useState('');
    const [Last_Name, setLast_Name] = useState('');

    const addName = async () => {
        try {
            const verificationToken = await AsyncStorage.getItem('verificationToken');
            console.log("This is the verification token: ", verificationToken)

            const user = {
                First_Name: First_Name,
                Last_Name: Last_Name,
                verificationToken: verificationToken        
            };
            
            console.log("rooarrr");

            const response = await axios.post("http://192.168.1.60:8000/addName", user);
            //Alert.alert("Registration successful", "You have been registered successfully");
            setFirst_Name("");
            setLast_Name("");
            navigation.reset({
                index: 0, 
                routes: [{name: 'Loading'}], 
              });        } catch (error) {
            //Alert.alert("Registration failed", "An error occurred while registering");
            console.log("registration failed", error)
        }
    }
    return (
      <View style={styles.screenContainer}>
        <Text>First Name</Text>
        <TextInput 
        placeholder="John"
        value={First_Name}
        onChangeText={setFirst_Name}
      />
        <Text>Last Name</Text>
        <TextInput 
        placeholder="John"
        value={Last_Name}
        onChangeText={setLast_Name}
      />
      <Button 
      title="Next"
       onPress={addName}></Button>
      </View>
    );
  }
  
  const styles = StyleSheet.create({
    screenContainer: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
      padding: 20, // Added for some padding around inputs
    },
  });
  
  export default Name;