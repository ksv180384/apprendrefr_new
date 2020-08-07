import {GET_USER, SET_USER, SET_META, SET_PAGE_DATA, SET_LOADER_PAGE, SET_LOADER, SET_LOGIN} from './index';

export const getUser = () => {
    return { type: GET_USER };
};

export const setUser = (data) => {
    return { type: SET_USER, payload: data };
};

import axios from 'axios';
import { config } from '../../config';
import {errorNotification, successNotification} from "./notificationActions";

export const confirmEmail = (token) => {
    return (dispatch) => {
        dispatch({ type: SET_LOADER_PAGE, payload: true });
        axios.defaults.headers.common = config.headerAuthorizationToken();
        const path = config.path + 'api/user/confirm-email/' + token;
        axios.get(path + '?page_load=true').then((result) => {
            localStorage.setItem('user-token-page', result.data.UserToken);
            dispatch({
                type: SET_META,
                payload: {
                    description: result.data.description,
                    keywords: result.data.keywords,
                    title: result.data.title,
                }
            });
            dispatch({ type: SET_USER, payload: result.data.user });
            dispatch({ type: SET_LOGIN, payload: result.data.auth });
            dispatch({ type: SET_PAGE_DATA, payload: result.data.message });
            dispatch({ type: SET_LOADER_PAGE, payload: false });
        }).catch((error) => {
            dispatch({ type: SET_LOADER_PAGE, payload: false });
        });
    }
};

export const lostPassword = (email, callback) => {
    return (dispatch) => {
        dispatch({ type: SET_LOADER, payload: true });
        axios.defaults.headers.common = config.headerAuthorizationToken();
        const path = config.path + 'api/auth/lost-password';
        axios.post(path + '?page_load=true', { email: email }).then((result) => {
            localStorage.setItem('user-token-page', result.data.UserToken);

            successNotification(result.data.message);
            dispatch({ type: SET_LOADER, payload: false });
            callback(true);
        }).catch((error) => {
            if(error.response){
                errorNotification(error.response.data);
            }else if(error.request){
                errorNotification('Неудалось подключиться к серверу. Попробуйте позже.');
            }
            dispatch({ type: SET_LOADER, payload: false });
            callback(false);
        });
    }
};

export const changePassword = (form, callback) => {
    return (dispatch) => {
        dispatch({ type: SET_LOADER, payload: true });
        axios.defaults.headers.common = config.headerAuthorizationToken();
        const path = config.path + 'api/auth/change-password';
        axios.post(path + '?page_load=true', form).then((result) => {
            localStorage.setItem('user-token-page', result.data.UserToken);

            successNotification(result.data.message);
            dispatch({ type: SET_LOADER, payload: false });
            callback(true);
        }).catch((error) => {
            if(error.response){
                errorNotification(error.response.data);
            }else if(error.request){
                errorNotification('Неудалось подключиться к серверу. Попробуйте позже.');
            }
            dispatch({ type: SET_LOADER, payload: false });
            callback(false);
        });
    }
};