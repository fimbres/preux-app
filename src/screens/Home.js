import { StyleSheet, View, Image } from 'react-native';
import React from 'react';
import StatusBar from '../components/StatusBar';
import Banner from '../components/Home/Banner';
import colors from '../styles/Colors';
import logoB from '../../assets/logoB.png';

export default function Home() {
  return (
    <>
      <StatusBar backgroundColor={colors.black} barStyle="light-content"/>
      <View style={styles.container}>
        <Image style={styles.image} source={logoB}/>
        <Banner/>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center', 
        alignItems: 'center',
    },
    image: {
      zIndex: 2,
      width: "80%",
      position: "absolute",
      height: 200,
      top: -30,
      resizeMode: "contain"
    }
});