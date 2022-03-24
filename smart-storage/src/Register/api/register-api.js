import User from "../../DTO/User";
import axios from 'axios';
import { createUrl } from "../../pathHelpers";

function registerRequest(nickname, password){

    const registerUserDto = new User(nickname, password); 

    return axios.post(createUrl('/registration'), registerUserDto )
        .then( res => {
            const id = res.data.id;
            const nickname = res.data.nickname;
            const password = res.data.password;
            return new User(nickname, password, id);
        });
};

export {registerRequest};