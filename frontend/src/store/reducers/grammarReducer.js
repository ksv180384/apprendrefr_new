import { GRAMMAR_SET_LIST, GRAMMAR_SET_ITEM } from '../actions';

const initState = {
    page_id: 0,
    list: [],
    item: null,
};

const reducer = (state = initState, action) => {
    switch (action.type){
        case GRAMMAR_SET_ITEM:
            return { ...state, item: action.payload, page_id: action.payload.id };
        case GRAMMAR_SET_LIST:
            return { ...state, list: action.payload };
        default:
            return state;
    }
};

export default reducer