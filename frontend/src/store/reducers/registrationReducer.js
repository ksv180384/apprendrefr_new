import { REGISTRATION_REQUEST, REGISTRATION_SUCCESS, REGISTRATION_ERROR, REGISTRATION_RESET_DATA } from '../actions';

const initState = {
    loading: false,
    message: '',
    error: false,
    error_message: '',
};

const reducer = (state = initState, action) => {
    switch (action.type){
        case REGISTRATION_REQUEST:
            return {
                ...state,
                loading: true,
                message: '',
                error: false,
                error_message: '',
            };
        case REGISTRATION_SUCCESS:
            return {
                ...state,
                loading: false,
                error: false,
                message: action.payload,
            };
        case REGISTRATION_ERROR:
            return {
                ...state,
                loading: false,
                error: true,
                error_message: action.payload,
            };
        case REGISTRATION_RESET_DATA:
            return {
                ...state,
                loading: false,
                message: '',
                error: false,
                error_message: '',
            };
        default:
            return state;
    }
};

export default reducer;