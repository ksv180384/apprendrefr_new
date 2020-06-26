import {LOGIN_REQUEST, LOGIN_SUCCESS, LOGIN_ERROR, LOGIN_RESET_ERROR, SET_LOGIN } from './index';
import { config } from '../../config';
import axios from 'axios';
import {setLoader} from "./loaderActions";
import {setUser} from "./userActions";

export const login = (form) => {
    return (dispatch) => {
        dispatch({type: LOGIN_REQUEST});
        dispatch(setLoader(true));
        axios.defaults.headers.common = {
            'App-User-Token': typeof localStorage.getItem('user-token-page') !== 'undefined' ? localStorage.getItem('user-token-page') : '' ,
        };
        form.append('page', true);
        axios.post(config.path + 'api/auth/login', form).then((result) => {
            localStorage.setItem('user-token', result.data.token_type + ' ' + result.data.access_token);

            dispatch({type: LOGIN_SUCCESS});
            dispatch(setUser(result.data.user_data.user));
            dispatch(setLoader(false));
        }).catch((error) => {
            dispatch(setLoader(false));
            if(error.response){
                dispatch({ type: LOGIN_ERROR, payload: error.response.data.message });
            }else if(error.request){
                dispatch({ type: LOGIN_ERROR, payload: 'Неудалось подключиться к серверу. Попробуйте позже.' });
            }
        });

    };
};

export const loginResetError = () => {
    return { type: LOGIN_RESET_ERROR };
};

export const setLogin = (data) => {
    return { type: SET_LOGIN, payload: data };
};


