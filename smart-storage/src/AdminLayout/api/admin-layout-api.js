import axios from "axios";
import { createUrl, createUrlWithParameters } from "../../pathHelpers";
import User from '../../DTO/User';

function getAllUsers(usrId, tokenString){
    const header = {userId: usrId, token: tokenString}
    return axios.get(createUrl('/users'), {headers: header})
        .then(res => {
            const userDtos = res.data.map((user) => convertUserToDto(user));
            return userDtos;
        }, error => {
            return null;
        })
}

function getUser(usrId, tokenString, requestedUserId){
    const header = {userId: usrId, token: tokenString}
    return axios.get(createUrlWithParameters('/users', requestedUserId), {headers: header})
        .then(res => {
            const userDto = convertUserToDto(res.data);
            return userDto;
        }, error => {
            return null;
        })
}

function getUserItemsCount(usrId, tokenString, requestedUserId){
    const header = {userId: usrId, token: tokenString}
    return axios.get(createUrlWithParameters('/users/GetUserItemsCount', requestedUserId), {headers: header})
        .then(res => {
            return res.data;
        }, error => {
            return null;
        })
}

function getUserStoragesCount(usrId, tokenString, requestedUserId){
    const header = {userId: usrId, token: tokenString}
    return axios.get(createUrlWithParameters('/users/GetUserStoragesCount', requestedUserId), {headers: header})
        .then(res => {
            return res.data;
        }, error => {
            return null;
        })
}

function getUserRootStoragesCount(usrId, tokenString, requestedUserId){
    const header = {userId: usrId, token: tokenString}
    return axios.get(createUrlWithParameters('/users/GetUserRootStoragesCount', requestedUserId), {headers: header})
        .then(res => {
            return res.data;
        }, error => {
            return null;
        })
}

function getStorageWithMaxItems(usrId, tokenString, requestedUserId){
    const header = {userId: usrId, token: tokenString}
    return axios.get(createUrlWithParameters('/users/GetStorageWithMaxItems', requestedUserId), {headers: header})
        .then(res => {
            return res.data;
        }, error => {
            return null;
        })
}

function convertUserToDto(user){
    const id = user.id;
    const nickname = user.nickname;
    const passwordHash = user.passwordHash;
    return new User(nickname, passwordHash, id);
}

export {getAllUsers, getUser, getUserItemsCount, getUserStoragesCount, getUserRootStoragesCount, getStorageWithMaxItems};
