import { SEARCH_WORD_PAGE_GET_DATA, SEARCH_WORD_PAGE_SET_DATA } from '../actions';

const initState = [];

const reducer = (state = initState, action) => {
    switch (action.type){
        case SEARCH_WORD_PAGE_SET_DATA:
            return action.payload;
        case SEARCH_WORD_PAGE_GET_DATA:
            return state;
        default:
            return state;
    }
};

export default reducer;