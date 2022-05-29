import { StyleSheet, View } from 'react-native';
import { Button } from 'react-native-paper';
import React from 'react';
import { addProductCartAPI } from '../../api/cart';
import Toast from 'react-native-root-toast';

export default function Buy(props) {
    const { product, quantity, size } = props;
    const addProduct = async () => {
        const response = await addProductCartAPI(product._id, quantity, size);
        if(response){
            Toast.show("The product was added successfully",
             {position: Toast.positions.CENTER});
        }
        else{
            Toast.show("Something went wrong",
             {position: Toast.positions.CENTER});
        }
    };

  return (
    <Button contentStyle={styles.btnBuy} mode="contained" labelStyle={styles.btnLabel} style={styles.btn} onPress={() => addProduct()}>Add to my cart</Button>
  );
}

const styles = StyleSheet.create({
    btnBuy: {
        backgroundColor: "black",
        paddingVertical: 5,
    },
    btnLabel: {
        fontSize: 18,
    },
    btn: {
        marginTop: 20,
        width: 300,
        alignSelf: "center",
    }
})