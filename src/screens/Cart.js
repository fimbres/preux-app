import { StyleSheet, View, Text, ScrollView } from 'react-native';
import React, { useState, useCallback, useEffect } from 'react';
import Favorite from './Favorite';
import colors from '../styles/Colors';
import { IconButton } from 'react-native-paper';
import { getProductCartAPI } from '../api/cart';
import { useFocusEffect } from '@react-navigation/native';
import { size } from 'lodash';
import Empty from '../components/Cart/Empty';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import ProductList from '../components/Cart/ListProducts';
import { getAddressesAPI } from '../api/address';
import useAuth from '../hooks/useAuth';
import AddressCart from '../components/Cart/AddressCart';
import Payment from '../components/Cart/Payment';

export default function Cart() {
  const [ seeFavorite, setSeeFavorite ] = useState(false);
  const [ cart, setCart ] = useState(null);
  const [ products, setProducts ] = useState(null);
  const [ reloadCart, setReloadCart ] = useState(false);
  const [ addresses, setAddresses ] = useState(null);
  const [ selectedAddress, setSelectedAddress ] = useState(null);
  const [ totalPayment, setTotalPayment ] = useState(null);
  const { auth } = useAuth();

  useFocusEffect(
    useCallback(() => {
      setCart(null);
      setAddresses(null);
      loadCart();
      loadAddresses();
    }, [])
  );

  useEffect(() => {
    if(reloadCart){
      loadCart();
      setReloadCart(false);
    }
  }, [reloadCart]);

  const loadCart = async () => {
    const response = await getProductCartAPI();
    setCart(response);
  }

  const loadAddresses = async () => {
    const response = await getAddressesAPI(auth);
    setAddresses(response);
  }

  return (
    <>
      <View style={styles.container}>
        {seeFavorite ? <Favorite setSeeFavorite={setSeeFavorite}/> : <>
            <IconButton icon="heart" color={colors.black} size={50} onPress = {() => setSeeFavorite(true)} style={styles.btnFavorite}/>
            {size(cart) == 0 ? <>
                <Empty />
            </> : <>
                <KeyboardAwareScrollView extraScrollHeight={25} style={{width: '100%', marginTop: 50}}>
                    <ScrollView style={styles.cartContainer}>
                        <ProductList products={cart} setProducts={setProducts} productsG={products} setReloadCart={setReloadCart} setTotalPayment={setTotalPayment}/>
                        {products && (<Text style={styles.totalPrice}>Total: {totalPayment} USD</Text>)}
                        <AddressCart addresses={addresses} setSelectedAddress={setSelectedAddress} selectedAddress={selectedAddress}/>
                        <Payment selectedAddress={selectedAddress} products={products} totalPayment={totalPayment}/>
                    </ScrollView>
                </KeyboardAwareScrollView>
            </>}
        </>}
      </View>
    </>
  );
}

const styles = StyleSheet.create({
    container: {
      padding: 20,
        flex: 1,
        justifyContent: 'center', 
        alignItems: 'center',
        backgroundColor: "#fff",
        width: '100%',
    },
    btnFavorite: {
      position: 'absolute',
      top: 0,
      right: 0,
    },
    cartContainer: {
      width: '100%',
    },
    totalPrice: {
      textAlign: 'center',
      fontSize: 24,
      marginTop: 13,
    }
});