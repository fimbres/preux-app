import { StyleSheet, View, Text } from 'react-native';
import React from 'react';

export default function Price(props) {
    const { price, discount } = props;
    const calculate = function(price, discount) {
        if(!discount) return price;
        const discountM = (price * discount) / 100;
        return (price - discountM).toFixed(2);
    };

  return (
    <View>
      {discount && (
          <View style={styles.container}>
              <Text style={styles.text}>Original price: </Text>
              <Text style={[styles.value, styles.oldPrice]}>{price} USD</Text>
          </View>
      )}
      <View style={styles.container}>
          <Text style={styles.text}>Price:</Text>
          <Text style={[styles.value, styles.price]}>{calculate(price, discount)} USD</Text>
      </View>
      {discount && (<View style={styles.container}>
          <Text style={styles.text}>You save </Text>
          <Text style={[styles.value, styles.saving]}>{ ((price * discount) / 100).toFixed(2) } USD ({discount}%)</Text>
      </View>)}
    </View>
  );
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    text: {
        width: '45%',
        fontSize: 20,
        color: '#747474',
        textAlign: 'right',
    },
    value: {
        width: '55%',
        fontSize: 20,
        paddingLeft: 5
    },
    oldPrice:{
        textDecorationLine: 'line-through',
    },
    price: {
        fontSize: 23,
        color: '#bc0e0d'
    },
    saving: {
        color: '#bc0e0d'
    }
})