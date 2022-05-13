import { StyleSheet, SafeAreaView, ActivityIndicator , Text } from 'react-native';
import React from 'react';

export default function ScreenLoading(props) {
    const {text, size, color} = props;
  return (
    <SafeAreaView style={styles.container}>
        <ActivityIndicator size={size} color={color} style={styles.loading}/>
        <Text style={styles.title}>{text}</Text>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
    container: {
        flex: 0,
        alignItems: 'center',
        top: "50%",
    },
    title: {
        fontSize: 24,
        color: '#000000'
    },
    loading: {
        marginBottom: 10
    }
});

ScreenLoading.defaultProps = {
    text: 'Loading',
    color: '#000000',
    size: "large"
}