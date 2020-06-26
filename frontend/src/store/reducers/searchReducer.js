import { SEARCH_REQUEST, SEARCH_SUCCESS, SEARCH_ERROR, SEARCH_REMOVE } from '../actions';

const initState = {
    loading: false,
    search: [],
    error: false,
    error_message: '',
};

const reducer = (state = initState, action) => {
    switch (action.type){
        case SEARCH_REQUEST:
            return {
                ...state,
                loading: true,
                error: false,
                error_message: '',
            };
        case SEARCH_SUCCESS:
            return {
                ...state,
                loading: false,
                search: action.payload,
            };
        case SEARCH_ERROR:
            return {
                ...state,
                loading: false,
                error: true,
                error_message: action.payload,
            };
        case SEARCH_REMOVE:
            return {
                ...state,
                search: [],
                loading: false,
                error: false,
                error_message: '',
            };
        default:
            return state;
    }
};

export default reducer;