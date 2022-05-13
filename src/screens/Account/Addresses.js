import { View, Text, StyleSheet, ScrollView, TouchableWithoutFeedback, ActivityIndicator } from 'react-native';
import React, { useState, useCallback } from 'react';
import { IconButton } from 'react-native-paper';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import { getAddressesAPI } from "../../api/address";
import useAuth from '../../hooks/useAuth';
import { size } from 'lodash';
import AddressList from '../../components/Address/AddressList';

export default function Addresses() {
    const { auth } = useAuth();
    const [ reload, setReload ] = useState(false);
    const [ addresses, setAddresses ] = useState(null);
    const navigation = useNavigation();

    useFocusEffect(useCallback(() => {
        setReload(null);
        (async () => {
            const response = await getAddressesAPI(auth);
            setAddresses(response);
            setReload(false);
        })();
    }, [reload]));

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.text}>My Addresses</Text>
        <TouchableWithoutFeedback onPress={() => navigation.navigate("add-address")}>
            <View style={styles.addAddress}>
                <Text style={{textAlignVertical: "center"}}>Add an address</Text>
                <IconButton icon="arrow-right" color="#000000" size={19}/>
            </View>
        </TouchableWithoutFeedback>
        {!addresses ? (
            <ActivityIndicator size="large" color="#000000"/>
        ) : size(addresses) == 0 ? (
            <View style={styles.containerP}>
                <Text style={{fontSize: 16}}>You not have address information registered</Text>
                <IconButton icon="home" color="#000000" size={220}/>
            </View>
        ) : (
            <View style={styles.containerP}>
                <AddressList setReload={setReload} addresses={addresses}/>
            </View>
        )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
    container: {
        padding: 20,
        alignItems: "center"
    },
    containerP: {
        padding: 20,
        marginTop: 20,
        alignItems: "center"
    },
    text: {
        textAlign: 'center',
        fontSize: 24,
        fontWeight: 'bold',
    },
    addAddress: {
        borderColor: "#ddd",
        borderWidth: 1,
        borderRadius: 9,
        paddingHorizontal: 13,
        paddingVertical: 5,
        marginTop: 20,
        flexDirection: "row",
        width: "100%",
        justifyContent: "space-between",
    }
});