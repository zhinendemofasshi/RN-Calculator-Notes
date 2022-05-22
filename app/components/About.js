import React, {useState} from 'react';
import {TextInput, Text, View, StyleSheet, Alert, Button, Image} from "react-native";
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import {createNativeStackNavigator } from "@react-navigation/native-stack";

const About = () => {
    return(
        <View style={styles.list}>
            <Image style={styles.profile} source={require('./R.jpg')}/>
        </View>
    )
}

const styles = StyleSheet.create({
    profile: {
        width: 100,
        height: 100,
    },
    list: {
        flex: 1
    }
})
export default About;