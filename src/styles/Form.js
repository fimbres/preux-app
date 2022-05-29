import { StyleSheet } from "react-native";
import { DarkTheme } from "react-native-paper";
import Colors from './Colors';

const formStyles = StyleSheet.create({
    input: {
        marginBottom: 20,
        backgroundColor: Colors.white,
        height: 45,
        width: "100%",
        borderColor: Colors.black,
        borderStyle: "solid",
        borderWidth: 3,
        borderRadius: 10,
    },
    inputDate: {
        width: "34%",
        backgroundColor: Colors.white,
        borderStyle: "solid",
        borderWidth: 3,
        borderRadius: 10,
        borderColor: Colors.black,
        marginRight: 10
    },
    inputCVV: {
        width: "40%",
        backgroundColor: Colors.white,
        borderStyle: "solid",
        borderWidth: 3,
        borderRadius: 10,
        borderColor: Colors.black,
        marginRight: 10
    },
    textFocus:{
        backgroundColor: Colors.black,
        borderColor: Colors.black
    },
    form: {
        width: '100%',
        flex: 1,
    },
    btn: {
        backgroundColor: Colors.black,
        borderColor: Colors.black,
        color: Colors.white,
        borderRadius: 30,
        height: 45,
        width: "100%"
    },
    textBtn:{
        textAlign: "center",
        fontSize: 17,
        marginTop: 15,
    }
});

export default formStyles;