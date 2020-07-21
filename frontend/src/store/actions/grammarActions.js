import {
    ERROR_PAGE,
    GRAMMAR_SET_ITEM,
    GRAMMAR_SET_LIST,
    SET_LOGIN,
    SET_USER,
    STATISTIC_SET_DATA,
    WORD_SET_LIST,
    SET_LOADER_PAGE,
    SET_META, SET_LOADER,
} from './index';
import {config} from "../../config";
import axios from "axios/index";

export const getPage = (path_page) => {
    return (dispatch) => {
        dispatch({ type: SET_LOADER_PAGE, payload: true });
        axios.defaults.headers.common = {
            'Authorization':localStorage.getItem('user-token'),
            'App-User-Token': typeof localStorage.getItem('user-token-page') !== 'undefined' ? localStorage.getItem('user-token-page') : '' ,
        };
        const path = config.path + path_page;
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
            dispatch({
                type: GRAMMAR_SET_LIST,
                payload: result.data.data.grammars_list
            });
            dispatch({
                type: GRAMMAR_SET_ITEM,
                payload: result.data.data.grammar_content
            });
            dispatch({ type: SET_USER, payload: result.data.user });
            dispatch({ type: SET_LOGIN, payload: result.data.auth });
            dispatch({ type: SET_LOADER_PAGE, payload: false });
        }).catch((error) => {
            dispatch({ type: ERROR_PAGE });
            dispatch({ type: SET_LOADER_PAGE, payload: false });
        });
    }
};

export const getPageItem = (path_page) => {
    return (dispatch) => {
        dispatch({ type: SET_LOADER, payload: true });
        axios.defaults.headers.common = {
            'Authorization':localStorage.getItem('user-token'),
            'App-User-Token': typeof localStorage.getItem('user-token-page') !== 'undefined' ? localStorage.getItem('user-token-page') : '' ,
        };
        const path = config.path + path_page;
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

            dispatch({
                type: GRAMMAR_SET_ITEM,
                payload: result.data.data.grammar_content
            });
            dispatch({ type: SET_USER, payload: result.data.user });
            dispatch({ type: SET_LOGIN, payload: result.data.auth });
            dispatch({ type: SET_LOADER, payload: false });
        }).catch((error) => {
            dispatch({ type: ERROR_PAGE });
            dispatch({ type: SET_LOADER_PAGE, payload: false });
        });
    }
};