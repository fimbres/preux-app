import { Alert } from 'react-native';
import React from 'react';
import { List } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';
import useAuth from '../../hooks/useAuth';


export default function Menu() {
    const navigation = useNavigation();
    const { logout } = useAuth();

    const logoutAccount = () => {
        Alert.alert(
            "Log out",
            "Are you sure you want to log out?",
            [{ text: "No" },
            {text: "Yes", onPress: logout}],
            {cancelable: false}
        );
    };
    


  return (
      <>
        <List.Section style={{width: '90%'}}>
            <List.Item
                title="Change your name"
                description="Or your lastname"
                left={(props) => <List.Icon {...props} icon="face"/>}
                onPress={() => navigation.navigate("change-name")}
            />
            <List.Item
                title="Change your email"
                description="Of your account"
                left={(props) => <List.Icon {...props} icon="at"/>}
                onPress={() => navigation.navigate("change-email")}
            />
            <List.Item
                title="Change your username"
                description="Of your account"
                left={(props) => <List.Icon {...props} icon="sim"/>}
                onPress={() => navigation.navigate("change-username")}
            />
            <List.Item
                title="Change your password"
                description="Of your account"
                left={(props) => <List.Icon {...props} icon="key"/>}
                onPress={() => navigation.navigate("change-password")}
            />
            <List.Item
                title="My address"
                description="Check and change your address"
                left={(props) => <List.Icon {...props} icon="home"/>}
                onPress={() => navigation.navigate("addresses")}
            />
            <List.Item
                title="My orders"
                description="Show all the orders registered"
                left={(props) => <List.Icon {...props} icon="cash"/>}
                onPress={() => navigation.navigate("orders")}
            />
            <List.Item
                title="Log out"
                left={(props) => <List.Icon {...props} icon="logout"/>}
                onPress={logoutAccount}
            />
        </List.Section>
    </>
  );
}