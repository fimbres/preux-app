import { StyleSheet, ScrollView, View, Text,} from 'react-native';
import React, { useState, useEffect} from 'react';
import { getProduct } from '../api/product';
import StatusBarCustom from '../components/StatusBar';
import ScreenLoading from '../components/ScreenLoading';
import Colors from '../styles/Colors';
import CarousselImages from '../components/Products/CarousselImages';
import Price from '../components/Products/Price';
import Quantity from '../components/Products/Quantity';
import Size from '../components/Products/Size';
import Buy from '../components/Products/Buy';
import Favorite from '../components/Products/Favorite';

export default function product(props) {
    const { route: { params } } = props;
    const [ product, setProduct ] = useState(null);
    const [ images, setImages ] = useState([]);
    const [ quantity, setQuantity ] = useState(1);
    const [ size, setSize ] = useState("");
    useEffect(() => {
        setProduct(null);
        (async () => {
            const response = await getProduct(params.idProduct);
            setProduct(response);
            const ImagesArray = [response.main_image];
            ImagesArray.push(...response.images);
            setImages(ImagesArray);
        })();
    }, [params]);
  return (
    <>
    <StatusBarCustom BackgroundColor={Colors.black} barStyle="light-content"/>
    {!product ? (<ScreenLoading/>) : 
    <ScrollView style={styles.container}>
        <Text style={styles.title}>{product.title}</Text>
            <CarousselImages images={images}/>
        <View style={styles.containerView}>
            <Price price={product.price} discount={product.discount}/>
            <Quantity quantity={quantity} setQuantity={setQuantity}/>
            <Size size={size} setSize={setSize}/>
            <Favorite product={product}/>
            <Buy quantity={quantity} size={size} product={product}/>
        </View>
    </ScrollView>
    }
    </> 
  );
}

const styles = StyleSheet.create({
    container: {
    },
    title: {
        padding: 10,
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 20
    },
    containerView: {
        padding: 20,
    }
})