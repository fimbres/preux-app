import AsyncStorage from '@react-native-async-storage/async-storage';
import { map, size, filter } from 'lodash';
import { API_URL } from '../utils/constants';

export async function getProductCartAPI(){
    try {
        const cart = await AsyncStorage.getItem("cart");
        if(!cart) return [];
        return JSON.parse(cart);
    } catch (error) {
        console.log(error);
        return null;
    }
}

export async function addProductCartAPI(idProduct, quantity, sizes){
    try {
        const cart = await getProductCartAPI();
        if(!cart) throw "Something went wrong";
        if(size(cart) == 0){
            cart.push({
                idProduct,
                quantity,
                sizes
            });
            console.log("llegó el size", sizes);
        }
        else{
            let found =  false;
            map(cart, (product) => {
                if(idProduct == product.idProduct && sizes == product.sizes){
                    product.quantity += quantity;
                    found = true;
                    return product;
                }
            });
            if(!found){
                cart.push({
                    idProduct,
                    quantity,
                    sizes
                });
            }
        }
        await AsyncStorage.setItem("cart", JSON.stringify(cart));
        return true;
    } catch (error) {
        console.log(error);
        return null;
    }
}

export async function deleteProductCartAPI(idProduct){
    try {
        const cart = await getProductCartAPI();
        const newCart = filter(cart, (product) => {
            return product.idProduct != idProduct;
        });
        await AsyncStorage.setItem("cart", JSON.stringify(newCart));
        return true;
    } catch (error) {
        console.log(error);
        return null;
    }
}

export async function increaseProductCartAPI(idProduct){
    try {
        const cart = await getProductCartAPI();
        map(cart, (product) => {
            if(product.idProduct == idProduct){
                return product.quantity +=1;
            }
        });
        await AsyncStorage.setItem("cart", JSON.stringify(cart));
        return true;
    } catch (error) {
        console.log(error);
        return null;
    }
}

export async function decreaseProductCartAPI(idProduct){
    let isDelete = false;
    try {
        const cart = await getProductCartAPI();
        map(cart, (product) => {
            if(product.idProduct == idProduct){
                if(product.quantity == 1){
                    isDelete = true;
                    return null;
                }
                else{
                    return (product.quantity -= 1);
                }
            }
        });
        if(isDelete){
            await deleteProductCartAPI(idProduct);
        }
        else{
            await AsyncStorage.setItem("cart", JSON.stringify(cart));
        }
        return true;
    } catch (error) {
        console.log(error);
        return null;
    }
}

export async function paymentCartAPI(auth, tokenStripe, products, address){
    try {
        const addressShipping = address;
        delete addressShipping.user;
        delete addressShipping.createdAt;
        const url = API_URL + "/orders";
        const params = {
            method: 'POST',
            headers: {'Content-Type':'application/json',
            Authorization: 'Bearer ' + auth.token},
            body: JSON.stringify({
                tokenStripe,
                products,
                idUser: auth.idUser,
                addressShipping
            })
        };
        const response = await fetch(url, params);
        const result = await response.json();
        return result;
    } catch (error) {
        console.log(error);
        return null;
    }
}

export async function deleteCartAPI(){
    try {
        await AsyncStorage.removeItem("cart");
        return true;
    } catch (error) {
        console.log(error);
        return null;
    }
}