import { View, Text, StyleSheet } from 'react-native';
import React from 'react';

export default function UserInfo(props) {
const {user} = props;

  return (
    <View>
      <Text style={styles.title}>My Account</Text>
        {user.name && user.lastname
            ? <><Text style={styles.fonts}>{'Welcome ' + user.name + ' ' + user.lastname}</Text><Text style={styles.fonts}>{'Email: ' + user.email}</Text><Text style={styles.fonts}>{'Username: ' + user.username}</Text></>
            : <><Text style={styles.fonts}>{'Email: ' + user.email}</Text><Text style={styles.fonts}>{'Username: ' + user.username}</Text></>
        }
    </View>
  );
}

const styles = StyleSheet.create({
    title: {
        fontSize: 26,
        top: 0,
        fontWeight: 'bold',
        textAlign: 'center',
        marginBottom: 13,
    },
    fonts: {
      textAlign: 'center',
      marginBottom: 5,
    }
});