import React, { useState } from 'react';
import {
    View,
    Text,
    StyleSheet,
    FlatList,
    TouchableOpacity,
    Dimensions,
    ImageBackground,
    Image,
} from 'react-native';
import RNFS from "react-native-fs";
import AsyncStorage from '@react-native-async-storage/async-storage';
const Button_width = Dimensions.get('window').width / 2;
const Item_height = Dimensions.get('window').height / 12;
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

function Menu({ route, navigation }) {
    const {NUM} = route.params;
    const {ITEM} = route.params;
    const storeData = async (key, value) => {
        try {
            await AsyncStorage.setItem(key, value);
            console.log("NOW IS STORING " + key  + " is " + value);
        } catch (e) {
            // saving error
            console.log("StoreItem Error!!!");
        }
    }
    const [item, setitem] = useState(ITEM);
    const [num, setnum] = useState(NUM);
    const _create = (num) => {
        //according to the num to create a txt file and return the created path 
        RNFS.mkdir(RNFS.DocumentDirectoryPath + "/mydata");
        let path_now = RNFS.DocumentDirectoryPath + "/diary" + num.toString() + ".txt";
        RNFS.writeFile(path_now, "", 'utf8')
            .then(() => console.log(path_now + " was created!"));
        return path_now;
    }
    const read = (path) => {
        RNFS.readFile(path, 'utf8')
            .then((content) => {
                navigation.navigate("Diary", {
                    path: path,
                    content: content,
                })
            })
    }
    const Create_onPress = () => {
        //the function will be called when we need to 
        //create a item and turn to the page of diary content
        let path_cur = _create(num), x = num + 1;
        let tempt = item, target = path_cur;
        tempt.push(target);
        storeData(num.toString(), path_cur);
        storeData("NUM", x.toString());
        setnum(x);//update the num
        console.log("NUM (set): " + num);
        setitem(tempt);//append a new item
        // console.log(item[0].ad);

        navigation.navigate("Diary", {
            path: path_cur,
            content: "",
        })//go to the content page
    }
    const renderItem = ({ item, index }) => (
        //will be rendered by flatlist conponent
        <ListRowElement
            onPress={() => {
                console.log("Now is reading item:" + item);
                let path_cur = item;
                read(path_cur);
            }}//click to show the content of the diary
            viewstyle={styles.RowItem}
            textstyle={styles.ItemText}
            name={index.toString()}
        />
    )
    const image = { uri: "https://c-ssl.duitang.com/uploads/blog/202102/25/20210225145546_3d5eb.jpeg" }

    return (

        <View style={{ flex: 1 }}>
            <ImageBackground style={{flex: 1}}
                   source={image}
            >
            <View style={{ flexDirection: "row" }}>
                <Button
                    // onPress={() => navigation.navigate('Outer')}
                    content={" "}
                    viewstyle={styles.BlankButton}
                    textstyle={styles.ButtonText}
                    // back to the calculator page
                />

                <Button
                    onPress={Create_onPress}
                    content={"+"}
                    viewstyle={styles.AddButton}
                    textstyle={styles.ButtonText}
                    // create a new diary
                />

            </View>
            <View>
                <FlatList
                    data={item}
                    renderItem={renderItem}
                />
            </View>
            </ImageBackground>
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
        },
        BlankButton: {
            // flex:1,
            height: 70,
            width: Button_width * 1.5,
            // right:0,
        },
        AddButton: {
            // flex:1,
            left: Button_width * 3 / 10,
            height: 70,
            width: Button_width,
        },
        ButtonText: {
            flex: 1,
            fontSize: Button_width / 5,
        },
        RowItem: {
            flex: 1,
            height: Item_height,
            borderColor: "black",

        },
        ItemText: {
            fontSize: Item_height * 4 / 5,

        },
    }
)

export default Menu;