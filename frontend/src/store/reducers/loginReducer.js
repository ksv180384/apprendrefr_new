import { LOGIN_SUCCESS, LOGIN_REQUEST, LOGIN_ERROR, LOGIN_RESET_ERROR, SET_LOGIN } from '../actions';

const initState = {
    login: false,
    loading: false,
};

const reducer = (state = initState, action) => {
    switch (action.type){
        case LOGIN_REQUEST:
            return {
                ...state,
                loading: true,
            };
        case LOGIN_SUCCESS:
            return {
                ...state,
                login: true,
                loading: false,
            };
        case LOGIN_ERROR:
            return {
                ...state,
                loading: false,
            };
        case LOGIN_RESET_ERROR:
            return {
                ...state,
                error_message: '',
                error: false,
            };
        case SET_LOGIN:
            return {
                ...state,
                login: action.payload,
            };
        default:
            return state;
    }
};

export default reducer;