import { GET_META, SET_META } from './index';

export const getMeta = () => {
    return { type: GET_META };
};

export const setMeta = (data) => {
    return { type: SET_META, payload: data };
};