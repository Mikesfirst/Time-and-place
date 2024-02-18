// Import necessary components
import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Discovery, Dates, Profile} from './';
import { Feather, Ionicons } from '@expo/vector-icons';
import { Image, View, Text, StyleSheet } from 'react-native';

const Tab = createBottomTabNavigator();

function HomeTabs() {
    return (
      <Tab.Navigator>
        <Tab.Screen
          name="Discovery"
          component={Discovery}
          options={{
            tabBarIcon: ({ color, size }) => (
              <Feather name="search" size={size} color={color} />
            ),
          }}
        />
        <Tab.Screen
          name="Dates"
          component={Dates}
          options={{
            tabBarLabel: "Dates",
            tabBarIcon: ({ color, size }) => (
              <Feather name="calendar" size={size} color={color} />
            ),
          }}
        />
        <Tab.Screen
          name="Profile"
          component={Profile}
          options={{
            tabBarLabel: "Profile",
            tabBarIcon: ({ color, size }) => (
              <Ionicons name="person-outline" size={size} color={color} />
            ),
          }}
        />
      </Tab.Navigator>
    );
  };

export default HomeTabs;
