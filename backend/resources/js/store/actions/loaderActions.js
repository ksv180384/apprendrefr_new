import { GET_LOADER, SET_LOADER } from './index';

export const getLoader = () => {
    return { type: GET_LOADER };
};

export const setLoader = (data) => {
    return { type: SET_LOADER, payload: data };
};