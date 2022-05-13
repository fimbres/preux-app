import AsyncStorage from "@react-native-async-storage/async-storage";
import { size } from "lodash";
import { sortArray } from "../utils/functions";
import { API_URL } from '../utils/constants';

export async function getSearchHistory(){
    try {
        const history = await AsyncStorage.getItem("history");
        if (!history) return [];
        return sortArray(JSON.parse(history));
    } catch (error) {
        console.log(error);
        return [];
    }
}

export async function updateSearchHistory(search){
    const history = await getSearchHistory();
    console.log("tipo de dato query" + typeof search);
    if(size(history) >= 6){
        history.pop();
    }

    history.push({
        search,
        date: new Date()
    });

    await AsyncStorage.setItem("history", JSON.stringify(history));
}

export async function searchProductAPI(query){
    try {
        const url = API_URL + "/products?_q=" + query + "&_limit=10";
        const response = await fetch(url);
        const result = response.json();
        return result;
    } catch (error) {
        console.log(error);
        return null;
    }
}
