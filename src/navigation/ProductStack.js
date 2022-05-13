import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import Products from '../screens/Products';
import colors from '../styles/Colors';
import Product from '../screens/Product';
import Home from '../screens/Home';
import Search from '../screens/Search';

const Stack = createStackNavigator();

export default function ProductStack() {
  return (
    <Stack.Navigator screenOptions={{ headerTintColor: colors.white, headerStyle: { backgroundColor: colors.black }, cardStyle: { backgroundColor: colors.white}}}>
        <Stack.Screen name="products"
          component={Products}
          options={{ headerShown: false }}
        />
        <Stack.Screen name="product"
          component={Product}
          options={{ title: 'Product information',}}
        />
        <Stack.Screen name="home"
          component={Home}
          options={{ headerShown: false }}
        />
        <Stack.Screen name="search"
          component={Search}
          options={{ headerShown: false }}
        />
    </Stack.Navigator>
  );
}
