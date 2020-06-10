import { GET_WORDS, LOAD_WORDS } from './index';
import { config } from '../../config';
import axios from 'axios';

export const getWords = () => {
    return { type: GET_WORDS }
};

export const loadWords = () => {
    return (dispatch) => {
        axios.get(config.path + 'api/word/random-list').then((result) => {
            dispatch({ type: LOAD_WORDS, payload: result.data });
        }).catch((error) => {
            dispatch({ type: LOAD_WORDS, payload: [], error: 'Ошибка при получении данных.' });
        });
    };
};
