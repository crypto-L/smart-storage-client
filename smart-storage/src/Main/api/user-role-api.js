import axios from "axios";
import Token from "../../DTO/Token";
import { createUrl } from "../../pathHelpers";

function isAdminCheckRequest(userId, tokenString) {
    const token = new Token(userId, tokenString);

    return axios.post(createUrl('/login/isAdmin'), token)
    .then(res => {
        if(res.status === 200){
            return res.data;
        }
    }, error => {
        return null;
    });
};

export {isAdminCheckRequest};