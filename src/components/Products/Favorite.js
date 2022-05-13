import { View, StyleSheet } from 'react-native';
import React, { useState, useEffect } from 'react';
import { Button } from 'react-native-paper';
import { isFavoriteAPI, addFavoriteAPI, deleteFavoriteAPI } from '../../api/favorite';
import useAuth from '../../hooks/useAuth';
import { size } from 'lodash';

export default function Favorite(props) {
    const { product } = props;
    const [ isFavorite, setIsFavorite ] = useState(undefined);
    const [ loading, setLoading ] = useState(false);
    const { auth } = useAuth();

    useEffect(() => {
        (async () => {
          const response = await isFavoriteAPI(auth, product._id);
          if(size(response) === 0) setIsFavorite(false);
          else setIsFavorite(true);
        })();
    }, [product])

    const addFavorite = async () => {
      if(!loading){
        setLoading(true);
        try {
          const response = await addFavoriteAPI(auth, product._id);
          setIsFavorite(true);
        } catch (error) {
          console.log(error);
        }
        setLoading(false);
      }
    };

    const deleteFavorite = async () => {
      if(!loading){
        setLoading(true);
        try {
          const response = await deleteFavoriteAPI(auth, product._id);
          setIsFavorite(false);
        } catch (error) {
          console.log(error);
        }
        setLoading(false);
      }
    };

  return (
    <View style={{ zIndex: 1 }}>
      <Button contentStyle={!isFavorite ? styles.btnAdd : styles.btnDelete} mode="contained" labelStyle={styles.btnLabel} style={styles.btn} onPress={() => isFavorite ? deleteFavorite() : addFavorite()} loading={loading}>{isFavorite ? 'Delete from my favorites' : 'Add to my favorites'}</Button>
    </View>
  );
}

const styles = StyleSheet.create({
    btnAdd: {
        backgroundColor: "green",
        paddingVertical: 5,
    },
    btnDelete: {
      backgroundColor: "red",
      paddingVertical: 5,
    },
    btnLabel: {
        fontSize: 15,
    },
    btn: {
        margin: 20,
        width: 300,
        alignSelf: "center",
    }
})