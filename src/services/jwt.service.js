const ID_TOKEN_KEY = "token";
var jwt = require('jsonwebtoken');

export const getToken = () => {
    return localStorage.getItem(ID_TOKEN_KEY);
};

export const saveToken = token => {
    localStorage.setItem(ID_TOKEN_KEY, token);
};

export const destroyToken = () => {
    localStorage.removeItem(ID_TOKEN_KEY);
};

export const getUserUuid = () => {
    try {
        var decoded = jwt.decode(getToken());
        return decoded.user_uuid
    } catch (error) {
        console.log(error)
        return ''
    }
}

export default { getToken, saveToken, destroyToken, getUserUuid };