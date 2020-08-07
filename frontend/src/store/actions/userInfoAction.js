import {
    USER_INFO_SET_INFO,
    STATISTIC_SET_DATA,
    SET_META,
    SET_USER,
    ERROR_PAGE,
    SET_LOGIN,
    SET_LOADER_PAGE,
    WORD_SET_LIST, LOAD_PROVERB
} from './index';

import axios from 'axios';
import { config } from '../../config';

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
                type: USER_INFO_SET_INFO,
                payload: result.data.data.user
            });
            dispatch({ type: LOAD_PROVERB, payload: result.data.proverb });
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