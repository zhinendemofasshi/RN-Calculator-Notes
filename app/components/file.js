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
var flag1;
class NOTE extends React.Component {
    // console.log(notes); for test
    constructor(props) {
        super(props);
        const { path } = this.props.route.params;
        const { content } = this.props.route.params;
        this.state = {
            notes:content,
            path:path,
        }
        console.log("content:" + content);
    }

    render() {
        const _update = async (notes, path) => {
            RNFS.writeFile(path, notes, 'utf8')
                .then(() => console.log(path + ": update it !!"))
        }
        return (
            <View>
                <TextInput
                    style={styles.input}
                    value={this.state.notes}
                    onChangeText={text => this.setState({notes: text})}
                    placeholder="Write anything you'd like to note."
                    multiline={true}
                />
                <Button
                    onPress={() => {
                        console.log("notes:" + this.state.notes);
                        _update(this.state.notes, this.state.path);
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
}
const styles = StyleSheet.create({
    BackButton: {
        height: 70,
        width: 90,
    },
    ButtonText: {
        fontSize: 50,
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
