import React, { useState } from 'react';
import {
    View,
    Text,
    TextInput,
    StyleSheet,
    Alert,
    ImageBackground,
    TouchableOpacity,
    Dimensions,
    KeyboardAvoidingView
} from 'react-native';
import RNFS from "react-native-fs";
const image = { uri: "https://img1.baidu.com/it/u=576329657,1344262112&fm=253&fmt=auto&app=138&f=JPEG?w=500&h=997" };
const Button = (props) => (
    <TouchableOpacity
        onPress={props.onPress}>
        <View style={props.viewstyle}>
            <Text style={props.textstyle}>{props.content}</Text>
        </View>
    </TouchableOpacity>
)
const Height = Dimensions.get('window').height * 8/11;
const NOTE = (props) => {
    const { path } = props.route.params;
    const { content } = props.route.params;
    const [notes, setnotes] = useState(content);
    console.log("content:" + notes);
    const _update = async (notes, path) => {
        RNFS.writeFile(path, notes, 'utf8')
            .then(() => console.log(path + ": update it !!"))
    }
    return (
        <View style={styles.total}>
            <ImageBackground source={image} style={styles.image}>
                <KeyboardAvoidingView style={styles.container} behavior="padding" enabled>

                    <TextInput
                        style={styles.input}
                        value={notes}
                        onChangeText={text => {
                            setnotes(text);
                            _update(text, path);
                        }}
                        placeholder="Write anything you'd like to note."
                        multiline={true}
                        textAlignVertical="top"

                    />
                    <View style={styles.container}>

                        {/* <Button
            viewstyle={styles.viewstyle}
                        textstyle={styles.textstyle}
                onPress={() => {
                    console.log("notes:" + notes);
                    _update(notes, path);
                }}
                content="save"
            /> */}

                    </View>
                </KeyboardAvoidingView>
            </ImageBackground>

        </View>

    );
}
const styles = StyleSheet.create({
        total:{
            flex:1,

        },
        BackButton: {
            height: 70,
            width: 90,
        },
        ButtonText: {
            fontSize: 50,
        },
        input: {
            height: Height,
            width: 400,
            margin: 15,
            borderWidth: 1,
            padding: 0,
            backgroundColor:"#fff8dc",
            fontSize:20,
        },
        container:{
            flex:1,
            alignItems:"center",
        },
        viewstyle:{
            width: 90,
            height: 40,
            backgroundColor: '#fff8dc',
            borderRadius:10,
            borderWidth:1,
            alignItems:"center",
            justifyContent:"center",
        },
        textstyle:{
            fontSize:20,
            color:"black"
        },
        image: {
            flex: 1,
            resizeMode: "cover",
            justifyContent: "center"
        },
    }
)
export default NOTE;
