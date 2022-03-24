const baseApiUrl = 'https://localhost:7138/api';

function createUrl(path){
    return baseApiUrl + path;
}

export {createUrl};