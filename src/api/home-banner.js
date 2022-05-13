import { API_URL } from "../utils/constants";

export async function getBannersAPI(){
    try {
        const url = API_URL + "/home-banners?_sort=position:DESC";
        const response = await fetch(url);
        const result = await response.json();
        return result;
    } catch (error) {
        console.log(error);
        return null;
    }
}