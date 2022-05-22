import React, { useState } from 'react';
import {
    View,
    Text,
    TextInput,
    StyleSheet,
    FlatList,
    TouchableOpacity,
    Dimensions,
} from 'react-native';
import RNFS from "react-native-fs";
const Button_width = Dimensions.get('window').width /2; 
const Item_height = Dimensions.get('window').height / 12;
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
    let target;
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
        let tempt = item, target = path_cur;
        tempt.push(target);
        setitem(tempt);//append a new item
        setnum(x);//update the num
        // console.log(item[0].ad);

        navigation.navigate("Diary", {
            path: path_cur,
        })//go to the content page
    }
    const renderItem = ({ item, index }) => (
        //will be rendered by flatlist conponent
        <ListRowElement
            onPress={() => {
                console.log("Now is reading item:" + item);
                let path_cur = item;
                navigation.navigate("Details", {
                    path: path_cur,
                })
            }}//click to show the content of the diary
            viewstyle = {styles.RowItem}
            textstyle = {styles.ItemText}
            name={index.toString()}
        />
    )
    return (
        <View style={{ flex: 1 }}>
            <View style={{flexDirection:"row"}}>
                <Button
                    onPress={() => navigation.navigate('Calculator')}
                    content={"<="}
                    viewstyle ={styles.BackButton}
                    textstyle ={styles.ButtonText} 
                // back to the calculator page
                />

                <Button
                    onPress={Create_onPress}
                    content={"+"}
                    viewstyle ={styles.AddButton}
                    textstyle ={styles.ButtonText} 
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
    },
    BackButton :{
        // flex:1,
        height:70,
        width:Button_width,
        // right:0,  
    },
    AddButton:{
        // flex:1,
        left:Button_width* 4/5,
        height:70,
        width:Button_width,
    },
    ButtonText:{
        flex:1,
        fontSize:Button_width/5,
    },
    RowItem:{
        flex:1,
        height:Item_height,
    },
    ItemText:{
        fontSize:Item_height * 4/5,

    },
}
)

export default Menu;