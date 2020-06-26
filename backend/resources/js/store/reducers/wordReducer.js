import {
    WORD_SET_LIST,
    WORD_ITEM_REQUEST,
    WORD_ITEM_SUCCESS,
    WORD_ITEM_ERROR
} from '../actions';

const initState = {
    loading_item: false,
    list: [],
    item: {},
    error: false,
    error_message: '',
};

const reducer = (state = initState, action) => {
    switch (action.type){
        case WORD_SET_LIST:
            return {
                ...state,
                list: action.payload,
            };
        case WORD_ITEM_REQUEST:
            return {
                ...state,
                loading_item: true,
                error: false,
                error_message: '',
            };
        case WORD_ITEM_SUCCESS:
            return {
                ...state,
                loading_item: false,
                item: action.payload,
            };
        case WORD_ITEM_ERROR:
            return {
                ...state,
                loading_item: false,
                error: true,
                error_message: action.payload,
            };
        default:
            return state;
    }
};

export default reducer;
