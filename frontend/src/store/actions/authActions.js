import { GET_AUTH, SET_AUTH } from './index';

export const setAuth = (auth) => {
    return { type: SET_AUTH, payload: auth }
};

export const checkAuth = () => {
    return { type: GET_AUTH }
};