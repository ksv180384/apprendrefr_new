import { SET_PAGE_DATA, GET_PAGE_DATA } from './index';

export const getPageData = () => {
    return { type: GET_PAGE_DATA };
};

export const setPageData = (data) => {
    return { type: SET_PAGE_DATA, payload: data }
};