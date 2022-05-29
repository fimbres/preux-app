import { View, Text, StyleSheet, Image } from 'react-native';
import React, { useState } from 'react';
import { LayoutStyle } from '../styles/Index';
import logo from '../../assets/logo.png';
import RegisterForm from '../components/Auth/RegisterForm';
import LoginForm from '../components/Auth/LoginForm';

export default function Auth() {
  const [showLogin, setShowLogin] = useState(true);
  const changeForm = () => setShowLogin(!showLogin); 

  return (
    <View style = {LayoutStyle.container}>
        <Image style={styles.logo} source={logo} />
        <Text style={styles.textLogo}> Dress like your rule the world. </Text>
          {showLogin ? <LoginForm changeForm={changeForm}/> : <RegisterForm changeForm={changeForm}/>}
    </View>
  );
}

const styles = StyleSheet.create({
    logo: {
        width: 370,
        height: "100%",
        resizeMode: "contain",
        alignSelf: "center",
        top: 50,
        flex: 0.25,
    },
    textLogo: {
        paddingTop: 45,
        fontSize: 20,
        textAlign: "center",
        top: 0,
        flex: 0.2
    }
});