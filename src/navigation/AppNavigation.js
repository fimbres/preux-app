import { NavigationContainer } from '@react-navigation/native';
import React from 'react';
import { StyleSheet } from 'react-native';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import Home from '../screens/Home';
import Cart from '../screens/Cart';
import AccountStack from '../navigation/AccountStack';
import ProductStack from '../navigation/ProductStack';
import Search from '../screens/Search';
import Icon from 'react-native-vector-icons/FontAwesome';
import Colors from '../styles/Colors';

const Tab = createMaterialBottomTabNavigator();

export default function AppNavigation() {
  return (
    <NavigationContainer>
        <Tab.Navigator barStyle={styles.navigator} initialRouteName="Home" activeColor={Colors.white}>
            <Tab.Screen
                name="Home"
                component={Home}
                options={{
                    title: "Home",
                    tabBarIcon: () => (<Icon name="home" style={styles.icon} />
                    ),
                }}
            />
            <Tab.Screen
                name="Products"
                component={ProductStack}
                options={{
                    title: "Products",
                    tabBarIcon: () => (<Icon name="navicon" style={styles.icon} />
                    ),
                }}
            />
            <Tab.Screen
                name="Search"
                component={Search}
                options={{
                    title: "Search",
                    tabBarIcon: () => (<Icon name="search" style={styles.icon} />
                    ),
                }}
            />
            <Tab.Screen
                name="My Cart"
                component={Cart}
                options={{
                    title: "My Cart",
                    tabBarIcon: () => (<Icon name="shopping-cart" style={styles.icon} />
                    ),
                }}
            />
            <Tab.Screen
                name="Account"
                component={AccountStack}
                options={{
                    title: "Account",
                    tabBarIcon: () => (<Icon name="user" style={styles.icon} />
                    ),
                }}
            />
        </Tab.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
    navigator:{
        backgroundColor: Colors.black,
        borderTopColor: Colors.white,
        borderStyle: "solid",
        borderWidth: 3,
    },
    icon: {
        fontSize: 24,
        color: Colors.white,
    }
})