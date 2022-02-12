import {
    ERROR_PAGE,
    GRAMMAR_SET_ITEM,
    GRAMMAR_SET_LIST,
    SET_LOGIN,
    SET_USER,
    SET_LOADER_PAGE,
    SET_META, SET_LOADER,
} from './index';
import {config} from "../../config";
import axios from "axios/index";
import {SET_FOOTER} from "../../../../../frontend/src/store/actions";

export const getPage = (path_page) => {
    return (dispatch) => {
        dispatch({ type: SET_LOADER_PAGE, payload: true });
        axios.defaults.headers.common = config.headerAuthorizationToken();
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
            dispatch({ type: SET_FOOTER, payload: result.data.footer });
        }).catch((error) => {
            dispatch({ type: ERROR_PAGE });
            dispatch({ type: SET_LOADER_PAGE, payload: false });
        });
    }
};

export const getPageItem = (path_page, callback) => {
    return (dispatch) => {
        dispatch({ type: SET_LOADER, payload: true });
        axios.defaults.headers.common = config.headerAuthorizationToken();
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
            callback();
        }).catch((error) => {
            dispatch({ type: ERROR_PAGE });
            dispatch({ type: SET_LOADER_PAGE, payload: false });
            callback();
        });
    }
};
