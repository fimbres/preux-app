import { StyleSheet, View, Text, Image, TouchableWithoutFeedback } from 'react-native';
import React from 'react';
import { map } from 'lodash';
import { API_URL } from '../../utils/constants';
import { useNavigation } from '@react-navigation/native';

export default function ListProducts(props) {
    const { products } = props;
    const navigation = useNavigation();

    const gotoProduct = (id) => {
        navigation.push("product", {idProduct: id});
    };

  return (
    <View style={styles.container}>
      {map(products, (product) =>(
          <TouchableWithoutFeedback key={product._id} onPress={() => gotoProduct(product._id)}>
              <View style={styles.containerProduct}>
                  <View style={styles.product}>
                      <Image style={styles.image} source={{uri: API_URL + product.main_image.url,}}/>
                      <Text numberOfLines={1} elipsisMode="tail" style={styles.name}>{product.title}</Text>
                  </View>
              </View>
          </TouchableWithoutFeedback>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
    container: {
        marginTop: 10,
        flex: 1,
        flexDirection: 'row',
        flexWrap: 'wrap',
        alignItems: 'flex-start',
    },
    containerProduct:{
        padding: 3,
        width: "50%",
        height: 215,
    },
    product: {
        backgroundColor: "#f0f0f0",
        borderRadius:10,
        padding: 10,
    },
    image: {
        height: 150,
        resizeMode: "contain"
    },
    name: {
        marginTop: 15,
        fontSize: 18,
    }
});