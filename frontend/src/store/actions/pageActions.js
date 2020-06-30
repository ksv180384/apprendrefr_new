import axios from 'axios';
import { store as storeNotification } from 'react-notifications-component';
import { config } from '../../config';


import {
    SET_LOGIN,
    SET_USER,
    SET_META,
    SET_PAGE_DATA,
    SET_LOADER_PAGE,
    STATISTIC_SET_DATA,
    WORD_SET_LIST
} from './index';


export const getPage = (path_page, params = {}) => {
    return (dispatch) => {
        dispatch({ type: SET_LOADER_PAGE, payload: true });

        axios.defaults.headers.common = {
            'Authorization':localStorage.getItem('user-token'),
            'App-User-Token': typeof localStorage.getItem('user-token-page') !== 'undefined' ? localStorage.getItem('user-token-page') : '' ,
        };
        const path = config.path + path_page;
        console.log(params);
        axios.post(path, { page: true, ...params }).then((result) => {
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
                type: SET_PAGE_DATA,
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
            //dispatch({ type: LOAD_PAGE, payload: [], error: 'Ошибка при получении данных.' });
            storeNotification.addNotification({
                title: 'Ошибка',
                message: 'Ошибка при получении данных. Сайт временно не работат.',
                type: "danger",
                insert: "top",
                container: "top-right",
                animationIn: ["animated", "fadeIn"],
                animationOut: ["animated", "fadeOut"],
                dismiss: {
                    duration: 10000,
                    showIcon: true,
                    onScreen: true
                }
            });
            dispatch({ type: SET_LOADER_PAGE, payload: false });
        });
    }
};
