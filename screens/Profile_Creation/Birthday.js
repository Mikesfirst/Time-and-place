import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from "axios"

function Birthday({ navigation }) { 
    const [Birthday, setBirthday] = useState(new Date());

    const addBirthday = async () => {
        console.log("Hey this is the selected birthday:", Birthday)
        try {
            const verificationToken = await AsyncStorage.getItem('verificationToken');
            console.log("This is the verification token: ", verificationToken)

            const user = {
                Birthday: Birthday,
                verificationToken: verificationToken        
            };
            
            await axios.post("http://192.168.1.60:8000/addBirthday", user);
            //Alert.alert("Registration successful", "You have been registered successfully");
            setBirthday(new Date());
            navigation.reset({
                index: 0, 
                routes: [{name: 'HomeTabs'}], 
              });   
        } catch (error) {
            //Alert.alert("Registration failed", "An error occurred while registering");
            console.log("registration failed", error)
        }
    }
    return (
      <View style={styles.screenContainer}>
        <Text>When is your birthday !</Text>
        <DateTimePicker value={Birthday} mode="date"/>
        <Button onPress={addBirthday} title="Lets Start Planning Dates"></Button>
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