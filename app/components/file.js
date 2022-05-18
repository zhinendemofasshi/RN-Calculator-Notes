import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, Button, Alert} from 'react-native';
import RNFS from "react-native-fs";

const _create = (notes) => {
    RNFS.mkdir(RNFS.DocumentDirectoryPath + "/mydata");
    RNFS.writeFile(RNFS.DocumentDirectoryPath + "/test.txt", notes, 'utf8')
        .then(() => console.log(RNFS.DocumentDirectoryPath + "/test.txt was created!"))
}

const _read = () => {
    RNFS.readDir(RNFS.DocumentDirectoryPath)
        .then((result) => {
            result.forEach(file => {
                if (file.path.endsWith('.txt')){
                    RNFS.readFile(file.path, 'utf8')
                        .then(content => console.log(content))
                }
            })
        })
}

const NOTE = () => {

  const [notes, setnotes] = useState("");


  return (
      <View>
          <TextInput
              style = {styles.input}
              onChangeText = {notes => setnotes(notes)}
              value = {notes}
              placeholder = "Write anything you'd like to note."
              multiline = {true}
          />
          <Button
              onPress = {() => {_create(notes)}}
              title = "press to create"
          />
          <Button
              onPress = {() => _read()}
              title = "press to read"
          />
      </View>

  );
}
const styles =  StyleSheet.create({
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