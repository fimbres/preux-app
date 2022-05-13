import { API_URL } from "../utils/constants";
import { size } from "lodash";

export async function isFavoriteAPI(auth, idProduct){
    try {
        const url = API_URL + "/favorites?user=" + auth.idUser + "&product=" + idProduct;
        const params = {
            headers: {'Content-Type':'application/json',
            Authorization: 'Bearer ' + auth.token},
        }
        const response = await fetch(url, params);
        const result = await response.json();
        return result;
    } catch (error) {
        console.error(error);
        return null;
    }
}

export async function addFavoriteAPI(auth, idProduct){
    try {
        const url = API_URL + "/favorites";
        const params = {
            method: "POST",
            headers: {'Content-Type':'application/json',
            Authorization: 'Bearer ' + auth.token},
            body: JSON.stringify({ product: idProduct, user: auth.idUser})
        };
        const response = await fetch(url, params);
        const result = await response.json();
        return result;
    } catch (error) {
        console.error(error);
        return null;
    }
}

export async function deleteFavoriteAPI(auth, idProduct){
    try {
        const dataFound = await isFavoriteAPI(auth, idProduct);
        if(size(dataFound) > 0){
            const url = API_URL + "/favorites/"+dataFound[0]?._id;
            const params = {
                method: "DELETE",
                headers: {'Content-Type':'application/json',
                Authorization: 'Bearer ' + auth.token},
            };
            const response = await fetch(url, params);
            const result = await response.json();
            return result;
        }
        else{
            return null;
        }
    } catch (error) {
        console.error(error);
        return null;
    }
}

export async function getFavoriteAPI(auth){
    try {
        const url = API_URL + "/favorites?user="+auth.idUser;
        const params = {
            headers: {'Content-Type':'application/json',
            Authorization: 'Bearer ' + auth.token},
        };
        const response = await fetch(url, params);
        const result = await response.json();
        return result;
    } catch (error) {
        console.error(error);
        return [];
    }
}