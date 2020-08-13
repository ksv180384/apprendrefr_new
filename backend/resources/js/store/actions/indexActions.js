import axios from 'axios';
import { config } from '../../config';


import {
    SET_LOGIN,
    SET_USER,
    SET_META,
    INDEX_SET_FORUM,
    SET_LOADER_PAGE,
    STATISTIC_SET_DATA,
    WORD_SET_LIST,
    ERROR_PAGE, LOAD_PROVERB
} from './index';


export const getPage = (path_page, params = {}) => {
    return (dispatch) => {
        dispatch({ type: SET_LOADER_PAGE, payload: true });

        axios.defaults.headers.common = config.headerAuthorizationToken();
        const path = config.path + path_page;
        //console.log(params);
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
            dispatch({ type: LOAD_PROVERB, payload: result.data.proverb });
            dispatch({
                type: INDEX_SET_FORUM,
                payload: result.data.data
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
