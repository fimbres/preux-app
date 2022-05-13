import { View, StyleSheet, Image, Dimensions, TouchableWithoutFeedback } from 'react-native';
import Carousel, { Pagination } from 'react-native-snap-carousel';
import React, { useState, useEffect } from 'react';
import { size } from 'lodash';
import { getBannersAPI } from '../../api/home-banner';
import { API_URL } from '../../utils/constants';
import { useNavigation } from '@react-navigation/native';

const width = Dimensions.get("window").width;
const height = 700;

export default function Banner() {
    const [ banners, setBanners ] = useState([]);
    const [ activeDot, setActiveDot ] = useState(0);
    const navigation = useNavigation();

    useEffect(() => {
        (async () => {
            const response = await getBannersAPI();
            setBanners(response);
        })();
    },[]);

    if(!banners) return null;

    const renderItem = ({ item }) => {
        return <TouchableWithoutFeedback onPress={() => gotoProduct(item.product._id)}>
                  <Image style={styles.carousel} source={{ uri: API_URL + item.banner.url }} />
               </TouchableWithoutFeedback>
    };

    const gotoProduct = (id) => {
        navigation.navigate("product", {idProduct: id});
    };

  return (
    <View style={styles.container}>
      <Carousel layout={"default"} data={banners} sliderWidth={width} itemWidth={width} renderItem={renderItem} onSnapToItem={(Index) => setActiveDot(Index)}/>
        <Pagination dotsLength={size(banners)} activeDotIndex={activeDot} inactiveDotOpacity={0.6} inactiveDotScale={0.6} containerStyle={styles.dotsContainer} />
    </View>
  );
}

const styles = StyleSheet.create({
    container: {
        zIndex: -1,
        position: 'relative',
    },
    carousel: {
        width,
        height,
        zIndex: -1
    },
    dotsContainer: {
        marginBottom: -10,
    }
})