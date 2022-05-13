import { View, Text, ActivityIndicator, StyleSheet, Image } from 'react-native';
import React, { useState } from 'react';
import { API_URL } from '../../utils/constants';
import colors from '../../styles/Colors';
import { Button, IconButton } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';
import { deleteFavoriteAPI } from '../../api/favorite';
import useAuth from '../../hooks/useAuth';

export default function Product(props) {
    const { item, setReload } = props;
    const [ loading, setLoading ] = useState(false);
    const navigation = useNavigation();
    const { auth } = useAuth();

    const calcPrice = function(price, discount) {
        if(!discount) return price;
        const discountM = (price * discount) / 100;
        return (price - discountM).toFixed(2);
    };

    const gotoProduct = (id) => {
        navigation.navigate("product", { idProduct: id });
    };

    const deleteFavorite = async (id) => {
        setLoading(true);
        try {
            await deleteFavoriteAPI(auth, id);
            setReload(true);
            setLoading(false);
        } catch (error) {
            console.log(error);
            return null;
        }
    }

  return (
    <View style={styles.product}>
      <View style={styles.containerImage}>
        <Image style={styles.image} source={{ uri: API_URL + item.product.main_image.url}} />
      </View>
      <View style={styles.info}>
          <View>
              <Text numberOfLines={3} lineBreakMode="tail" style={styles.name}>{item.product.title}</Text>
              <View style={styles.price}>
                  <Text style={styles.currentPrice}>{calcPrice(item.product.price, item.product.discount)} USD</Text>
                  {item.product.discount && (<Text style={styles.oldPrice}>{item.product.price} USD</Text>)}
              </View>
          </View>
          <View style={styles.btnContainer}>
            <Button mode="contained" color={colors.black} onPress = {() => gotoProduct(item.product._id)}>
                See more Details
            </Button>
            <IconButton icon="close" color={colors.white} size={16} style={styles.btnDelete} onPress = {() => deleteFavorite(item.product._id)}/>
        </View>
      </View>
      {loading && (
          <View style={styles.loading}>
              <ActivityIndicator size="large" color={colors.white}/>
          </View>
      )}
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
        borderColor: "#ebebeb"
    },
    containerImage: {
        width: '40%',
        height: 200,
        padding: 5,
        backgroundColor: "#ebebeb"
    },
    image: {
        height: '100%',
        resizeMode: "contain"
    },
    info: {
        padding: 10,
        width: '60%',
        justifyContent: "space-between",
    },
    name: {
        fontSize: 20,
        fontWeight: "bold",
    },
    price: {
        flexDirection: "row",
        marginTop: 5,
        alignItems: "flex-end"
    },
    currentPrice: {
        fontSize: 18
    },
    oldPrice: {
        fontSize: 14,
        textDecorationLine: "line-through",
        paddingLeft: 7
    },
    btnContainer: {
        flexDirection: "row",
        justifyContent: "space-between",
        position: "relative",
        width: "100%",
    },
    btnDelete: {
        backgroundColor: colors.red
    },
    loading: {
        backgroundColor: colors.black,
        opacity: 0.4,
        position: "absolute",
        width: "100%",
        height: "100%",
        borderRadius: 5,
        justifyContent: "center",
    }
})