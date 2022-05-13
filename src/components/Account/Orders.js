import { StyleSheet, ScrollView, Text } from 'react-native';
import React, { useState, useCallback } from 'react';
import useAuth from '../../hooks/useAuth';
import { getOrdersAPI } from '../../api/order';
import LoadingScreen from '../ScreenLoading';
import colors from '../../styles/Colors';
import { size } from 'lodash';
import { useFocusEffect } from '@react-navigation/native';
import OrderList from '../Orders/OrderList';

export default function Orders() {
    const [ orders, setOrders ] = useState(null);
    const { auth } = useAuth();

    useFocusEffect(
        useCallback(() => {
            (async() => {
                const response = await getOrdersAPI(auth);
                setOrders(response);
            })();
        }, [])
    );

  return (
    <ScrollView style={styles.container}>
      {!orders ? <LoadingScreen /> : size(orders) == 0 ? <>
        <Text style={styles.title}>You not have any orders!</Text>
      </> : <>
        <Text style={styles.title}>Your orders list</Text>
        <OrderList orders={orders}/>
      </>}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
    container: {
        padding: 20
    },
    title: {
        fontSize: 24
    }
})