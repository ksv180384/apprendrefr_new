import axios from 'axios';
import { config } from '../../config';


import {
    SET_LOGIN,
    SET_USER,
    SET_META,
    PRIVACY_POLICY_SET,
    SET_LOADER_PAGE,
    ERROR_PAGE, SET_FOOTER
} from './index';


export const getPage = () => {
    return (dispatch) => {
        dispatch({ type: SET_LOADER_PAGE, payload: true });

        axios.defaults.headers.common = config.headerAuthorizationToken();
        const path = config.path + 'api/info/privacy-policy';
        axios.get(path + '?page_load=true').then((result) => {
            localStorage.setItem('user-token-page', result.data.UserToken);
            dispatch({
                type: SET_META,
                payload: {
                    description: result.data.description,
                    keywords: result.data.keywords,
                    title: result.data.title,
                }
            });
            dispatch({
                type: PRIVACY_POLICY_SET,
                payload: result.data.data.privacy_policy
            });
            dispatch({ type: SET_USER, payload: result.data.user });
            dispatch({ type: SET_LOGIN, payload: result.data.auth });
            dispatch({ type: SET_LOADER_PAGE, payload: false });
            dispatch({ type: SET_FOOTER, payload: result.data.footer });
        }).catch((error) => {
            dispatch({ type: ERROR_PAGE });
            dispatch({ type: SET_LOADER_PAGE, payload: false });
        });
    }
};
