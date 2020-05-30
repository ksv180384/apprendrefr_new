import axios from 'axios';
import { config } from '../../config';

axios.defaults.headers.common = {
    'Authorization':localStorage.getItem('user-token'),
};

import {GET_PAGE, SET_AUTH, SET_USER} from './index';


export const getPage = (path_page) => {
    return (dispatch) => {
        axios.post(config.path + path_page).then((result) => {
            dispatch({
                type: GET_PAGE,
                payload: {
                    description: result.data.description,
                    keywords: result.data.keywords,
                    title: result.data.title,
                 }
            });
            dispatch({ type: SET_USER, payload: result.data.user });
            dispatch({ type: SET_AUTH, payload: result.data.auth });
        });
    }
};
