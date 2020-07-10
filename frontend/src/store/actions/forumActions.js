import {
    FORUM_SET_FORUM,
    FORUM_SET_FORUMS_LIST,
    FORUM_SET_TOPIC,
    FORUM_SET_TOPICS_LIST,
    FORUM_SET_MESSAGES_LIST,
    SET_LOADER_PAGE,
    SET_META,
    SET_USER,
    SET_LOGIN,
    WORD_SET_LIST,
    STATISTIC_SET_DATA,
    ERROR_PAGE_SET_DATA,
    ERROR_SET_DATA
} from './index';

import axios from 'axios';
//import { store as storeNotification } from 'react-notifications-component';
import { config } from '../../config';

export const setForum = (forum) => {
    return { type: FORUM_SET_FORUM, payload: forum }
};

export const setForumList = (forumList) => {
    return { type: FORUM_SET_FORUMS_LIST, payload: forumList }
};

export const setTopic = (topic) => {
    return { type: FORUM_SET_TOPIC, payload: topic }
};

export const setTopicsList = (topicsList) => {
    return { type: FORUM_SET_TOPICS_LIST, payload: topicsList }
};

export const setMessagesList = (messagesList) => {
    return { type: FORUM_SET_MESSAGES_LIST, payload: messagesList }
};

export const loadForumsListPage = (path_page, params = {}) => {
    return (dispatch) => {
        dispatch({ type: SET_LOADER_PAGE, payload: true });
        axios.defaults.headers.common = {
            'Authorization':localStorage.getItem('user-token'),
            'App-User-Token': typeof localStorage.getItem('user-token-page') !== 'undefined' ? localStorage.getItem('user-token-page') : '' ,
        };
        const path = config.path + path_page;
        axios.get(path+'?page_load=true').then((result) => {
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
                type: FORUM_SET_FORUMS_LIST,
                payload: result.data.data
            });
            dispatch({ type: SET_USER, payload: result.data.user });
            dispatch({ type: SET_LOGIN, payload: result.data.auth });
            dispatch({ type: WORD_SET_LIST, payload: result.data.words_list });
            dispatch({ type: SET_LOADER_PAGE, payload: false });
            if(result.data.statistic){
                dispatch({ type: STATISTIC_SET_DATA, payload: result.data.statistic });
            }
        }).catch((error) => {
            dispatch({ type: ERROR_PAGE_SET_DATA });
            dispatch({ type: SET_LOADER_PAGE, payload: false });

        });
    }
};

export const loadTopicsListPage = (path_page, params = {}) => {
    return (dispatch) => {
        dispatch({ type: SET_LOADER_PAGE, payload: true });
        axios.defaults.headers.common = {
            'Authorization':localStorage.getItem('user-token'),
            'App-User-Token': typeof localStorage.getItem('user-token-page') !== 'undefined' ? localStorage.getItem('user-token-page') : '' ,
        };
        const path = config.path + path_page;
        axios.get(path+'?page_load=true').then((result) => {
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
                type: FORUM_SET_FORUM,
                payload: result.data.data.forum
            });
            dispatch({
                type: FORUM_SET_TOPICS_LIST,
                payload: result.data.data.topics
            });
            dispatch({ type: SET_USER, payload: result.data.user });
            dispatch({ type: SET_LOGIN, payload: result.data.auth });
            dispatch({ type: WORD_SET_LIST, payload: result.data.words_list });
            dispatch({ type: SET_LOADER_PAGE, payload: false });
            if(result.data.statistic){
                dispatch({ type: STATISTIC_SET_DATA, payload: result.data.statistic });
            }
        }).catch((error) => {
            dispatch({ type: ERROR_PAGE_SET_DATA });
            dispatch({ type: SET_LOADER_PAGE, payload: false });
        });
    }
};

export const loadMessagesListPage = (path_page, params = {}) => {
    return (dispatch) => {
        dispatch({ type: SET_LOADER_PAGE, payload: true });
        axios.defaults.headers.common = {
            'Authorization':localStorage.getItem('user-token'),
            'App-User-Token': typeof localStorage.getItem('user-token-page') !== 'undefined' ? localStorage.getItem('user-token-page') : '' ,
        };
        const path = config.path + path_page;
        axios.get(path+'?page_load=true&page='+params.page).then((result) => {
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
                type: FORUM_SET_FORUM,
                payload: result.data.data.forum
            });
            dispatch({
                type: FORUM_SET_TOPIC,
                payload: result.data.data.topic
            });
            dispatch({
                type: FORUM_SET_MESSAGES_LIST,
                payload: result.data.data.messages
            });
            dispatch({ type: SET_USER, payload: result.data.user });
            dispatch({ type: SET_LOGIN, payload: result.data.auth });
            dispatch({ type: WORD_SET_LIST, payload: result.data.words_list });
            dispatch({ type: SET_LOADER_PAGE, payload: false });
            if(result.data.statistic){
                dispatch({ type: STATISTIC_SET_DATA, payload: result.data.statistic });
            }
        }).catch((error) => {
            //dispatch({ type: LOAD_PAGE, payload: [], error: 'Ошибка при получении данных.' });
            dispatch({ type: ERROR_PAGE_SET_DATA });
            dispatch({ type: SET_LOADER_PAGE, payload: false });
        });
    }
};

export const loadMessagesPaginate = (path_page, params = {}) => {
    return (dispatch) => {
        axios.defaults.headers.common = {
            'Authorization':localStorage.getItem('user-token'),
            'App-User-Token': typeof localStorage.getItem('user-token-page') !== 'undefined' ? localStorage.getItem('user-token-page') : '' ,
        };
        const path = config.path + path_page;
        axios.get(path+'?page_load=true&page='+params.page).then((result) => {
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
                type: FORUM_SET_MESSAGES_LIST,
                payload: result.data.messages
            });

        }).catch((error) => {
            //dispatch({ type: LOAD_PAGE, payload: [], error: 'Ошибка при получении данных.' });
            dispatch({ type: ERROR_PAGE_SET_DATA });
            dispatch({ type: SET_LOADER_PAGE, payload: false });
        });
    }
};

export const sendMessage = (topic, message) => {
    return (dispatch) => {
        axios.defaults.headers.common = {
            'Authorization': localStorage.getItem('user-token'),
            'App-User-Token': typeof localStorage.getItem('user-token-page') !== 'undefined' ? localStorage.getItem('user-token-page') : '',
        };
        const path = config.path + 'api/forum/send-message';
        axios.post(path, {page_load: true, message: message, topic: topic}).then((result) => {
            localStorage.setItem('user-token-page', result.data.UserToken);

            // меняем url страницы
            let arr_url = window.location.pathname.split('/');
            // Если сообщение находится на новой странице, то меняем url на новую страницу
            if(parseInt(arr_url[(arr_url.length - 1)]) !== parseInt(result.data.messages.current_page)){
                arr_url[(arr_url.length - 1)] = result.data.messages.current_page;
                const new_url = arr_url.join('/');
                window.location.pathname = new_url;
            }else{ // Если сообщение находится на этой же странице, то выводим сообщения текущей страницы
                dispatch({
                    type: FORUM_SET_MESSAGES_LIST,
                    payload: result.data.messages
                });
            }
        }).catch((error) => {
            //dispatch({ type: LOAD_PAGE, payload: [], error: 'Ошибка при получении данных.' });
            dispatch({ type: ERROR_SET_DATA, payload: error.response.data.message[0] });
            dispatch({ type: SET_LOADER_PAGE, payload: false });
        });
    }
};