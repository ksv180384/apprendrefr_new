import {
    WORDS_PAGE, WORDS_PAGE_POS, WORDS_PAGE_NUM, SET_LOADER_PAGE, ERROR_PAGE, SET_META, SET_USER,
    SET_LOGIN, WORD_SET_LIST, STATISTIC_SET_DATA, SET_LOADER, WORDS_PAGE_SET_LANG, WORDS_PAGE_SET_POS
} from './index';
import { config } from '../../config';
import axios from 'axios';

// Подгрузка списка слов
export const getPage = (params = {}) => {
    return (dispatch) => {
        dispatch({ type: SET_LOADER_PAGE, payload: true });

        axios.defaults.headers.common = {
            'Authorization':localStorage.getItem('user-token'),
            'App-User-Token': config.UserToken,
        };
        let params_str = '?page_load=true';
        if(params.page){
            params_str += '&page=' + params.page;
        }
        if(params.lang){
            params_str += '&lang=' + params.lang;
        }
        if(params.pos){
            params_str += '&pos=' + params.pos;
        }
        axios.get(config.path + 'api/word/list' + params_str).then((result) => {
            localStorage.setItem('user-token-page', result.data.UserToken);
            dispatch({
                type: SET_META,
                payload: {
                    description: result.data.description,
                    keywords: result.data.keywords,
                    title: result.data.title,
                }
            });
            dispatch({ type: WORDS_PAGE, payload: result.data.data });
            if(params.lang){
                dispatch({ type: WORDS_PAGE_SET_LANG, payload: params.lang });
            }
            if(params.pos) {
                dispatch({type: WORDS_PAGE_SET_POS, payload: params.pos});
            }
            dispatch({ type: SET_USER, payload: result.data.user });
            dispatch({ type: SET_LOGIN, payload: result.data.auth });
            dispatch({ type: WORD_SET_LIST, payload: result.data.words_list });
            dispatch({ type: STATISTIC_SET_DATA, payload: result.data.statistic });
            dispatch({ type: SET_LOADER_PAGE, payload: false });
        }).catch((error) => {
            dispatch({ type: ERROR_PAGE });
            dispatch({ type: SET_LOADER_PAGE, payload: false });
        });
    };
};

// Пагинация по странице слов
export const getPagePaginate = (path, params = {}) => {
    return (dispatch) => {
        dispatch({ type: SET_LOADER, payload: true });

        axios.defaults.headers.common = {
            'Authorization':localStorage.getItem('user-token'),
            'App-User-Token': config.UserToken,
        };
        let params_str = '?page_load=true';
        if(params.page){
            params_str += '&page=' + params.page;
        }
        if(params.lang){
            params_str += '&lang=' + params.lang;
        }
        if(params.pos){
            params_str += '&pos=' + params.pos;
        }
        axios.get(config.path + path + params_str).then((result) => {
            localStorage.setItem('user-token-page', result.data.UserToken);
            dispatch({
                type: SET_META,
                payload: {
                    description: result.data.description,
                    keywords: result.data.keywords,
                    title: result.data.title,
                }
            });
            dispatch({ type: WORDS_PAGE, payload: result.data.data });
            if(params.lang){
                dispatch({ type: WORDS_PAGE_SET_LANG, payload: params.lang });
            }
            if(params.pos) {
                dispatch({type: WORDS_PAGE_SET_POS, payload: params.pos});
            }
            dispatch({ type: SET_USER, payload: result.data.user });
            dispatch({ type: SET_LOGIN, payload: result.data.auth });
            dispatch({ type: STATISTIC_SET_DATA, payload: result.data.statistic });
            dispatch({ type: SET_LOADER, payload: false });
        }).catch((error) => {
            dispatch({ type: ERROR_PAGE });
            dispatch({ type: SET_LOADER, payload: false });
        });
    };
};

export const setLang = (lang) => {
    return { type: WORDS_PAGE_SET_LANG, payload: lang }
};