import {
    MODAL_REQUEST,
    MODAL_SUCCESS,
    MODAL_SHOW,
    MODAL_ERROR,
    MODAL_SET_CONTENT,
    MODAL_SET_HEADER
} from '../actions';

const initState = {
    header: '',
    content: '',
    data: {},
    show: false,
    loading: true,
    error: false,
    error_message: '',
};

const reducer = (state = initState, action) => {
    switch (action.type){
        case MODAL_SHOW:
            return {
                ...state,
                show: action.payload,
            };
        case MODAL_REQUEST:
            return {
                ...state,
                loading: true,
                error: false,
                error_message: '',
            };
        case MODAL_SUCCESS:
            return {
                ...state,
                loading: false,
                modal_content: action.payload,
            };
        case MODAL_ERROR:
            return {
                ...state,
                error: true,
                error_message: action.error,
            };
        case MODAL_SET_CONTENT:
            return {
                ...state,
                content: action.payload,
            };
        case MODAL_SET_HEADER:
            return {
                ...state,
                header: action.payload,
            };
        default:
            return state;
    }
};

export default reducer;


