import { ScrollView, Image, TouchableWithoutFeedback, StyleSheet, View, Text } from 'react-native';
import React from 'react';
import { map } from 'lodash';
import { Button } from 'react-native-paper';
import { API_URL } from '../../utils/constants';
import colors from '../../styles/Colors';
import { useNavigation } from '@react-navigation/native';

export default function ProductList(props) {
    const { products } = props;
    const navigation = useNavigation();

    const goToProduct = (id) => {
        navigation.navigate("product", { idProduct: id });
    };

    const calPrice = (price, discount) => {
        if(!discount) return price;
        const discountAmount = (price * discount) / 100;
        return (price - discountAmount).toFixed(2);
    };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Results</Text>
      {map(products, (product) => (
          <TouchableWithoutFeedback key={product._id} onPress={() => goToProduct(product._id)}>
              <View style={styles.product}>
                <View style={styles.containerImage}>
                    <Image style={styles.image} source={{ uri: API_URL + product.main_image.url }} />
                </View>
                <View style={styles.Info}>
                    <Text style={styles.name} numberOfLines={3} lineBreakMode="tail">{product.title}</Text>
                    <View style={styles.price}>
                        <Text style={styles.currentPrice}>{calPrice(product.price, product.discount)} USD</Text>
                        {product.discount && (
                            <Text style={styles.oldPrice}>{product.price} USD</Text>
                        )}
                    </View>
                    <Button style={styles.btn} color={colors.black}>See more details</Button>
                </View>
              </View>
          </TouchableWithoutFeedback>
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
    container: {
        padding: 20
    },
    title: {
        fontSize: 23,
        fontWeight: 'bold'
    },
    product: {
        flexDirection: 'row',
        justifyContent: "space-between",
        marginTop: 15,
        borderRadius: 5,
        borderWidth: 0.3,
        borderColor: "#fafafa"
    },
    containerImage: {
        width: "40%",
        height: 200,
        backgroundColor: "#ebebeb",
        borderRadius: 5,
        padding: 5
    },
    image: {
        height: "100%",
        resizeMode: "contain"
    },
    Info: {
        padding: 10,
        width: "60%",
    },
    name: {
        fontSize: 16,
    },
    price: {
        flexDirection: "row",
        alignItems: "flex-end",
        marginTop: 5
    },
    currentPrice: {
        fontSize: 16
    },
    oldPrice: {
        marginLeft: 10,
        fontSize: 14,
        color: "#747474",
        textDecorationLine: "line-through",
    },
    btn: {
        position: "absolute",
        bottom: 1,
        left: 0,
        right: 0,
    }
});