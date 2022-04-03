import axios from "axios";
import Item from "../../DTO/Item";
import Storage from "../../DTO/Storage";
import { createUrlWithParameters , createUrl} from "../../pathHelpers";

function getAllSubStorages(usrId, tokenString, parentStorageId){
    const header = { userId: usrId, token: tokenString };
    if (parentStorageId === null){
        return axios.get(createUrl('/Storages/GetAllStorages/0'), {headers : header})
            .then(res => { 
                const responseData = res.data;
                const storageDtos = responseData.map( (storage) => convertStorageResponseToDto(storage));
                return storageDtos;
            }, error => {
                return null;
            });
    } else {
        return axios.get(createUrlWithParameters('/Storages/GetAllStorages', parentStorageId), {headers : header})
        .then(res => {
            const responseData = res.data;
            const storageDtos = responseData.map( (storage) => convertStorageResponseToDto(storage));
            return storageDtos;
        }, error => {
            return null;
        });
    }
}

function getStorage(usrId, tokenString, storageId){
    const header = { userId: usrId, token: tokenString };
    return axios.get(createUrlWithParameters('/storages', storageId), {headers: header})
        .then(res => {
            const responseData = res.data;
            const storageDto = convertStorageResponseToDto(responseData);
            return storageDto;
        }, error => {
            return null;
        });
}

function addNewSubStorage(usrId, tokenString, storageName, currentStorageId){
    if(storageName.length < 1){
        return null;
    }
    const header = { userId: usrId, token: tokenString };
    const storageDto = new Storage(storageName, usrId, null, currentStorageId, null);
    return axios.post(createUrl('/storages'),storageDto, {headers:header})
        .then(res => {
            const responseData = res.data;
            const storageDto = convertStorageResponseToDto(responseData);
            return storageDto;
        }, error => {
            return null;
        });
}

function getAllItems(usrId, tokenString){
    const header = {userId: usrId, token: tokenString};
    return axios.get(createUrl('/items/GetAll'), {headers: header})
        .then(res => {
            const itemDtos = res.data.map( (item) => convertItemResponseToDto(item));
            return itemDtos;
        }, error => {
            return null;
        })
}

function getAllItemsWithFilter(usrId, tokenString, queryParameters){
    const header = {userId: usrId, token: tokenString}
    queryParameters = queryParameters !== null ? queryParameters : '';

    return axios.get(createUrlWithParameters('/items/GetAll', queryParameters, true), {headers:header})
        .then(res => {
            const itemDtos = res.data.map( (item) => convertItemResponseToDto(item));
            return itemDtos; 
        }, error => {
            return null;
        })
}

function addNewItem(usrId, tokenString, itemDto){
    const header = {userId: usrId, token: tokenString};
    return axios.post(createUrl('/items'), itemDto, {headers: header})
        .then(res => {
            const responseData = res.data;
            return convertItemResponseToDto(responseData);
        }, error => {
            return null;
        })
}

function deleteItem(usrId, tokenString, itemDto){
    const header = {userId: usrId, token: tokenString};
    return axios.post(createUrl('/items/delete'), itemDto, {headers: header})
        .then(res => {
            return res.data;
        }, error => {
            return null;
        })
}

function editItem(usrId, tokenString, itemDto){
    const header = {userId: usrId, token: tokenString};
    return axios.put(createUrl('/items'), itemDto, {headers: header})
        .then(res => {
            const responseData = res.data;
            return convertItemResponseToDto(responseData);
        }, error =>{
            return null;
        })
}

function getItem(usrId, tokenString, itemId){
    const header = {userId: usrId, token: tokenString};
    return axios.get(createUrlWithParameters('/items', itemId), {headers: header})
        .then(res => {
            const responseData = res.data;
            return convertItemResponseToDto(responseData);
        }, error => {
            return null;
        });
}

function getImage(){
    return axios.get("url", 
        {
            responseType: 'arraybuffer'
        }).then(res => {
        return btoa(String.fromCharCode.apply(null, new Uint8Array(res.data)));
    }, error => {
        return null;
    })
}

function b64ImageToBufferArray(base64Image){
    let binaryString = window.atob(base64Image);
    let len = binaryString.length;
    let bytes = new Uint8Array(len);
    for(let i = 0; i < len; i++){
        bytes[i] = binaryString.charCodeAt(i);
    }
    return bytes.buffer;
}

function sendImage(byteArray){
    let xhr = new XMLHttpRequest;
    xhr.open("POST", createUrl('/Items/PostImage'), true);
    xhr.setRequestHeader("Accept", "application/json");
    xhr.setRequestHeader("Content-type", "application/json");
    
    xhr.send(byteArray);
}

function sendImageAxios(b64ImageString){
    let image = {imageData: b64ImageString}
    
    return axios.post(createUrl('/Items/PostImage'), image)
        .then(res => console.log(res.data))

}

function convertStorageResponseToDto(storage){
    const storageName = storage.storageName;
    const userId = storage.userId;
    const id = storage.id;
    const parentId = storage.parentId;
    const parentName = storage.parentName;
    const storageItems = storage.storageItems;
    const subStoragesIdNameDictionary = storage.subStoragesIdNameDictionary;
    return new Storage(storageName, userId, id, parentId, parentName, storageItems, subStoragesIdNameDictionary);;
}

function convertItemResponseToDto(item){
    const itemId = item.id;
    const storageId = item.storageId;
    const title = item.title;
    const serialNumber = item.serialNumber;
    const image = item.image;
    const category = item.category;
    const weightInGrams = item.weightInGrams;
    const amount = item.amount;
    return new Item(storageId, title, itemId, serialNumber, image, category, weightInGrams , amount);

}
export {getAllSubStorages, getStorage, addNewSubStorage, addNewItem, getItem, editItem, deleteItem, getAllItems, getAllItemsWithFilter, getImage, b64ImageToBufferArray, sendImage, sendImageAxios};