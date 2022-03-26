import axios from "axios";
import Token from "../../DTO/Token";
import { createUrl } from "../../pathHelpers";

function getAllSubStorages(usrId, tokenString, parentStorageId){
    const header = { userId: usrId, token: tokenString };

    return axios.get(createUrl('/storages'), {headers : header}).then(res => {
        console.log(res.data);
    });
}

export {getAllSubStorages};