import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet,  Alert } from 'react-native';
import RNFS from "react-native-fs";
const Button = (props) => (
    <TouchableOpacity
        onPress={props.onPress}>
        <View style={props.viewstyle}>
            <Text style={props.textstyle}>{props.content}</Text>
        </View>
    </TouchableOpacity>
)
const NOTE = ({ route, navigation }) => {
    const [notes, setnotes] = useState("");
    const _read = (path) => {
        RNFS.readFile(file.path, 'utf8')
            .then(content => {
                setnotes(content);
            })
    }
    const _update = (notes, path) => {
        RNFS.writeFile(path, notes, 'utf8')
            .then(() => console.log(path + " was created!"))
    }
    _read(route.path);
    return (
        <View>
            <TextInput
                style={styles.input}
                onChangeText={notes => setnotes(notes)}
                value={notes}
                placeholder="Write anything you'd like to note."
                multiline={true}
            />
            <Button
                onPress={() => { _update(notes, route.path) }}
                content="save"
            />
            <Button
                onPress={() => {
                    navigation.navigate("Inner")
                }}
                content="press to read"
            />
        </View>

    );
}
const styles = StyleSheet.create({
    input: {
        height: 200,
        width: 400,
        margin: 12,
        borderWidth: 1,
        padding: 0,
    }
}
)
export default NOTE;
