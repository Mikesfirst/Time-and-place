import React, { useState, useEffect } from 'react';
import { ActivityIndicator, StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { StatusBar } from 'expo-status-bar';
import { Login, Register, Discovery, Dates, Profile, Name} from './screens';
import { Feather, Ionicons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

export default function App() {
  const [token, setToken] = useState(null);

  useEffect(() => {
    const checkToken = async () => {
      const storedToken = await AsyncStorage.getItem('authToken');
      setToken(storedToken);
    };
    checkToken();
  }, []);

  return (
    <NavigationContainer>
      {token == null ? (
        <Stack.Navigator>
          <Stack.Screen name="Login" component={Login}></Stack.Screen>
          <Stack.Screen name="Register" component={Register}></Stack.Screen>
          <Stack.Screen name="Name" component={Name}></Stack.Screen>

        </Stack.Navigator>
      ) : (
      <Stack.Navigator>
        <Tab.Navigator>
          <Tab.Screen
            name="Discovery"
            component={Discovery}
            options={{
              tabBarLabel: "Discover",
              tabBarIcon: ({ color, size }) => (
                <Feather name="search" size={size} color={color} />)
            }}
          />
          <Tab.Screen
            name="Dates"
            component={Dates}
            options={{
              tabBarLabel: "Dates",
              tabBarIcon: ({ color, size }) => (
                <Feather name="calendar" size={size} color={color} />)
            }}
          />
          <Tab.Screen
            name="Profile"
            component={Profile}
            options={{
              tabBarLabel: "Profile",
              tabBarIcon: ({ color, size }) => (
                <Ionicons name="person-outline" size={size} color={color} />)
            }} />
        </Tab.Navigator>

        <StatusBar style="auto"></StatusBar>
      </Stack.Navigator>
      )}
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#6e9db4',
    alignItems: 'center',
    justifyContent: 'center',
  },
  screenContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
