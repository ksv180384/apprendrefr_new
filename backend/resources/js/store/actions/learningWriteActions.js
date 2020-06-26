import { store as storeNotification } from 'react-notifications-component';
import {
    MODAL_REQUEST,
    MODAL_SUCCESS,
    LEARNING_WRITE_DATA,
    LEARNING_WRITE_SET_LOADING
} from './index';
import { config } from '../../config';
import axios from 'axios';

export const loadLearningWriteContent = () => {
    return (dispatch) => {
        dispatch({ type: MODAL_REQUEST });
        axios.get(config.path + 'api/word/random-list').then((result) => {
            dispatch({ type: MODAL_SUCCESS });
            dispatch({ type: LEARNING_WRITE_DATA, payload: result.data });
            dispatch({ type: LEARNING_WRITE_SET_LOADING, payload: true });
        }).catch((error) => {
            storeNotification.addNotification({
                title: 'Ошибка',
                message: 'Ошибка при получении данных.',
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
            //dispatch({ type: MODAL_ERROR, payload: [], error: 'Ошибка при получении данных.' });
        });
    };
};

export const setLoadLearningWrite = (data) => {
    return { type: LEARNING_WRITE_SET_LOADING, payload: data }
};