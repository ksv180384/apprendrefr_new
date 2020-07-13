import {PROFILE_FORM_REQUEST, PROFILE_FORM_SUCCESS, PROFILE_FORM_ERROR, NOTIFICATION_ERROR_SET_DATA } from './index';
import axios from 'axios';
import { config } from '../../config';
import { setLoader } from "./loaderActions";
import { errorNotification, successNotification } from "./notificationActions";


export const updateProfile = (form, user_id) => {
    axios.defaults.headers.common = {
        'Authorization':localStorage.getItem('user-token'),
        'Accept': 'application/json',
    };
    return (dispatch) => {
        dispatch(setLoader(true));
        dispatch({ type: PROFILE_FORM_REQUEST });
        axios.post(config.path + 'api/user/update/' + user_id, form).then(result => {
            dispatch(setLoader(false));
            dispatch({ type: PROFILE_FORM_SUCCESS });
            successNotification('Профиль успешно обнавлен.');
        }).catch(error => {
            dispatch(setLoader(false));
            dispatch({ type: PROFILE_FORM_ERROR });
            if(error.response){
                let err = error.response.data;
                if(error.response.status === 404){
                    err = 'Неудалось подключиться к серверу. Попробуйте позже.';
                }
                errorNotification(err);
                //dispatch({ type: NOTIFICATION_ERROR_SET_DATA, payload: err });
                //dispatch({ type: PROFILE_FORM_ERROR, payload: error.response.data });
            }else if(error.request){
                errorNotification('Неудалось подключиться к серверу. Попробуйте позже.');
                //dispatch({ type: PROFILE_FORM_ERROR, payload: 'Неудалось подключиться к серверу. Попробуйте позже.' });
                //dispatch({ type: NOTIFICATION_ERROR_SET_DATA, payload: 'Неудалось подключиться к серверу. Попробуйте позже.' });
            }
        });
    }
};