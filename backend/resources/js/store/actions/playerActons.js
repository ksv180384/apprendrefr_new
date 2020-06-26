import {
    PLAYER_GET_SONGS_LIST_REQUEST,
    PLAYER_GET_SONGS_LIST_SUCCESS,
    PLAYER_GET_SONGS_LIST_ERROR,
    PLAYER_CLOSE_SONGS_LIST,
    SET_LOADER,
    PLAYER_GET_SONG_REQUEST,
    PLAYER_GET_SONG_SUCCESS,
    PLAYER_GET_SONG_ERROR,
    PLAYER_CLOSE_SONG,
    PLAYER_SHOW_SONG,
    PLAYER_SHOW_SONGS_LIST,
    PLAYER_INIT_LYRICS,
    PLAYER_LOADING_OPEN_TRACK_REQUEST,
    PLAYER_LOADING_OPEN_TRACK_SUCCESS,
    PLAYER_LOADING_OPEN_TRACK_ERROR, PLAYER_LOADING_OPEN_TRACK_SET_LOADING
} from './index';
import { config } from '../../config';
import axios from 'axios';

export const loadSongsList = () => {
    return (dispatch) => {
        dispatch({ type: SET_LOADER, payload: true });
        dispatch({ type: PLAYER_GET_SONGS_LIST_REQUEST });
        axios.get(config.path + 'api/song/list').then((result) => {
            dispatch({ type: PLAYER_GET_SONGS_LIST_SUCCESS, payload: result.data });
            dispatch({ type: SET_LOADER, payload: false });
        }).catch((error) => {
            dispatch({ type: SET_LOADER, payload: false });
            if(error.response){
                dispatch({ type: PLAYER_GET_SONGS_LIST_ERROR, payload: error.response.data });
            }else if(error.request){
                dispatch({ type: PLAYER_GET_SONGS_LIST_ERROR, payload: 'Неудалось подключиться к серверу. Попробуйте позже.' });
            }
        })
    }
};

export const loadSong = (id) => {
    return (dispatch) => {
        dispatch({ type: SET_LOADER, payload: true });
        dispatch({ type: PLAYER_GET_SONG_REQUEST });
        axios.get(config.path + 'api/song/item/' + id).then((result) => {
            dispatch({ type: PLAYER_GET_SONG_SUCCESS, payload: result.data });
            dispatch({ type: PLAYER_INIT_LYRICS, payload: result.data });
            dispatch({ type: SET_LOADER, payload: false });
        }).catch((error) => {
            dispatch({ type: SET_LOADER, payload: false });
            if(error.response){
                dispatch({ type: PLAYER_GET_SONG_ERROR, payload: error.response.data });
            }else if(error.request){
                dispatch({ type: PLAYER_GET_SONG_ERROR, payload: 'Неудалось подключиться к серверу. Попробуйте позже.' });
            }
        });
    }
};

export const closeSongsList = () => {
    return { type: PLAYER_CLOSE_SONGS_LIST }
};

export const showSongsList = () => {
    return { type: PLAYER_SHOW_SONGS_LIST }
};

export const closeSong = () => {
    return { type: PLAYER_CLOSE_SONG }
};

export const showSong = () => {
    return { type: PLAYER_SHOW_SONG }
};
// Поиск трека по названию трека и исполнителю
export const searchSong = (artist, title, file_name) => {
    return (dispatch) => {
        dispatch({ type: SET_LOADER, payload: true });
        dispatch({ type: PLAYER_LOADING_OPEN_TRACK_REQUEST });
        axios.post(config.path + 'api/song/search-by-artist-and-title', { artist:artist, title: title, file_name: file_name }).then((result) => {
            dispatch({ type: SET_LOADER, payload: false });
            if(Object.keys(result.data).length !== 0){
                dispatch({ type: PLAYER_LOADING_OPEN_TRACK_SUCCESS, payload: result.data });
            }else{
                dispatch({ type: PLAYER_LOADING_OPEN_TRACK_SET_LOADING, payload: false });
                dispatch(loadSongsList());
            }
        }).catch((error) => {
            dispatch({ type: SET_LOADER, payload: false });
            if(error.response){
                dispatch({ type: PLAYER_LOADING_OPEN_TRACK_ERROR, payload: error.response.data });
            }else if(error.request){
                dispatch({ type: PLAYER_LOADING_OPEN_TRACK_ERROR, payload: 'Неудалось подключиться к серверу. Попробуйте позже.' });
            }
        })
    }
};