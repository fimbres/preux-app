import { StyleSheet, View, Text, TouchableWithoutFeedback } from 'react-native';
import React, { useEffect } from 'react';
import colors from '../../styles/Colors';
import { map } from 'lodash';
import LoadingScreen from '../../components/ScreenLoading';

export default function AddressCart(props) {
    const { addresses, setSelectedAddress, selectedAddress } = props;
    
    useEffect(() => {
        addresses && setSelectedAddress(addresses[0]);
    }, [addresses])

  return (
    <View style={styles.container}>
      <Text style={styles.containerTitle}>Shipping addresses</Text>
      {!addresses ? <LoadingScreen /> : 
      <>
        {map(addresses, (address, id) => (
            <TouchableWithoutFeedback key={id} onPress={() => setSelectedAddress(address)}>
                <View style={[address._id == selectedAddress?._id ? styles.selected : styles.address]}>
                    <Text style={styles.title}>{address.title}</Text>
                    <Text>{address.name_lastname}</Text>
                    <View style={styles.blockline}>
                        <Text>{address.state}</Text>
                        <Text>{address.city}</Text>
                        <Text>{address.postal_code}</Text>
                    </View>
                    <Text>{address.country}</Text>
                    <Text>{address.phone}</Text>
                </View>
            </TouchableWithoutFeedback>
        ))}
      </>
      }
    </View>
  );
}

const styles = StyleSheet.create({
    container: {
        marginTop: 40
    },
    containerTitle: {
        paddingBottom: 10,
        fontSize: 24,
        fontWeight: 'bold'
    },
    address: {
        borderWidth: 0.9,
        borderRadius: 5,
        padding: 15,
        borderColor: '#ddd',
        marginBottom: 15
    },
    title: {
        fontWeight: "bold",
        fontSize: 18,
        paddingBottom: 5
    },
    blockline: {
        flexDirection: "row",
    },
    selected: {
        backgroundColor: colors.green,
        borderWidth: 0.9,
        borderRadius: 5,
        padding: 15,
        borderColor: '#ddd',
        marginBottom: 15,
        opacity: 0.8
    }
})