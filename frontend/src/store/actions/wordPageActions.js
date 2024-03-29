import {
    SET_LOADER_PAGE, ERROR_PAGE, SET_META, SET_USER,
    SET_LOGIN, STATISTIC_SET_DATA, WORD_PAGE_SET_DATA, WORD_SET_LIST, LOAD_PROVERB, SET_FOOTER
} from './index';
import { config } from '../../config';
import axios from 'axios';

// Подгрузка списка слов
export const getPage = (params = {}) => {
    return (dispatch) => {
        dispatch({ type: SET_LOADER_PAGE, payload: true });

        axios.defaults.headers.common = config.headerAuthorizationToken();
        let params_str = params.id + '?page_load=true';
        axios.get(config.path + 'api/word/item-page/' + params_str).then((result) => {
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
            dispatch({ type: WORD_PAGE_SET_DATA, payload: result.data.data.word });
            dispatch({ type: WORD_SET_LIST, payload: result.data.words_list });
            dispatch({ type: SET_USER, payload: result.data.user });
            dispatch({ type: SET_LOGIN, payload: result.data.auth });
            dispatch({ type: STATISTIC_SET_DATA, payload: result.data.statistic });
            dispatch({ type: SET_LOADER_PAGE, payload: false });
            dispatch({ type: SET_FOOTER, payload: result.data.footer });
        }).catch((error) => {
            dispatch({ type: ERROR_PAGE });
            dispatch({ type: SET_LOADER_PAGE, payload: false });
        });
    };
};