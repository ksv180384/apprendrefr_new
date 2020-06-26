import {
    PLAYER_GET_SONGS_LIST_REQUEST,
    PLAYER_GET_SONGS_LIST_SUCCESS,
    PLAYER_GET_SONGS_LIST_ERROR,
    PLAYER_SHOW_SONGS_LIST,
    PLAYER_CLOSE_SONGS_LIST,
    PLAYER_GET_SONG_REQUEST,
    PLAYER_GET_SONG_SUCCESS,
    PLAYER_GET_SONG_ERROR,
    PLAYER_CLOSE_SONG,
    PLAYER_SHOW_SONG,
    PLAYER_INIT_LYRICS,
    PLAYER_LOADING_OPEN_TRACK_REQUEST,
    PLAYER_LOADING_OPEN_TRACK_SUCCESS,
    PLAYER_LOADING_OPEN_TRACK_ERROR, PLAYER_LOADING_OPEN_TRACK_SET_LOADING
} from '../actions';
import GoLyrics from '../../components/player/GoLyrics';


const initState = {
    songs_list: [], // Полный список треков
    song: {}, // данные загруженного трека
    song_lyrics: new GoLyrics(), // Объект для управления скролером текста трека
    show_player_text_block: false, // Показывать ли блок с тестами трека
    show_player_song_list_block: false, // Показвать ли блок со списком всех треков
    loading: false, // Обозначает загрузку списка треков и загрузку выбранного трека из списка треков
    // Обозначает загрузку файла, который пользователь открыл для прослушивания (поиск подходящего текста в БД)
    loading_open_track: false,
    error: false,
    error_message: '',
};

const reducer = (state = initState, action) => {
    switch (action.type){
        case PLAYER_GET_SONGS_LIST_REQUEST:
            return {
                ...state,
                loading: true,
                show_player_song_list_block: true,
                error: false,
                error_message: '',
            };
        case PLAYER_GET_SONGS_LIST_SUCCESS:
            return {
                ...state,
                loading: false,
                songs_list: action.payload,
            };
        case PLAYER_GET_SONGS_LIST_ERROR:
            return {
                ...state,
                loading: false,
                show_player_song_list_block: false,
                error: true,
                error_message: action.payload,
            };
        case PLAYER_SHOW_SONGS_LIST:
            return {
                ...state,
                songs_list: [],
                show_player_song_list_block: false,
            };
        case PLAYER_CLOSE_SONGS_LIST:
            return {
                ...state,
                songs_list: [],
                show_player_song_list_block: false,
            };
        case PLAYER_GET_SONG_REQUEST:
            return {
                ...state,
                loading: true,
                song_lyrics: new GoLyrics(),
                error: false,
                error_message: '',
            };
        case PLAYER_GET_SONG_SUCCESS:
            return {
                ...state,
                loading: false,
                show_player_text_block: true,
                show_player_song_list_block: false,
                song: action.payload,
            };
        case PLAYER_GET_SONG_ERROR:
            return {
                ...state,
                loading: false,
                error: true,
                error_message: action.payload,
            };
        case PLAYER_SHOW_SONG:
            return {
                ...state,
                show_player_text_block: true,
            };
        case PLAYER_CLOSE_SONG:
            return {
                ...state,
                song_lyrics: new GoLyrics(),
                show_player_text_block: false,
            };
        case PLAYER_INIT_LYRICS:
            return {
                ...state,
                song_lyrics: new GoLyrics(action.payload),
            };
        case PLAYER_LOADING_OPEN_TRACK_REQUEST:
            return {
                ...state,
                loading_open_track: true,
                song_lyrics: new GoLyrics(),
                error: false,
                error_message: '',
            };
        case PLAYER_LOADING_OPEN_TRACK_SUCCESS:
            return {
                ...state,
                loading_open_track: false,
                song_lyrics: new GoLyrics(action.payload),
                show_player_text_block: true,
                song: action.payload,
            };
        case PLAYER_LOADING_OPEN_TRACK_ERROR:
            return {
                ...state,
                loading_open_track: false,
                error: true,
                error_message: action.payload,
            };
        case PLAYER_LOADING_OPEN_TRACK_SET_LOADING:
            return {
                ...state,
                loading_open_track: action.payload,
            };
        default:
            return state;
    }
};

export default reducer;