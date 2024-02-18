// screens/Discovery.js
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  Image,
  Pressable,
  KeyboardAvoidingView,
  TextInput,
  Alert, 
  Button
} from "react-native";
import React, { useState } from "react";
import { AntDesign } from "@expo/vector-icons";
import { MaterialIcons } from "@expo/vector-icons";
import { Entypo } from '@expo/vector-icons';
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import axios from "axios"
import AsyncStorage from '@react-native-async-storage/async-storage';


function Register({ navigation }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleRegistration = async () => {
    try {
      console.log("This is the email and password: ", email, password);
      const user = {
        email: email,
        password: password,
      };

      const response = await axios.post("http://192.168.1.60:8000/register", user);
      const verificationToken = response.data.verificationToken;

      await AsyncStorage.setItem('verificationToken', verificationToken);
      console.log("Verification token saved on device:", verificationToken);

      setEmail("");
      setPassword("");
      navigation.reset({
        index: 0, 
        routes: [{name: 'Name'}], 
      });
    } catch (error) {
      console.log("Registration failed", error);
      // Handle registration failure
    }
  }
  return (
    <View style={styles.screenContainer}>
      <Text>Register</Text>
      <TextInput
        placeholder="Email"
        value={email}
        onChangeText={(text) => setEmail(text)}
        autoCapitalize="none" // For email input
        keyboardType="email-address" // For proper keyboard
      />
      <TextInput
        placeholder="Password"
        value={password}
        onChangeText={(text) => setPassword(text)}
        secureTextEntry // Hides the password
      />

      <Button
        title="Register"
        onPress={handleRegistration}></Button>
    </View>

  );
}
const styles = StyleSheet.create({
  screenContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
export default Register;
