import { GET_WORDS, LOAD_WORDS } from './index';
import axios from 'axios';
import { config } from '../../config';

export const getWords = () => {
    return { type: GET_WORDS }
};

export const loadWords = () => {
    return (dispatch) => {
        axios.get(config.path + 'api/word/random-list').then((result) => {
            dispatch({ type: LOAD_WORDS, payload: result.data });
        }).catch((error) => {

        });
    };
};
