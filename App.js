import * as React from 'react';
import { Text, View} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import {createNativeStackNavigator } from "@react-navigation/native-stack";
import NOTE from "./app/components/file";
import App2 from "./app/components/Calculator";
import Menu from "./app/components/menu";
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
const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

export default function App() {
    return (
        <NavigationContainer>
            <Stack.Navigator initialRouteName="Inner">
                <Stack.Screen name="Outer" component={OuterScreen} />
                <Stack.Screen name="Inner" component={InnerScreen} />
                <Stack.Screen name="Diary" component={DiaryScreen} />
            </Stack.Navigator>
        </NavigationContainer>
    );
}
