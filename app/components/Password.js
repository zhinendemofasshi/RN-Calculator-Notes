import React, {useState} from 'react';
import {TextInput, Text, View, StyleSheet, Alert, Button} from "react-native";
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import {createNativeStackNavigator } from "@react-navigation/native-stack";

const SubFunction = ({words, navigation}) => {
    let origin = "123456"
    if (words === origin){
        navigation.navigate('Inner')
    }
    else{
        Alert.alert(
            "Error"
        )
    }
}

const Password = ({navigation}) => {

    const [words, setWords] = useState("");

    return(
        <View>
            <TextInput
                style={{ height: 40, borderColor: 'gray', borderWidth: 1 }}
                onChangeText={text => setWords(text)}
                placeholder = "password"
                secureTextEntry = {true}
            />
            <Button
                title = "Log in"
                onPress = {() => SubFunction({words, navigation})}
            />
        </View>

    )
}

export default Password;