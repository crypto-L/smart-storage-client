import axios from "axios";
import User from "../../DTO/User";
import Token from "../../DTO/Token";
import { createUrl } from "../../pathHelpers";

function loginRequest(nickname, password) {
    const user = new User(nickname, password);

    return axios.post(createUrl('/login'), user)
    .then(res => {
        if(res.status === 200){
            const userId = res.data.userId;
            const token = res.data.token;
            return new Token(userId, token);
        }
    }, error => {
        console.dir(error.response.status);
        return null;
    });
};

export {loginRequest};