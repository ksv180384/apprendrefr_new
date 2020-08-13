import {PROFILE_FORM_REQUEST, PROFILE_FORM_SUCCESS, PROFILE_FORM_ERROR, SET_USER, SET_LOADER, LOAD_PAGE} from './index';
import axios from 'axios';
import { config } from '../../config';
import { setLoader } from "./loaderActions";
import { errorNotification, successNotification } from "./notificationActions";


export const updateProfile = (form, user_id) => {
    axios.defaults.headers.common = config.headerAuthorizationToken();
    return (dispatch) => {
        dispatch(setLoader(true));
        dispatch({ type: PROFILE_FORM_REQUEST });
        axios.post(config.path + 'api/user/update/' + user_id, form).then(result => {
            dispatch(setLoader(false));
            dispatch({ type: SET_USER, payload: result.data.data.user });
            dispatch({ type: PROFILE_FORM_SUCCESS });
            successNotification(result.data[0].message);
        }).catch(error => {
            dispatch(setLoader(false));
            dispatch({ type: PROFILE_FORM_ERROR });
            if(error.response){
                let err = error.response.data;
                if(error.response.status === 404){
                    err = 'Неудалось подключиться к серверу. Попробуйте позже.';
                }
                errorNotification(err);
            }else if(error.request){
                errorNotification('Неудалось подключиться к серверу. Попробуйте позже.');
            }
        });
    }
};

export const sendConfirmEmail = () => {
    axios.defaults.headers.common = config.headerAuthorizationToken();

    return (dispatch) => {
        dispatch(setLoader(true));
        axios.post(config.path + 'api/user/send-confirm-email').then((result) => {
            successNotification(result.data.message);
            dispatch(setLoader(false));
        }).catch((error) => {
            let err_text = '';
            if(error.response){
                for(let k in error.response.data){
                    if(Array.isArray(error.response.data[k])){
                        err_text = error.response.data[k][0];
                    }else{
                        err_text = error.response.data[k];
                    }
                    break;
                }
            }
            errorNotification(err_text);
            dispatch(setLoader(false));
        });
    }
};


export const profileChangePassword = (form, callback) => {
    return (dispatch) => {
        dispatch({ type: SET_LOADER, payload: true });
        axios.defaults.headers.common = config.headerAuthorizationToken();
        const path = config.path + 'api/auth/profile-change-password';
        axios.post(path + '?page_load=true', form).then((result) => {
            localStorage.setItem('user-token-page', result.data.UserToken);

            successNotification(result.data.message);
            dispatch({ type: SET_LOADER, payload: false });
            callback(true);
        }).catch((error) => {
            if(error.response){
                errorNotification(error.response.data);
            }else if(error.request){
                errorNotification('Неудалось подключиться к серверу. Попробуйте позже.');
            }
            dispatch({ type: SET_LOADER, payload: false });
            callback(false);
        });
    }
};