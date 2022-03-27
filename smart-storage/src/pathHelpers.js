const baseApiUrl = 'https://localhost:7138/api';

function createUrl(path){
    return baseApiUrl + path;
}

function createUrlWithParameters(path, parameters){
    return baseApiUrl + path + '/' + parameters;
}
export {createUrl, createUrlWithParameters};