import axios from "axios";
import Token from "../../DTO/Token";
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
            });
    } else {
        return axios.get(createUrlWithParameters('/Storages/GetAllStorages', parentStorageId), {headers : header})
        .then(res => {
            const responseData = res.data;
            const storageDtos = responseData.map( (storage) => convertStorageResponseToDto(storage));
            return storageDtos;
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
        });
}

function addNewSubStorage(usrId, tokenString, storageName, currentStorageId){
    if(storageName.length < 1){
        return null;
    }
    const header = { userId: usrId, token: tokenString };
    const storageDto = new Storage(storageName, usrId, null, currentStorageId, null);
    return axios.post(createUrl('/storages'),storageDto, {headers:header})
        .then(res => console.log(res.data));
}

function convertStorageResponseToDto(storage){
    const storageName = storage.storageName;
    const userId = storage.userId;
    const id = storage.id;
    const parentId = storage.parentId;
    const parentName = storage.parentName;
    const storageItems = storage.storageItems;
    const subStoragesIdNameDictionary = storage.subStoragesIdNameDictionary;
    const storageDto = new Storage(storageName, userId, id, parentId, parentName, storageItems, subStoragesIdNameDictionary);
    return storageDto;
}

export {getAllSubStorages, getStorage, addNewSubStorage};