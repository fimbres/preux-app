import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Dropdown } from 'react-native-material-dropdown-v2-fixed';

export default function Quantity(props) {
    const {quantity, setQuantity} = props;
    const items = [
        {label: '1', value: 1},
        {label: '2', value: 2},
        {label: '3', value: 3},
        {label: '4', value: 4},
    ];

  return (
    <View style={{ zIndex: 3 }}>
        <Dropdown
            data={items}
            useNativeDriver={false}
            value={quantity}
            containerStyle={styles.container}
            itemStyle={styles.item}
            dropdownStyle={styles.dropdown}
            style={styles.dropdown}
            labelStyle={styles.label}
            onChangeText={(value) => setQuantity(value)}
            label="Select Quantity"
        />
    </View>
  );
}

const styles = StyleSheet.create({
    container: {
        height: 40,
        width: 300,
        margin: 20,
        alignSelf: "center",
    },
    itemStyle: {
        justifyContent: 'flex-start',
    },
    dropdown: {
        backgroundColor: "#fafafa"
    },
    label: {
        color: "#000"
    }
})