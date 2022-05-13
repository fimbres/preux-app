import { API_URL } from "../utils/constants";

export async function getAddressesAPI(auth){
    try{
        const url = API_URL + "/addresses?user=" + auth.idUser;
        const params = { headers: {'Content-Type': 'application/json',
                        Authorization: 'Bearer ' + auth.token}};
        const response = await fetch(url, params);
        const result = await response.json();
        return result;
    }
    catch(err){
        console.log(err);
        return null;
    }
}

export async function getAddressAPI(auth, idAddress){
    try{
        const url = API_URL + "/addresses/" + idAddress;
        const params = { headers: {'Content-Type': 'application/json',
                        Authorization: 'Bearer ' + auth.token}};
        const response = await fetch(url, params);
        const result = await response.json();
        return result;
    }
    catch(err){
        console.log(err);
        return null;
    }
}

export async function addAddressAPI(auth, address){
    try {
        const url = API_URL + "/addresses";
        const params = {
            method: "POST",
            headers: {'Content-Type':'application/json',
                      Authorization: 'Bearer ' + auth.token},
            body: JSON.stringify({user: auth.idUser, ...address})
        };
        const response = await fetch(url, params);
        const result = await response.json();
        return result;
    } catch (error) {
        console.log(error);
        return null;
    }
}

export async function deleteAddressAPI(auth, address){
    try {
        const url = API_URL + "/addresses/" + address._id;
        const params = {
            method: "DELETE",
            headers: {'Content-Type':'application/json',
                      Authorization: 'Bearer ' + auth.token},
            body: JSON.stringify({user: auth.idUser, ...address})
        };
        const response = await fetch(url, params);
        const result = await response.json();
        return result;
    } catch (error) {
        console.log(error);
        return null;
    }
}

export async function updateAddressAPI(auth, address){
    try {
        const url = API_URL + "/addresses/" + address._id;
        const params = {
            method: "PUT",
            headers: {'Content-Type':'application/json',
                      Authorization: 'Bearer ' + auth.token},
            body: JSON.stringify(address)
        };
        const response = await fetch(url, params);
        const result = await response.json();
        return result;
    } catch (error) {
        console.log(error);
        return null;
    }
}