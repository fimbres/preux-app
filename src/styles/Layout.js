import { StyleSheet } from 'react-native';
import Colors from '../styles/Colors';

const LayoutStyle = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        padding: 20,
        height: '100%',
        top: "50%",
        width: '100%',
        top: 0,
    },
    containerB: {
        flex: 0,
        justifyContent: 'center', 
        alignItems: 'center',
        width: '100%',
        height: '100%',
        backgroundColor: Colors.white
    },
});

export default LayoutStyle;