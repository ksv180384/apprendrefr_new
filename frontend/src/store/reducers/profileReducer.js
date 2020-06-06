import { PROFILE_FORM_REQUEST, PROFILE_FORM_SUCCESS, PROFILE_FORM_ERROR } from '../actions';

const initSate = {
    loading: false,
    success: false,
    message: '',
    error: false,
    error_message: '',
};

const reducer = (state = initSate, action) => {
    switch (action.type){
        case PROFILE_FORM_REQUEST:
            return {
                ...state,
                loading: true,
                success: false,
                message: '',
                error: false,
                error_message: '',
            };
        case PROFILE_FORM_SUCCESS:
            return {
                ...state,
                loading: false,
                success: true,
                message: action.payload,
                error: false,
                error_message: '',
            };
        case PROFILE_FORM_ERROR:
            return {
                ...state,
                loading: false,
                error: true,
                error_message: action.payload,
            };
        default:
            return state;
    }
};

export default reducer;