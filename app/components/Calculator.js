import React, { useState, Component } from 'react';
import {
    StyleSheet,
    Text,
    View,
    TouchableOpacity,
} from 'react-native';
import { StackNavigator } from 'react-navigation';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Button = (props) => (
    <TouchableOpacity
        onPress={props.onPress}>
        <View style={styles.ButtonContainer}>
            <Text style={styles.ButtonText}>{props.op}</Text>
        </View>
    </TouchableOpacity>
)
class App2 extends React.Component {
    constructor(props) {
        super(props);
        this.onPress = this.onPress.bind(this);
        this.state = {
            fomula: "",
            performan: "",
            ans: "",
            code: "6666",
            num: 0,
        }
        // const {navigate}  = this.props.navigation;
    }
    onPress(op, op2) {
        let tempt = this.state.performan;
        let tempt2 = this.state.fomula;
        tempt += op;
        tempt2 += op2;
        this.setState({
            performan: tempt,
            fomula: tempt2,
        })
    }
    storeData = async (key, value) => {
        try {
            await AsyncStorage.setItem(key, value)
        } catch (e) {
            // saving error
            console.log("StoreItem Error!!!");
        }
    }
    getNum = async () => {//return Number
        try {
            const value = await AsyncStorage.getItem("NUM");

            if (value !== null) {
                // value previously stored
                console.log("GET NUM: " + value);
                this.setState({ num: parseInt(value) });
            }
            else {
                console.log("Num be created by 0!");
                storeData("NUM", "0");
            }
        } catch (e) {
            // error reading value
            console.log("getNum Error!!");
        }
    }

    render() {
        const GoNextPage = async () => {
            var value = await AsyncStorage.getItem("NUM");
            console.log(parseInt(value));
            var flag = 0;
            var arr = [];
            for (var i = 0; i < parseInt(value); i++) {
                flag = 1;
                const now = await AsyncStorage.getItem(i.toString());
                arr.push(now);
                console.log(now);
            }
            if(!flag){
                console.log("Num be created by 0!");
                this.storeData("NUM", "0");
                value = '0'; 
            }
            console.log("NUM : " + value);
            this.props.navigation.navigate("Inner", {
                NUM: parseInt(value),
                ITEM: arr,
            });
            console.log("GET NUM:" + value);

        }
        const clearAll = async () => {
            try {
              await AsyncStorage.clear()
            } catch(e) {
              // clear error
            }
          
            console.log('Done.')
          }          
        return (
            <View style={styles.interface}>
                <View style={styles.inputcontainer}>
                    <Text style={styles.InputText}>
                        计算器
                    </Text>
                    <Text style={styles.InputText}>
                        {this.state.performan}
                    </Text>
                </View>
                {/* <Text style={styles.inputcontainer}>
                    {this.state.fomula}

                </Text> */}
                <View style={styles.OutputContainer}>
                    <Text style={styles.OutputText}>
                        {this.state.ans}
                    </Text>
                </View>
                <View style={styles.RowElement}>
                    <Button
                        op={"AC"}
                        style={styles.ButtonContainer}
                        onPress={() => {
                            this.setState({
                                fomula: "",
                                performan: "",
                                ans: "",
                            })
                        }}
                    />
                    <Button
                        op={"+/-"}
                        style={styles.ButtonContainer}
                        onPress={() => {
                            let toPerforman = this.state.performan;
                            let tocal = this.state.fomula;
                            if (toPerforman[0] === '-' && toPerforman[1] === '(' && toPerforman[toPerforman.length - 1] === ')') {
                                toPerforman = toPerforman.slice(2, -1);
                                tocal = tocal.slice(2, -1);
                            }
                            else {
                                toPerforman = "-(" + toPerforman + ")";
                                tocal = "-(" + tocal + ")";
                            }
                            this.setState({
                                performan: toPerforman,
                                fomula: tocal,
                            })
                        }}
                    />
                    <Button
                        op={"%"}
                        style={styles.ButtonContainer}
                        onPress={() => this.onPress("%", "%")}
                    />
                    <Button
                        op={"÷"}
                        style={styles.ButtonContainer}
                        onPress={() => this.onPress("÷", "/")}
                    />
                </View >
                <View style={styles.RowElement}>
                    <Button
                        op={"7"}
                        style={styles.ButtonContainer}
                        onPress={() => this.onPress("7", "7")}
                    />
                    <Button
                        op={"8"}
                        style={styles.ButtonContainer}
                        onPress={() => this.onPress("8", "8")}
                    />
                    <Button
                        op={"9"}
                        style={styles.ButtonContainer}
                        onPress={() => this.onPress("9", "9")}
                    />
                    <Button
                        op={"×"}
                        style={styles.ButtonContainer}
                        onPress={() => this.onPress("×", "*")}
                    />
                </View>
                <View style={styles.RowElement}>
                    <Button
                        op={"4"}
                        style={styles.ButtonContainer}
                        onPress={() => this.onPress("4", "4")}
                    />
                    <Button
                        op={"5"}
                        style={styles.ButtonContainer}
                        onPress={() => this.onPress("5", "5")}
                    />
                    <Button
                        op={"6"}
                        style={styles.ButtonContainer}
                        onPress={() => this.onPress("6", "6")}
                    />
                    <Button
                        op={"-"}
                        style={styles.ButtonContainer}
                        onPress={() => this.onPress("-", "-")}
                    />
                </View>
                <View style={styles.RowElement}>
                    <Button
                        op={"1"}
                        style={styles.ButtonContainer}
                        onPress={() => this.onPress("1", "1")}
                    />
                    <Button
                        op={"2"}
                        style={styles.ButtonContainer}
                        onPress={() => this.onPress("2", "2")}
                    />
                    <Button
                        op={"3"}
                        style={styles.ButtonContainer}
                        onPress={() => this.onPress("3", "3")}
                    />
                    <Button
                        op={"+"}
                        style={styles.ButtonContainer}
                        onPress={() => this.onPress("+", "+")}
                    />
                </View>
                <View style={styles.RowElement}>
                    <Button
                        op={"0"}
                        style={styles.ButtonContainer}
                        onPress={() => this.onPress("0", "0")}
                    />
                    <Button
                        op={"."}
                        style={styles.ButtonContainer}
                        onPress={() => this.onPress(".", ".")}
                    />
                    <Button
                        op={"="}
                        style={styles.ButtonContainer}
                        onPress={() => {
                            let tempt = this.state.fomula;
                            tempt = eval(tempt);
                            this.setState({
                                ans: tempt,
                            })
                            if (this.state.fomula !== "" && tempt.toString() === this.state.code) {
                                console.log("get code!!");
                                GoNextPage();
                                // clearAll();
                                // AsyncStorage.getItem("NUM")
                                //     .then(value => {
                                //         this.props.navigation.navigate("Inner", {
                                //             NUM: parseInt(value),
                                //         });
                                //         console.log("GET NUM:" + value);
                                //     })
                            }
                        }}
                    />
                    <Button
                        op={"del"}
                        style={styles.ButtonContainer}
                        onPress={() => {

                            let tempt = this.state.fomula;
                            let tempt2 = this.state.performan;
                            if (tempt[0] === '-' && tempt[1] === '(' && tempt[tempt.length - 1] === ')') {
                                tempt = tempt.slice(2, -1);
                                tempt2 = tempt2.slice(2, -1);
                            }
                            else {
                                tempt = tempt.slice(0, -1);
                                tempt2 = tempt2.slice(0, -1);
                            }
                            this.setState({
                                fomula: tempt,
                                performan: tempt2,
                            })
                        }}
                    />
                </View>
            </View>
        )
    }
}
const styles = StyleSheet.create({
    interface: {
        flexDirection: "column",
        flex: 1,
        backgroundColor: "gainsboro",
        justifyContent: "center",
    },
    inputcontainer: {
        height: 40,
        backgroundColor: "white",
        borderColor: 'black',
        color: "black",
        alignItems: "flex-end",
        flex: 2,
        borderWidth: 1,
        borderRadius: 20,
        flexDirection: "column",
    },
    OutputContainer: {
        flex: 1,
        // backgroundColor: "green",
        color: "black",
        backgroundColor: "white",
        borderColor: 'black',
        alignItems: "flex-end",
        fontSize: 30,
        borderWidth: 1,
        borderRadius: 20,
    },
    ButtonContainer: {
        backgroundColor: 'white',
        borderRadius: 20,
        borderWidth: 1,
        borderColor: 'black',
        padding: 1,
        width: 90,
        height: 70,
        margin: 3,
    },
    ButtonText: {
        fontSize: 50,
        color: "black",
        textAlign: "center",
    },
    RowElement: {
        flexDirection: "row",
        justifyContent: "space-between",

        flex: 1,
    },
    InputText: {
        fontSize: 60,
        color: "black",
    },
    OutputText: {
        fontSize: 80,
        color: "black",
    }
});
export default App2;
