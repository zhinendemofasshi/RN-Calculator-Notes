import * as React from 'react';
import { Text, View} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import {createNativeStackNavigator } from "@react-navigation/native-stack";
import NOTE from "./app/components/file";
import App2 from "./app/components/Calculator";
import Menu from "./app/components/menu";
import RNFS from "react-native-fs";
import Password from "./app/components/Password";
import {useState} from "react";

function OuterScreen({ navigation }) {
    return (
        <App2
            navigation = {navigation}
        />
    );
}
function DiaryScreen({ route, navigation }){
    return(
        <NOTE
            navigation ={ navigation }
            route = {route}
        />
    );
}
function InnerScreen({ navigation }) {
    return (
        <Menu
            navigation={ navigation }
        />
    );
}
function PassScreen({ navigation }) {
    return(
        <Password navigation = {navigation}/>
    )
}

function DetailsScreen({ route, navigation }) {
    const [text, Settext] = useState("")
    console.log(route.params.path)
    RNFS.readFile(route.params.path, 'utf8')
        .then(content => {
            console.log(content);
            Settext(content);
        })
    return(
        <View>
            <Text>This is DetailsScreen.</Text>
            <Text>{text}</Text>
        </View>

    )
}
const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

export default function App() {
    return (
        <NavigationContainer>
            <Stack.Navigator initialRouteName="Password">
                <Stack.Screen name="Password" component={PassScreen}/>
                <Stack.Screen name="Outer" component={OuterScreen} />
                <Stack.Screen name="Inner" component={InnerScreen} />
                <Stack.Screen name="Diary" component={DiaryScreen} />
                <Stack.Screen name="Details" component={DetailsScreen}/>
            </Stack.Navigator>
        </NavigationContainer>
    );
}