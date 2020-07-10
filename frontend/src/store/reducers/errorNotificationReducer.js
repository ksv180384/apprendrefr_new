import { ERROR_SET_DATA, ERROR_REMOVE, ERROR_PAGE_SET_DATA } from '../actions';

const initState = {
    is_error: false,
    is_error_page: false,
    error_text: '',
};

const reducer = (state = initState, action) => {

    switch (action.type){
        case ERROR_SET_DATA:
            return { error_text: action.payload, is_error: true };
        case ERROR_PAGE_SET_DATA:
            return { is_error_page: true };
        case ERROR_REMOVE:
            return { error_text: '', is_error: false, is_error_page: false };
        default:
            return state;
    }
};

export default reducer;