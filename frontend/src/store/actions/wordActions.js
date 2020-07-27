import {WORD_ITEM_ERROR, WORD_ITEM_REQUEST, WORD_ITEM_SUCCESS, WORD_SET_LIST} from './index';
import { config } from '../../config';
import axios from 'axios';

export const setWords = (data) => {
    return { type: WORD_SET_LIST, payload: data }
};

// Подгрузка полной информации о слове
export const loadWord = (id) => {
    return (dispatch) => {
        dispatch({ type: WORD_ITEM_REQUEST });
        axios.get(config.path + 'api/word/item/' + id).then((result) => {
            dispatch({ type: WORD_ITEM_SUCCESS, payload: result.data });
        }).catch((error) => {
            dispatch({ type: WORD_ITEM_ERROR, payload: '',});
        });
    };
};
