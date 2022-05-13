import { StyleSheet, View, Text } from 'react-native';
import React from 'react';
import { ScrollView } from 'react-native';
import StatusBarCustom from '../components/StatusBar';
import colors from '../styles/Colors';
import NewProducts from '../components/Products/NewProducts';

export default function Products() {
  return (
    <>
      <StatusBarCustom backgroundColor={colors.black} barStyle="light-content"/>
      <ScrollView>
        <NewProducts/>
      </ScrollView>
    </>
  );
}

