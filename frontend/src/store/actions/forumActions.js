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
    FORUM_SEND_MESSAGE_REQUEST,
    FORUM_SET_STATUSES,
    FORUM_SEND_MESSAGE_SUCCESS,
    ERROR_PAGE, FORUM_CREATE_THEM_REQUEST, FORUM_CREATE_THEM_SUCCESS, SET_LOADER, LOAD_PROVERB, SET_FOOTER
} from './index';

import axios from 'axios';
import { errorNotification, successNotification } from "./notificationActions";
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
        axios.defaults.headers.common = config.headerAuthorizationToken();
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
            dispatch({ type: LOAD_PROVERB, payload: result.data.proverb });
            dispatch({ type: SET_USER, payload: result.data.user });
            dispatch({ type: SET_LOGIN, payload: result.data.auth });
            dispatch({ type: WORD_SET_LIST, payload: result.data.words_list });
            dispatch({ type: SET_LOADER_PAGE, payload: false });
            if(result.data.statistic){
                dispatch({ type: STATISTIC_SET_DATA, payload: result.data.statistic });
            }
            dispatch({ type: SET_FOOTER, payload: result.data.footer });
        }).catch((error) => {
            dispatch({ type: ERROR_PAGE });
            dispatch({ type: SET_LOADER_PAGE, payload: false });

        });
    }
};

export const loadTopicsListPage = (path_page, params = {}) => {
    return (dispatch) => {
        dispatch({ type: SET_LOADER_PAGE, payload: true });
        axios.defaults.headers.common = config.headerAuthorizationToken();
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
                type: FORUM_SET_STATUSES,
                payload: result.data.data.statuses
            });
            dispatch({
                type: FORUM_SET_TOPICS_LIST,
                payload: result.data.data.topics
            });
            dispatch({ type: LOAD_PROVERB, payload: result.data.proverb });
            dispatch({ type: SET_USER, payload: result.data.user });
            dispatch({ type: SET_LOGIN, payload: result.data.auth });
            dispatch({ type: WORD_SET_LIST, payload: result.data.words_list });
            dispatch({ type: SET_LOADER_PAGE, payload: false });
            if(result.data.statistic){
                dispatch({ type: STATISTIC_SET_DATA, payload: result.data.statistic });
            }
            dispatch({ type: SET_FOOTER, payload: result.data.footer });
        }).catch((error) => {
            dispatch({ type: ERROR_PAGE });
            dispatch({ type: SET_LOADER_PAGE, payload: false });
        });
    }
};

export const loadMessagesListPage = (path_page, params = {}) => {
    return (dispatch) => {
        dispatch({ type: SET_LOADER_PAGE, payload: true });
        axios.defaults.headers.common = config.headerAuthorizationToken();
        let show_hide_mess = '';
        if (localStorage.getItem('show_hidden_message') === '1') {
            show_hide_mess = '&show_hide_mess=show';
        }
        const path = config.path + path_page;
        axios.get(path+'?page_load=true&page='+params.page + show_hide_mess).then((result) => {
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
            dispatch({ type: LOAD_PROVERB, payload: result.data.proverb });
            dispatch({ type: SET_USER, payload: result.data.user });
            dispatch({ type: SET_LOGIN, payload: result.data.auth });
            dispatch({ type: WORD_SET_LIST, payload: result.data.words_list });
            if(result.data.statistic){
                dispatch({ type: STATISTIC_SET_DATA, payload: result.data.statistic });
            }
            dispatch({ type: SET_FOOTER, payload: result.data.footer });
            dispatch({ type: SET_LOADER_PAGE, payload: false });
        }).catch((error) => {
            dispatch({ type: ERROR_PAGE });
            dispatch({ type: SET_LOADER_PAGE, payload: false });
        });
    }
};

export const loadMessagesPaginate = (path_page, params = {}) => {
    return (dispatch) => {
        dispatch({ type: SET_LOADER, payload: true });
        axios.defaults.headers.common = config.headerAuthorizationToken();
        let show_hide_mess = '';
        if (localStorage.getItem('show_hidden_message') === '1') {
            show_hide_mess = '&show_hide_mess=show';
        }
        const path = config.path + path_page;
        axios.get(path+'?page_load=true&page=' + params.page + show_hide_mess).then((result) => {
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
            dispatch({ type: SET_LOADER, payload: false });
        }).catch((error) => {
            dispatch({ type: ERROR_PAGE });
            dispatch({ type: SET_LOADER_PAGE, payload: false });
        });
    }
};

export const sendMessage = (topic = 0, message, callback) => {
    return (dispatch) => {
        dispatch({ type: FORUM_SEND_MESSAGE_REQUEST });
        dispatch({ type: SET_LOADER, payload: true });
        axios.defaults.headers.common = config.headerAuthorizationToken();

        let show_hide_mess = 'hide';
        if (localStorage.getItem('show_hidden_message') === '1') {
            show_hide_mess = 'show';
        }
        const path = config.path + 'api/forum/send-message';
        axios.post(path, {page_load: true, message: message, show_hide_mess: show_hide_mess, topic: topic}).then((result) => {
            localStorage.setItem('user-token-page', result.data.UserToken);

            // меняем url страницы
            let arr_url = window.location.pathname.split('/');
            const page_num = arr_url[(arr_url.length - 2)] === 'page' ? parseInt(arr_url[(arr_url.length - 1)]) : 0;
            // Если сообщение находится на новой странице, то меняем url на новую страницу
            if(page_num !== 0 && page_num !== parseInt(result.data.messages.current_page)){
                if(arr_url[(arr_url.length - 2)] === 'page'){
                    arr_url[(arr_url.length - 1)] = result.data.messages.current_page;
                }else{
                    arr_url[(arr_url.length)] = 'page';
                    arr_url[(arr_url.length)] = result.data.messages.current_page;
                }

                const new_url = arr_url.join('/');
                window.location.pathname = new_url;
            }else{ // Если сообщение находится на этой же странице, то выводим сообщения текущей страницы
                dispatch({
                    type: FORUM_SET_MESSAGES_LIST,
                    payload: result.data.messages
                });
            }
            dispatch({ type: FORUM_SEND_MESSAGE_SUCCESS });
            dispatch({ type: SET_LOADER, payload: false });
            callback(true);
        }).catch((error) => {
            let err_text = '';
            if(error.response){
                for(let k in error.response.data){
                    if(Array.isArray(error.response.data[k])){
                        err_text = error.response.data[k][0];
                    }else{
                        err_text = error.response.data[k];
                    }
                    break;
                }
            }
            errorNotification(err_text);
            dispatch({ type: FORUM_SEND_MESSAGE_SUCCESS });
            dispatch({ type: SET_LOADER, payload: false });
            callback(false);
        });
    }
};

export const hideMessage = (message_id, callback) => {
    return (dispatch) => {
        dispatch({ type: SET_LOADER, payload: true });
        axios.defaults.headers.common = config.headerAuthorizationToken();

        let show_hide_mess = 'hide';
        if (localStorage.getItem('show_hidden_message') === '1') {
            show_hide_mess = 'show';
        }
        const path = config.path + 'api/forum/message/hide';
        axios.post(path, {page_load: true, message_id: message_id, show_hide_mess: show_hide_mess, _method: 'PATCH' }).then((result) => {
            localStorage.setItem('user-token-page', result.data.UserToken);

            dispatch({type: FORUM_SET_MESSAGES_LIST, payload: result.data.messages});
            dispatch({ type: SET_LOADER, payload: false });
            callback(true);
        }).catch((error) => {
            let err_text = '';
            if(error.response.data){
                for(let k in error.response.data){
                    err_text = Array.isArray(error.response.data[k][0]) ? error.response.data[k][0] : error.response.data[k];
                }
            }
            errorNotification(err_text);
            dispatch({ type: SET_LOADER, payload: false });
            callback(false);
        });
    }
};

export const updateMessage = (message_id = 0, message, callback) => {
    return (dispatch) => {
        dispatch({ type: FORUM_SEND_MESSAGE_REQUEST });
        axios.defaults.headers.common = config.headerAuthorizationToken();
        const path = config.path + 'api/forum/update-message/' + message_id;
        axios.post(path, {page_load: true, message: message, _method: 'PATCH' }).then((result) => {
            localStorage.setItem('user-token-page', result.data.UserToken);

            dispatch({type: FORUM_SET_MESSAGES_LIST, payload: result.data.messages});
            dispatch({ type: FORUM_SEND_MESSAGE_SUCCESS });
            callback(true);
        }).catch((error) => {
            let err_text = '';
            if(error.response.data){
                for(let k in error.response.data){
                    err_text = Array.isArray(error.response.data[k][0]) ? error.response.data[k][0] : error.response.data[k];
                }
            }
            errorNotification(err_text);
            dispatch({ type: FORUM_SEND_MESSAGE_SUCCESS });
            callback(false);
        });
    }
};

export const createTopic = (forum_id, topic_title, message, callback) => {
    return (dispatch) => {
        dispatch({ type: SET_LOADER, payload: true });
        axios.defaults.headers.common = config.headerAuthorizationToken();
        const path = config.path + 'api/forum/create-them';
        axios.post(path, {page_load: true, forum_id: forum_id, topic_title: topic_title, message: message}).then((result) => {
            localStorage.setItem('user-token-page', result.data.UserToken);
            // меняем url страницы
            const new_url = 'forum/' +  forum_id + '/topic/' + result.data.data.topic_id;
            dispatch({ type: FORUM_CREATE_THEM_SUCCESS });

            window.location.pathname = new_url;
            dispatch({ type: SET_LOADER, payload: false });
            callback(true);
        }).catch((error) => {
            let err_text = '';
            if(error.response){
                for(let k in error.response.data){
                    if(Array.isArray(error.response.data[k])){
                        err_text = error.response.data[k][0];
                    }else{
                        err_text = error.response.data[k];
                    }
                    break;
                }
            }
            errorNotification(err_text);
            dispatch({ type: SET_LOADER, payload: false });
            callback(false);
        });
    }
};

export const updateTopic = (topic_id, title, callback) => {
    return (dispatch) => {
        dispatch({ type: SET_LOADER, payload: true });
        axios.defaults.headers.common = config.headerAuthorizationToken();
        const path = config.path + 'api/forum/update-them/' + topic_id;
        axios.post(path, { page_load: true, topic_id: topic_id, title: title, _method: 'PATCH' }).then((result) => {
            localStorage.setItem('user-token-page', result.data.UserToken);

            dispatch({ type: SET_LOADER, payload: false });
            callback(true, result.data.data.topic);
        }).catch((error) => {
            let err_text = '';
            if(error.response){
                for(let k in error.response.data){
                    if(Array.isArray(error.response.data[k])){
                        err_text = error.response.data[k][0];
                    }else{
                        err_text = error.response.data[k];
                    }
                    break;
                }
            }
            errorNotification(err_text);
            dispatch({ type: SET_LOADER, payload: false });
            callback(false, null);
        });
    }
};

export const changeStatusTopic = (topic_id, status_id, callback) => {
    return (dispatch) => {
        dispatch({ type: SET_LOADER, payload: true });
        dispatch({ type: FORUM_CREATE_THEM_REQUEST });
        axios.defaults.headers.common = config.headerAuthorizationToken();
        const path = config.path + 'api/forum/topic/change-status' ;
        axios.post(path, { page_load: true, topic_id: topic_id, status_id: status_id, _method: 'PATCH' }).then((result) => {
            localStorage.setItem('user-token-page', result.data.UserToken);

            dispatch({
                type: FORUM_SET_TOPICS_LIST,
                payload: result.data.data.topics
            });
            dispatch({ type: SET_LOADER, payload: false });
            callback(true);
        }).catch((error) => {
            let err_text = '';
            if(error.response){
                for(let k in error.response.data){
                    if(Array.isArray(error.response.data[k])){
                        err_text = error.response.data[k][0];
                    }else{
                        err_text = error.response.data[k];
                    }
                    break;
                }
            }
            errorNotification(err_text);
            dispatch({ type: SET_LOADER, payload: false });
            callback(false);
        });
    }
};