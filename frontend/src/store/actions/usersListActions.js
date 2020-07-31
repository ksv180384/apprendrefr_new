import {
    USERS_LIST_SET_DATA,
    SET_LOADER_PAGE,
    ERROR_PAGE,
    SET_LOGIN,
    WORD_SET_LIST,
    STATISTIC_SET_DATA,
    SET_META,
    SET_USER, FORUM_SET_MESSAGES_LIST
} from './index';

import axios from 'axios';
import { config } from '../../config';


export const getPage = (path_page, params = {}) => {
    return (dispatch) => {
        dispatch({ type: SET_LOADER_PAGE, payload: true });
        axios.defaults.headers.common = {
            'Authorization':localStorage.getItem('user-token'),
            'App-User-Token': config.UserToken,
        };
        const path = config.path + path_page;
        axios.get(path + '?page_load=true&page=' + params.page).then((result) => {
            localStorage.setItem('user-token-page', result.data.UserToken);
            dispatch({
                type: SET_META,
                payload: {
                    description: result.data.description,
                    keywords: result.data.keywords,
                    title: result.data.title,
                }
            });
            dispatch({
                type: USERS_LIST_SET_DATA,
                payload: result.data.data.users
            });
            dispatch({ type: SET_USER, payload: result.data.user });
            dispatch({ type: SET_LOGIN, payload: result.data.auth });
            dispatch({ type: WORD_SET_LIST, payload: result.data.words_list });
            dispatch({ type: SET_LOADER_PAGE, payload: false });
            if(result.data.statistic){
                dispatch({ type: STATISTIC_SET_DATA, payload: result.data.statistic });
            }
        }).catch((error) => {
            dispatch({ type: ERROR_PAGE });
            dispatch({ type: SET_LOADER_PAGE, payload: false });
        });
    }
};

export const loadUsersPaginate = (path_page, params = {}) => {
    return (dispatch) => {
        axios.defaults.headers.common = {
            'Authorization':localStorage.getItem('user-token'),
            'App-User-Token': config.UserToken,
        };
        const path = config.path + path_page;
        axios.get(path+'?page_load=true&page='+params.page).then((result) => {
            localStorage.setItem('user-token-page', result.data.UserToken);
            dispatch({
                type: SET_META,
                payload: {
                    description: result.data.description,
                    keywords: result.data.keywords,
                    title: result.data.title,
                }
            });
            dispatch({
                type: USERS_LIST_SET_DATA,
                payload: result.data.users
            });

        }).catch((error) => {
            dispatch({ type: ERROR_PAGE });
            dispatch({ type: SET_LOADER_PAGE, payload: false });
        });
    }
};