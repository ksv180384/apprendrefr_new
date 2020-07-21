import {
    ERROR_PAGE,
    LYRIC_SET_DATA,
    SET_LOGIN,
    SET_USER,
    SET_LOADER_PAGE,
    SET_META,
    WORD_SET_LIST,
    STATISTIC_SET_DATA
} from './index';
import axios from "axios/index";
import {config} from "../../config";

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
                type: LYRIC_SET_DATA,
                payload: result.data.data
            });
            dispatch({ type: WORD_SET_LIST, payload: result.data.words_list });
            dispatch({ type: STATISTIC_SET_DATA, payload: result.data.statistic });
            dispatch({ type: SET_USER, payload: result.data.user });
            dispatch({ type: SET_LOGIN, payload: result.data.auth });
            dispatch({ type: SET_LOADER_PAGE, payload: false });
        }).catch((error) => {
            dispatch({ type: ERROR_PAGE });
            dispatch({ type: SET_LOADER_PAGE, payload: false });
        });
    }
};