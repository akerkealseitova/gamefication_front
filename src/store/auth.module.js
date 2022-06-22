import { api as ApiService } from "../services/api.service";
import JwtService from "../services/jwt.service";
import {
    LOGIN,
    LOGOUT,
    REGISTER,
    CHECK_AUTH,
    UPDATE_USER
} from "./actions.type";
import { SET_AUTH, PURGE_AUTH, SET_ERROR } from "./mutations.type";

const state = {
    errors: null,
    user: {},
    isAuthenticated: !!JwtService.getToken()
};

const getters = {};

const actions = {
    [LOGIN](context, credentials) {
        return new Promise((resolve, reject) => {
            ApiService.post("users/login/", credentials)
                .then(({ data }) => {
                    // no user in data, commented for further changes in backend @bekzat
                    // context.commit(SET_AUTH, data.user);
                    context.commit(SET_AUTH, data);
                    resolve(data);
                })
                .catch(({ response }) => {
                    console.log(response.data)
                    reject(response.data)
                });
        });
    },
    [LOGOUT]: {
        root: true,
        handler(context) {
            console.log("LOGOUT")
            context.commit(PURGE_AUTH);
        }
    },
    [REGISTER](context, credentials) {
        return new Promise((resolve, reject) => {
            ApiService.post("users/regist/", credentials)
                .then(({ data }) => {
                    // context.commit(SET_AUTH, data);
                    resolve(data);
                })
                .catch(({ response }) => {
                    console.log(response.data)
                    reject(response.data)
                });
        });
    },
    [CHECK_AUTH](context) {
        if (JwtService.getToken()) {
            // ApiService.setHeader();
            ApiService.post("​/users​/token​/")
                .then(({ data }) => {
                    context.commit(SET_AUTH, data.user);
                })
                .catch(({ response }) => {
                    context.commit(SET_ERROR, response.data.errors);
                });
        } else {
            context.commit(PURGE_AUTH);
        }
    },
    [UPDATE_USER](context, payload) {
        const { email, username, password, image, bio } = payload;
        const user = {
            email,
            username,
            bio,
            image
        };
        if (password) {
            user.password = password;
        }

        return ApiService.put("user", user).then(({ data }) => {
            context.commit(SET_AUTH, data.user);
            return data;
        });
    }
};

const mutations = {
    [SET_ERROR](state, error) {
        state.errors = error;
    },
    [SET_AUTH](state, user) {
        state.isAuthenticated = true;
        state.errors = {};
        // access instead of token, no token key from backend
        JwtService.saveToken(user.access);
    },
    [PURGE_AUTH](state) {
        state.isAuthenticated = false;
        state.user = {};
        state.errors = {};
        JwtService.destroyToken();
    }
};

export default {
    namespaced: true,
    state,
    actions,
    mutations,
    getters
};