import { View, Text } from 'react-native';
import React from 'react';
import { createStackNavigator } from '@react-navigation/stack'
import Account from '../screens/Account/Account';
import ChangeName from '../components/Account/ChangeName';
import Colors from '../styles/Colors';
import ChangeEmail from '../components/Account/ChangeEmail';
import ChangeUsername from '../components/Account/ChangeUsername';
import ChangePassword from '../components/Account/ChangePassword';
import Addresses from '../screens/Account/Addresses';
import AddAddress from '../screens/Account/AddAddress';
import Orders from '../components/Account/Orders';

const Stack = createStackNavigator();

export default function AccountStack() {
  return (
    <Stack.Navigator screenOptions={{headerTintColor: Colors.white, headerStyle: {backgroundColor: Colors.black}}}>
        <Stack.Screen 
            name="account"
            component={ Account }
            options={{
                title: 'My Account',
                headerShown: false,
            }}
        />
        <Stack.Screen 
            name="change-name"
            component={ ChangeName }
            options={{
                title: 'Change my name or lastname'
            }}
        />
        <Stack.Screen 
            name="change-email"
            component={ ChangeEmail }
            options={{
                title: 'Change my email'
            }}
        />
        <Stack.Screen 
            name="change-username"
            component={ ChangeUsername }
            options={{
                title: 'Change my username'
            }}
        />
        <Stack.Screen 
            name="change-password"
            component={ ChangePassword }
            options={{
                title: 'Change my password'
            }}
        />
        <Stack.Screen 
            name="addresses"
            component={ Addresses }
            options={{
                title: 'My Address'
            }}
        />
        <Stack.Screen 
            name="add-address"
            component={ AddAddress }
            options={{
                title: 'My Address'
            }}
        />
        <Stack.Screen 
            name="orders"
            component={ Orders }
            options={{
                title: 'My Orders'
            }}
        />
    </Stack.Navigator>
  );
}
