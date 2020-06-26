import {
    MODAL_REQUEST,
    MODAL_SUCCESS,
    MODAL_SHOW,
    MODAL_ERROR,
    MODAL_SET_CONTENT,
    MODAL_SET_HEADER
} from './index';

export const modalShow = () => {
    return { type: MODAL_SHOW, payload: true }
};

export const modalHide = () => {
    return { type: MODAL_SHOW, payload: false }
};

export const modalRequest = () => {
    return { type: MODAL_REQUEST }
};

export const modalSuccess = () => {
    return { type: MODAL_SUCCESS }
};

export const modalRequestError = () => {
    return { type: MODAL_ERROR }
};

export const modalSetHeader = (data) => {
    return { type: MODAL_SET_HEADER, payload: data }
};

export const modalSetContent = (data) => {
    return { type: MODAL_SET_CONTENT, payload: data }
};
