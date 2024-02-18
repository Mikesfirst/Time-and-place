import React, { useState, useEffect } from 'react';
import { View, Image, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

function Loading({ navigation }) {
    useEffect(() => {
        const checkToken = async () => {
            console.log("Executing Now:")
            var storedToken = await AsyncStorage.getItem('authToken');
            console.log('Token: ', storedToken);
            storedToken = "penis123"
            if (!storedToken) {
                navigation.navigate('Login');
            } else {
                navigation.navigate('HomeTabs');
            }
        };
        setTimeout(checkToken, 3000);
    }, [navigation]); // Added navigation as a dependency (WHY?)

    return (
        <View style={styles.screenContainer}>
            <Image source={require('/Users/michaeldominguez/Desktop/Projects/timeandplace/assets/images/timeandplaceFullPicture.png')} style={{ width: 200, height: 200 }} />
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

export default Loading;
