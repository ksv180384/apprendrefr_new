import axios from 'axios';
import { store as storeNotification } from 'react-notifications-component';
import { config } from '../../config';


import { LOAD_PAGE, SET_LOGIN, SET_USER, SET_META, SET_PAGE_DATA, SET_LOADER_PAGE } from './index';


export const getPage = (path_page) => {
    return (dispatch) => {
        dispatch({ type: SET_LOADER_PAGE, payload: true });

        axios.defaults.headers.common = {
            'Authorization':localStorage.getItem('user-token'),
            'App-User-Token': typeof localStorage.getItem('user-token-page') !== 'undefined' ? localStorage.getItem('user-token-page') : '' ,
        };
        axios.post(config.path + path_page, { page: true }).then((result) => {
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
            //dispatch({ type: SET_PAGE_DATA, payload: page_data });
            dispatch({ type: SET_USER, payload: result.data.user });
            dispatch({ type: SET_LOGIN, payload: result.data.auth });
            dispatch({ type: SET_LOADER_PAGE, payload: false });
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
