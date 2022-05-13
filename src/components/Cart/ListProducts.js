import { StyleSheet, View, Text } from 'react-native';
import React, { useEffect } from 'react';
import { map } from 'lodash';
import ScreenLoading from '../../components/ScreenLoading';
import { getProduct } from '../../api/product';
import Product from './Product';

export default function ListProducts(props) {
    const { products, productsG, setProducts, setReloadCart, setTotalPayment } = props;

    useEffect(() => {
        setProducts(null);
        (async() => {
            const productTemp = [];
            let totalPaymentTemp = 0;
            for await (const product of products) {
                const response = await getProduct(product.idProduct);
                console.log(product.quantity);
                response.quantity = product?.quantity;
                productTemp.push(response);

                totalPaymentTemp += ((calcPrice(response.price, response.discount) * response.quantity).toFixed(2)) * 1;
            }
            setProducts(productTemp);
            setTotalPayment(totalPaymentTemp);
        })();
    }, [products]);

    const calcPrice = (price, discount) => {
        if(!discount) return price;
        const discountAmount = (price * discount) / 100;
        return (price - discountAmount).toFixed(2);
    }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>My Cart</Text>
      {!productsG ? <ScreenLoading/> : map(productsG, (product) => (
          <Product key={product._id} product={product} setReloadCart={setReloadCart}/>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        top: 0,
    },
    container: {
        width: '100%',
    },
    
})