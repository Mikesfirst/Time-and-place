// Import necessary components
import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

function Login({ navigation }) { 
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  return (
    <View style={styles.screenContainer}>
      <Text>Login</Text>
      <TextInput 
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        autoCapitalize="none" // For email input
        keyboardType="email-address" // For proper keyboard
      />
      <TextInput 
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry // Hides the password
      />
    <Button title="Login" />
      <Text>Dont have an account?</Text>
      <Button 
      title="Register"
       onPress={() => navigation.navigate('Register')}></Button>
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

export default Login;
