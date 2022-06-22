import axios from "axios";
import { getToken } from "./jwt.service";

const api = axios.create({
    baseURL: "https://api.javain80days.kz/api/v1/",
    // baseURL: "http://185.22.64.36/api/v1/"
});

api.interceptors.request.use((config) => {
    // config.headers = {};
    let token = getToken();
    if (token)
        config.headers["Authorization"] = `Bearer ` + token;
    return config;
})

export { api };