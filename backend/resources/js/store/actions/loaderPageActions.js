import { GET_LOADER_PAGE, SET_LOADER_PAGE } from './index';

export const getLoaderPage = () => {
    return { type: GET_LOADER_PAGE }
};

export const setLoaderPage = (data) => {
    return { type: SET_LOADER_PAGE, payload: data }
};