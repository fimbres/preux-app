import { StyleSheet, View } from 'react-native';
import React, { useState } from 'react';
import DropDownPicker from 'react-native-dropdown-picker';

export default function Quantity(props) {
    const {quantity, setQuantity} = props;
    const [ open , setOpen ] = useState(false);
    const [ value, setValue ] = useState(null);
    const [ items, setItems ] = useState([
        {label: '1', value: 1},
        {label: '2', value: 2},
        {label: '3', value: 3},
        {label: '4', value: 4},
    ]);

  return (
    <View style={{ zIndex: 2 }}>
        <DropDownPicker listMode="SCROLLVIEW"
        defaultValue={quantity}
        open={open}
        items={items}
        value={value}
        setOpen={setOpen}
        setValue={setValue}
        setItems={setItems}
        containerStyle={styles.container}
        itemStyle={styles.item}
        dropdownStyle={styles.dropdown}
        style={styles.dropdown}
        labelStyle={styles.label}
        onChangeValue={(value) => {setQuantity(value);}}
        placeholder="Quantity"
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