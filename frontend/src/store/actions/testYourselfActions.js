import {
    TESTYOURSELF_DATA,
    TESTYOURSELF_ERROR,
    TESTYOURSELF_REQUEST,
    TESTYOURSELF_SUCCESS,
    MODAL_REQUEST,
    MODAL_SUCCESS,
    MODAL_ERROR
} from './index';
import axios from 'axios';
import { config } from '../../config';
import { store as storeNotification } from 'react-notifications-component';

export const loadTestYourselfData = () => {
    return (dispatch) => {
        dispatch({ type: MODAL_REQUEST });
        dispatch({ type: TESTYOURSELF_REQUEST });
        axios.get(config.path + 'api/word/random-test-yourself').then((result) => {
            dispatch({ type: MODAL_SUCCESS });
            dispatch({ type: TESTYOURSELF_SUCCESS, payload: result.data });
        }).catch((error) => {
            dispatch({ type: TESTYOURSELF_ERROR });
            dispatch({ type: MODAL_ERROR });
            storeNotification.addNotification({
                title: 'Ошибка',
                message: 'Ошибка при получении данных. Попробуйте позже.',
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
        });
    }
};