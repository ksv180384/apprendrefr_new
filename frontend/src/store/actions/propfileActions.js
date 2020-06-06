import {PROFILE_FORM_REQUEST, PROFILE_FORM_SUCCESS, PROFILE_FORM_ERROR, REGISTRATION_ERROR} from './index';
import axios from 'axios';
import { config } from '../../config';
import {setLoader} from "./loaderActions";


export const updateProfile = (form, user_id) => {
    axios.defaults.headers.common = {
        'Authorization':localStorage.getItem('user-token'),
    };
    return (dispatch) => {
        dispatch(setLoader(true));
        dispatch({ type: PROFILE_FORM_REQUEST });
        axios.post(config.path + 'api/user/update/' + user_id, form).then(result => {
            dispatch(setLoader(false));
            dispatch({ type: PROFILE_FORM_SUCCESS, payload: 'Профиль успешно обнавлен.' });
        }).catch(error => {
            dispatch(setLoader(false));
            if(error.response){
                dispatch({ type: PROFILE_FORM_ERROR, payload: error.response.data });
            }else if(error.request){
                dispatch({ type: PROFILE_FORM_ERROR, payload: 'Неудалось подключиться к серверу. Попробуйте позже.' });
            }
        });
    }
};