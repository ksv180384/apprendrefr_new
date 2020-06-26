import { LOAD_PROVERB } from './index';
import { config } from '../../config';
import axios from 'axios';

export const loadProverb = () => {
    return (dispatch) => {
        axios.get(config.path + 'api/proverb/random').then(result => {
            dispatch({ type: LOAD_PROVERB, payload: result.data })
        }).catch(error => {

        })
    }
};