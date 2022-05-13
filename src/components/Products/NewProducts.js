import { StyleSheet, View, Text } from 'react-native';
import React, { useState, useEffect } from 'react';
import { getLastProduct } from '../../api/product';
import ListProducts from './ListProducts'
import ScreenLoading from '../ScreenLoading';

export default function NewProducts() {
    const [ products, setProducts ] = useState(null);
    useEffect(() => {
        (async() => {
            const response = await getLastProduct(10);
            setProducts(response);
        })();
    }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>All the products</Text>
      {products ?  
            (<ListProducts products={products}/>) : (<ScreenLoading/>)}
    </View>
  );
}

const styles = StyleSheet.create({
    container: {
        padding: 20,
        marginTop: 20
    },
    title: {
        fontWeight: 'bold',
        fontSize: 24,
    }
});