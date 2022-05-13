import { ScrollView, StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { map } from 'lodash';
import Product from './Product';
import { IconButton } from 'react-native-paper';

export default function FavoriteList(props) {
    const { products, setReload, setSeeFavorite } = props;
  return (
    <View style={styles.container}>
      <IconButton icon="arrow-left" size={40} onPress={() => setSeeFavorite(false)} style={styles.btn}/>
      <ScrollView style={styles.subContainer}>
        <Text style={styles.title}>My Favorite List</Text>
        {map(products, (product) => (
            <Product key={product._id} item={product} setReload={setReload}/>
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
    container: {
        paddingVertical: 20,
        paddingHorizontal: 10,
        width: "100%",
        height: "100%",
    },
    title: {
        fontWeight: 'bold',
        fontSize: 25,
        marginBottom: 5
    },
    btn: {
        position: 'absolute',
        top: 0,
        left: 0,
    },
    subContainer: {
      top: 50,
      marginBottom: 40
    }
})