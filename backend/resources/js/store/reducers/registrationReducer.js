import { REGISTRATION_REQUEST, REGISTRATION_SUCCESS, REGISTRATION_ERROR, REGISTRATION_RESET_DATA } from '../actions';

const initState = {
    loading: false,
    registration: false,
};

const reducer = (state = initState, action) => {
    switch (action.type){
        case REGISTRATION_REQUEST:
            return {
                ...state,
                loading: true,
                registration: false,
            };
        case REGISTRATION_SUCCESS:
            return {
                ...state,
                loading: false,
                registration: true,
            };
        case REGISTRATION_ERROR:
            return {
                ...state,
                loading: false,
                registration: false,
            };
        case REGISTRATION_RESET_DATA:
            return {
                ...state,
                loading: false,
                registration: false,
            };
        default:
            return state;
    }
};

export default reducer;