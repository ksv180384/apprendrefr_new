import { GET_FOOTER, SET_FOOTER } from './index';

export const getFooter = () => {
    return { type: GET_FOOTER };
};

export const setFooter = (data) => {
    return { type: SET_FOOTER, payload: data }
};