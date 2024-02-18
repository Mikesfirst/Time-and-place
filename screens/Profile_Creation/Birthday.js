import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';
import DatePicker from 'react-native-date-picker'
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from "axios"

function Birthday({ navigation }) { 
    const [Birthday, setBirthday] = useState('');

    const addBirthday = async () => {
        try {
            const verificationToken = await AsyncStorage.getItem('verificationToken');
            console.log("This is the verification token: ", verificationToken)

            const user = {
                Birthday: Birthday,
                verificationToken: verificationToken        
            };
            
            const response = await axios.post("http://192.168.1.60:8000/addBirthday", user);
            //Alert.alert("Registration successful", "You have been registered successfully");
            setBirthday("");
            navigation.navigate('');        } catch (error) {
            //Alert.alert("Registration failed", "An error occurred while registering");
            console.log("registration failed", error)
        }
    }
    return (
      <View style={styles.screenContainer}>
        <DatePicker date={Birthday} onDateChange={setBirthday}/>
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
  
  export default Birthday;