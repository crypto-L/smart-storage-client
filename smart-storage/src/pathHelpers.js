const baseApiUrl = 'https://localhost:7138/api';

function createUrl(path){
    return baseApiUrl + path;
}

function createUrlWithParameters(path, parameters, queryStringParameters = false){
    if(queryStringParameters !== true){
        return baseApiUrl + path + '/' + parameters;
    }
    else {
        return baseApiUrl + path + parameters;
    }
    
}
export {createUrl, createUrlWithParameters};