import React from 'react';
import { Image, View, Text, StyleSheet } from 'react-native';

function Discovery() {
    return (
      <View style={styles.screenContainer}>
        <Text>Discovery Screen</Text>
        <Image source={require('/Users/michaeldominguez/Desktop/Projects/timeandplace/assets/images/logo_timeandplace.png')} style={{ width: 200, height: 200 }} />
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

export default Discovery;
