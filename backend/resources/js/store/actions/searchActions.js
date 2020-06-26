import {SEARCH_REQUEST, SEARCH_SUCCESS, SEARCH_ERROR, SET_LOADER, SEARCH_REMOVE } from './index';
import axios from 'axios';
import { config } from '../../config';

export const loadSearch = (form) => {
    return (dispatch) => {
        dispatch({ type: SET_LOADER, payload: true });
        dispatch({ type: SEARCH_REQUEST });
        axios.post(config.path + 'api/' + form.get('type') + '/search', form).then((result) => {
            dispatch({ type: SET_LOADER, payload: false });
            dispatch({ type: SEARCH_SUCCESS, payload: result.data });
        }).catch((error) => {
            dispatch({ type: SET_LOADER, payload: false });
            if(error.response){
                dispatch({ type: SEARCH_ERROR, payload: error.response.data });
            }else if(error.request){
                dispatch({ type: SEARCH_ERROR, payload: 'Неудалось подключиться к серверу. Попробуйте позже.' });
            }

        });
    }
};

export const removeSearch = () => {
    return { type: SEARCH_REMOVE };
};