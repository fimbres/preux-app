import { StyleSheet, View, Text } from 'react-native';
import React from 'react';
import Icon from 'react-native-vector-icons/FontAwesome';

export default function Empty() {
  return (
    <View>
      <Text style={styles.title}>Your cart is empty!</Text>
      <Icon name="shopping-cart" size={150} style={{alignSelf: 'center', paddingTop: 15}}/>
    </View>
  );
}

const styles = StyleSheet.create({
    title: {
        fontSize: 24
    }
})