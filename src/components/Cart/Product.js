import { View, Text, TextInput, Image, StyleSheet } from 'react-native';
import React from 'react';
import { Button, IconButton } from 'react-native-paper';
import { API_URL } from '../../utils/constants';
import colors from '../../styles/Colors';
import { deleteProductCartAPI, increaseProductCartAPI, decreaseProductCartAPI } from '../../api/cart';

export default function Product(props) {
    const { product, setReloadCart } = props;
    console.log("producto: ", product);
    const calcPrice = (price, discount) => {
        if(!discount) return price;
        const discountAmount = (price * discount) / 100;
        return (price - discountAmount).toFixed(2);
    }

    const deleteProduct = async () => {
        const response = await deleteProductCartAPI(product._id);
        if(response) setReloadCart(true);
    }

    const increaseProduct = async () => {
        const response = await increaseProductCartAPI(product._id);
        if(response) setReloadCart(true);
    }

    const decreaseProduct = async () => {
        const response = await decreaseProductCartAPI(product._id);
        if(response) setReloadCart(true);
    }

  return (
    <View style={styles.product}>
      <View style={styles.containerImage}>
          <Image style={styles.image} source={{ uri: API_URL + product.main_image.url}}/>
      </View>
      <View style={styles.Info}>
          <View>
              <Text numberOfLines={3} lineBreakMode="tail" style={styles.title}>{product.title}</Text>
              <View style={styles.prices}>
                    <Text style={styles.currentPrice}>{calcPrice(product.price, product.discount)} USD</Text>
                    {product.discount && (<Text style={styles.oldPrice}>{product.price} USD</Text>)}
              </View>
                <Text style={styles.currentPrice}>Size: {product.sizes}</Text>
          </View>
          <View style={styles.btnContainer}>
            <View style={styles.selectQuantity}>
                <IconButton color="#fff" icon="plus" size={15} style={styles.btnQuantity} onPress={increaseProduct}/>
                <TextInput style={styles.inputQuantity} value={product.quantity.toString()}/>
                <IconButton color="#fff" icon="minus" size={15} style={styles.btnQuantity} onPress={decreaseProduct}/>
            </View>
            <Button color={colors.red} mode="contained" onPress={deleteProduct}>Delete</Button>
      </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
    product: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 15,
        borderRadius: 5,
        borderWidth: 0.5,
        borderColor: '#dadde1',
        alignSelf: 'center',
    },
    containerImage: {
        width: '40%',
        height: 170,
        backgroundColor: '#ebebeb',
        padding: 5
    },
    image: {
        height: '100%',
        resizeMode: "contain"
    },
    Info: {
        padding: 10,
        width: '60%',
        backgroundColor: '#ebebeb',
        justifyContent: "space-between"
    },
    title: {
        fontSize: 20,
        fontWeight: "bold"
    },
    prices: {
        flexDirection: "row",
        marginTop: 5,
        alignItems: "flex-end"
    },
    currentPrice: {
        fontSize: 18,
        color: "#000"
    },
    oldPrice: {
        fontSize: 13,
        marginLeft: 5,
        color: "#b12704",
        textDecorationLine: "line-through",
    },
    btnContainer: {
        flexDirection: "row",
        justifyContent: "space-between",
        position: "relative",
        width: "100%",
    },
    selectQuantity: {
        flexDirection: "row",
        alignItems: "center",
    },
    btnQuantity: {
        backgroundColor: colors.black,
        borderRadius: 5,
        margin: 0
    },
    inputQuantity: {
        paddingHorizontal: 10,
        fontSize: 16
    }
});