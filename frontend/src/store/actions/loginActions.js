import {
    LOGIN_REQUEST,
    LOGIN_SUCCESS,
    LOGIN_ERROR,
    LOGIN_RESET_ERROR,
    SET_LOGIN,
    STATISTIC_SET_DATA,
} from './index';
import { config } from '../../config';
import axios from 'axios';
import {setLoader} from "./loaderActions";
import {setUser} from "./userActions";
import { errorNotification, successNotification } from './notificationActions';

export const login = (form) => {
    return (dispatch) => {
        dispatch({type: LOGIN_REQUEST});
        dispatch(setLoader(true));
        axios.defaults.headers.common = {
            'App-User-Token': config.UserToken,
        };
        form.append('page_load', true);
        axios.post(config.path + 'api/auth/login', form).then((result) => {
            localStorage.setItem('user-token', result.data.token_type + ' ' + result.data.access_token);

            dispatch({type: LOGIN_SUCCESS});
            if(result.data.statistic){
                dispatch({ type: STATISTIC_SET_DATA, payload: result.data.statistic });
            }
            dispatch(setUser(result.data.user_data.user));
            dispatch(setLoader(false));
        }).catch((error) => {
            dispatch(setLoader(false));
            if(error.response){
                errorNotification(error.response.data.message);
                dispatch({ type: LOGIN_ERROR, payload: error.response.data.message });
            }else if(error.request){
                errorNotification('Неудалось подключиться к серверу. Попробуйте позже.');
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


