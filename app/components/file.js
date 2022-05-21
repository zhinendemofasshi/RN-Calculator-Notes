import React, { useState } from 'react';
import { 
    View,
    Text, 
    TextInput, 
    StyleSheet,  
    Alert,
    TouchableOpacity,
} from 'react-native';
import RNFS from "react-native-fs";
const Button = (props) => (
    <TouchableOpacity
        onPress={props.onPress}>
        <View style={props.viewstyle}>
            <Text style={props.textstyle}>{props.content}</Text>
        </View>
    </TouchableOpacity>
)
const NOTE = (props) => {
    const [notes, setnotes] = useState("");
    console.log(notes);

    const {path} = props.route.params;

    console.log("path of now:" + path);
    const _read = (path) => {
        RNFS.readFile( path, 'utf8')
            .then(content => {
                setnotes(content);
            })
    }
    const _update = (notes, path) => {
        RNFS.writeFile(path, notes, 'utf8')
            // .then(notes => console.log(notes))
            .then(() => console.log("update it !!"))
    }
    _read(path);
    return (
        <View>
            <TextInput
                style={styles.input}
                onChangeText={
                    text => {
                        setnotes(text);
                        console.log("TEXT: " + text);
                        console.log("notes: " + notes);
                    }
                }
                // value={notes}
                placeholder="Write anything you'd like to note."
                multiline={true}
            />
            <Button
                onPress={() => {
                    // console.log("notes:" + notes);
                     _update(notes, path);
                    }}
                content="save"
            />
            <Button
                onPress={() => {
                    props.navigation.navigate("Inner")
                }}
                content="Back"
            />
        </View>

    );
}
const styles = StyleSheet.create({
    BackButton :{
        height:70,
        width:90,
    },
    ButtonText:{
        fontSize:50,
    },
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