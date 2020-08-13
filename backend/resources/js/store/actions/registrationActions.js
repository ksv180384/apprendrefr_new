import {
    REGISTRATION_REQUEST,
    REGISTRATION_SUCCESS,
    REGISTRATION_ERROR,
    REGISTRATION_RESET_DATA,
} from './index';
import axios from 'axios';
import { config } from '../../config';
import { setLoader } from "./loaderActions";
import { successNotification, errorNotification } from "./notificationActions";

export const registrationUser = (form) => {
    return (dispatch) => {
        dispatch(setLoader(true));
        dispatch({ type: REGISTRATION_REQUEST });
        axios.post(config.path + 'api/auth/registration', form).then((result) => {
            dispatch({ type: REGISTRATION_SUCCESS });
            dispatch(setLoader(false));
            successNotification(result.data.message);
        }).catch((error) => {
            dispatch(setLoader(false));
            if(error.response){
                dispatch({ type: REGISTRATION_ERROR });
                errorNotification(error.response.data);
            }else if(error.request){
                dispatch({ type: REGISTRATION_ERROR });
                errorNotification('Неудалось подключиться к серверу. Попробуйте позже.');
            }
        });
    }
};

export const registrationResetData = () => {
    return { type: REGISTRATION_RESET_DATA };
};