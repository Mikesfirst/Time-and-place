// screens/Discovery.js
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

function Profile() {
    return (
      <View style={styles.screenContainer}>
        <Text>Profile</Text>
      </View>
    );
  }

const styles = StyleSheet.create({
  screenContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: "#FEF5E6"

  },
});

export default Profile;
