import React, { useState } from 'react';
import {
    View,
    Text,
    TextInput,
    StyleSheet,
    Alert,
    FlatList,
    TouchableOpacity,
} from 'react-native';
import RNFS from "react-native-fs";

const _read = () => {
    RNFS.readDir(RNFS.DocumentDirectoryPath)
        .then((result) => {
            // result.forEach(file => {
            if (file.path.endsWith('.txt')) {
                RNFS.readFile(file.path, 'utf8')
                    .then(content => console.log(content))
            }
            // })
        })
}
const Get_item = (url, n) => {
    target = {
        ad: url,
        name: n,
    }
    return target;
}
const Button = (props) => (
    <TouchableOpacity
        onPress={props.onPress}>
        <View style={props.viewstyle}>
            <Text style={props.textstyle}>{props.content}</Text>
        </View>
    </TouchableOpacity>
)
const ListRowElement = (props) => {
    return (
        <Button
            onPress={props.onPress}
            viewstyle={props.viewstyle}
            textstyle={props.textstyle}
            content={props.name}
        />
    )
}
const Menu = ({ navigation }) => {
    const [item, setitem] = useState([]);
    const [num, setnum] = useState(0);

    const _create = (num) => {
        //according to the num to create a txt file and return the created path 
        RNFS.mkdir(RNFS.DocumentDirectoryPath + "/mydata");
        let path_now = RNFS.DocumentDirectoryPath + "/diary" + num.toString() + ".txt";
        RNFS.writeFile(path_now, "", 'utf8')
            .then(() => console.log(path_now + " was created!"));
        return path_now;
    }
    const Create_onPress = () => {
        //the function will be called when we need to 
        //create a item and turn to the page of diary content
        let path_cur = _create(num), x = num + 1;
        let tempt = item;
        tempt.push(Get_item(path_cur, num.toString()));
        setitem(tempt);//append a new item
        setnum(x);//update the num
        navigation.navigate("Diary", {
            path: path_cur,
        })//go to the content page
    }


    const renderItem = ({ item, index }) => (
        //will be rendered by flatlist conponent
        <ListRowElement
            onPress={() => {
                let path_cur = item[index].path;
                navigation.navigate("Diary", {
                    path: path_cur,
                })
            }}//click to show the content of the diary
            // viewstyle = 
            // textstyle = 
            name={index.toString()}
        />
    )
    return (
        <View style={{ flex: 1 }}>
            <View>
                <Button
                    onPress={() => navigation.navigate('Outer')}
                    content={"<="}
    
                // viewstyle =
                // textstyle = 
                // back to the calculator page
                />

                <Button
                    onPress={Create_onPress}
                    content={"+"}
                // viewstyle =
                // textstyle = 
                // create a new diary
                />

            </View>
            <View>
                <FlatList
                    data={item}
                    renderItem={renderItem}
                />
            </View>
        </View>
    )
}
const styles = StyleSheet.create({
    input: {
        flex: 1,
        height: 200,
        width: 400,
        margin: 12,
        borderWidth: 1,
        padding: 0,
    }
}
)

export default Menu;
