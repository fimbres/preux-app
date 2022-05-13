import { StyleSheet, View, Text } from 'react-native';
import React, { useState, useCallback } from 'react';
import { useFocusEffect } from '@react-navigation/native';
import { getFavoriteAPI } from '../api/favorite';
import useAuth from '../hooks/useAuth';
import ScreenLoading from '../components/ScreenLoading';
import { size } from 'lodash';
import FavoriteList from '../components/Favorites/FavoriteList';
import Icon from 'react-native-vector-icons/FontAwesome';
import { IconButton } from 'react-native-paper';

export default function Favorite(props) {
    const { setSeeFavorite } = props;
    const [ products, setProducts ] = useState(null);
    const [ reload, setReload ] = useState(false);
    const { auth } = useAuth();

    useFocusEffect(
        useCallback(() => {
            setProducts(null);
            (async() => {
                const response = await getFavoriteAPI(auth);
                setProducts(response);
            })();
            setReload(false);
        }, [reload])
    );
    
    
    return (
        <>
            {!products ? (
                <ScreenLoading />
            ) : size(products) === 0 ? (
                <>
                    <IconButton icon="arrow-left" size={40} onPress={() => setSeeFavorite(false)} style={styles.btn}/>
                    <View>
                        <Text style={styles.title}>Your favorite list is empty!</Text>
                        <Icon name="heart" size={150} style={{alignSelf: 'center', paddingTop: 20}}></Icon>
                    </View>
                </>
                ) : (
                <>
                    <View>
                        <FavoriteList products={products} setReload={setReload} setSeeFavorite={setSeeFavorite}/>
                    </View>
                </>
            )}
        </>
  );
}

const styles = StyleSheet.create({
    title: {
        fontSize: 24,
        textAlign: 'center'
    },
    btn: {
        position: 'absolute',
        top: 0,
        left: 0,
    }
})