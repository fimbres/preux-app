import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Dropdown } from 'react-native-material-dropdown-v2-fixed';

export default function Size(props) {
    const {size, setSize} = props;
    const items = [
        {label: 'Extra Small', value: "XS"},
        {label: 'Small', value: "SM"},
        {label: 'Medium', value: "M"},
        {label: 'Large', value: "L"},
        {label: 'Extra Large', value: "XL"},
    ];

  return (
    <View style={{ zIndex: 2 }}>
        <Dropdown
            data={items}
            useNativeDriver={false}
            value={size}
            containerStyle={styles.container}
            itemStyle={styles.item}
            dropdownStyle={styles.dropdown}
            style={styles.dropdown}
            labelStyle={styles.label}
            onChangeText={(value) => setSize(value)}
            label="Select Size"
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