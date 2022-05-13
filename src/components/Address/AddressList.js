import { StyleSheet, Alert, View, Text } from 'react-native';
import React from 'react';
import { Button } from 'react-native-paper';
import { map } from 'lodash';
import colors from '../../styles/Colors';
import { useNavigation } from '@react-navigation/native';
import { deleteAddressAPI } from '../../api/address';
import useAuth from '../../hooks/useAuth';

export default function AddressList(props) {
  const { setReload, addresses } = props;
  const { auth } = useAuth();
  const navigation = useNavigation();
    const deleteAddressAlert = (address) => {
        console.log(address);
        Alert.alert(
            "Delete address",
            "Are you sure you want to delete this address?",
            [
                { text: "No"},
                { text: "Yes", 
                    onPress: () => deleteAddress(auth, address)},
            ],
            { cancelable: false },
        );
    }

    const deleteAddress = async (auth, address) => {
        try {
            await deleteAddressAPI(auth, address);
            setReload(true);
        } catch (error) {
            console.error(error);
        }
    }

    const gotoPage = (idAddress) => {
        navigation.navigate("add-address",{idAddress})
    }

  return (
    <View style={styles.container}>
      {map(addresses, (address) => (
          <View key={address._id} style={styles.address}>
              <Text style={styles.title}>{address.title}</Text>
              <Text>{address.name_lastname}</Text>
              <Text>{address.address}</Text>
              <View style={styles.blockline}>
                <Text>{address.state}, </Text>
                <Text>{address.city}, </Text>
                <Text>{address.postal_code}</Text>
              </View>
              <Text>{address.country}</Text>
              <Text>Phone number: {address.phone}</Text>
              <View style={styles.actions}>
                  <Button mode="contained" color={colors.red} onPress = {()=>deleteAddressAlert(address)}>Delete</Button>
                  <Button mode="contained" color={colors.black} onPress = {() => gotoPage(address._id)}>Edit</Button>
              </View>
          </View>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
    container: {
        marginTop: 50,
    },
    address: {
        borderWidth: 1,
        borderRadius: 5,
        borderColor: '#ddd',
        paddingHorizontal: 15,
        paddingVertical: 15,
        marginBottom: 15,
        width: 300,
    },
    title: {
        fontWeight: "bold",
        paddingBottom: 5
    },
    blockline: {
        flexDirection: "row"
    },
    actions: {
        flexDirection: "row",
        justifyContent: "space-between",
        marginTop: 30,
    }
});