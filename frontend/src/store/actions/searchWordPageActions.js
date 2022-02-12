import axios from 'axios';
import { config } from '../../config';


import {
    SET_LOGIN,
    SET_USER,
    SET_META,
    SEARCH_WORD_PAGE_SET_DATA,
    SET_LOADER_PAGE,
    ERROR_PAGE, WORD_SET_LIST, SET_FOOTER
} from './index';


export const getPage = (search_word, lang = 'fr') => {
    return (dispatch) => {
        dispatch({ type: SET_LOADER_PAGE, payload: true });

        axios.defaults.headers.common = config.headerAuthorizationToken();
        const path = config.path + 'api/word/search-page';
        axios.post(path, { search: search_word, page_load: true, lang: lang }).then((result) => {
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
                type: SEARCH_WORD_PAGE_SET_DATA,
                payload: result.data.data.words
            });
            dispatch({ type: WORD_SET_LIST, payload: result.data.words_list });
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
