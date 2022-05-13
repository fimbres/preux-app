import { StyleSheet, View, Text, Image } from 'react-native';
import React from 'react';
import { API_URL } from '../../utils/constants';

export default function Order(props) {
    const { order } = props;
  return (
    <View style={styles.container}>
      <View style={styles.containerImage}>
          <Image style={styles.image} source={{ uri: API_URL + order.product.main_image.url }}/>
      </View>
      <View style={styles.info}>
          <Text lineBreakMode='tail' numberOfLines={1} style={styles.name}>{order.product.title}</Text>
          <Text>Quantity: { order.quantity }</Text>
          <Text>Total: {order.productPayment} USD</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
    container: {
        borderBottomWidth: 1,
        borderColor: "#ddd",
        marginHorizontal: -20,
        paddingVertical: 5,
        flexDirection: "row",
    },
    containerImage: {
        width: "30%",
        height: 100,
        padding: 10
    },
    image: {
        height: "100%",
        resizeMode: "contain",
    },
    info: {
        width: "70%",
        justifyContent: "space-between",
    },
    name: {
        fontSize: 18,
        fontWeight: "bold",
        marginBottom: 5
    }
})