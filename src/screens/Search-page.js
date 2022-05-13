import { StyleSheet, View, Text } from 'react-native';
import React, { useState, useEffect } from 'react';
import { searchProductAPI } from '../api/search';
import { size } from 'lodash';
import ScreenLoading from '../components/ScreenLoading';
import ProductList from '../components/Search/ProductList';

export default function Searchpage(props) {
  const { search, query } = props;
  const [ products, setProducts ] = useState(null);

  useEffect(() => {
    (async () => {
      setProducts(null);
      const response = await searchProductAPI(query);
      setProducts(response);
      console.log(response);
    })();
  }, [query])

  return (
    <>
      {!products ? (<ScreenLoading text="Loading Products"/>) : (
        size(products) === 0 ? (<Text numberOfLines={1} lineBreakMode="tail" style={styles.text}>No results for {query} product!</Text>) : (
          <ProductList products={products}/>
        )
      )}
    </>
  );
}

const styles = StyleSheet.create({
  text: {
    fontSize: 20
  }
})