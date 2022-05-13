import AsyncStorage from '@react-native-async-storage/async-storage';
import { TOKEN } from "../utils/constants";

export async function setTokenAPI(token){
    try{
        await AsyncStorage.setItem(TOKEN, token);
        return true;
    }
    catch(err){
        return false;
    }
}

export async function getTokenAPI(){
    try{
        const token = await AsyncStorage.getItem(TOKEN);
        return token;
    }
    catch{
        return null;
    }
}

export async function deleteTokenAPI(){
    try{
        const token = await AsyncStorage.removeItem(TOKEN);
        return token;
    }
    catch{
        return null;
    }
}