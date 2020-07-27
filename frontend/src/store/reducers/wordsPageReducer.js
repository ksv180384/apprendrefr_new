import {
    WORDS_PAGE,
    WORDS_PAGE_NUM,
    WORDS_PAGE_SET_POS,
    WORDS_PAGE_SET_LANG
} from '../actions';

const initState = {
    list: [],
    last_page: 0,
    per_page: 0,
    to: 0,
    from: 0,
    current_page: 0,
    total: 0,
    pos_select: 0,
    pos_list: [],
    lang: 'fr',
};

const reducer = (state = initState, action) => {
    switch (action.type){
        case WORDS_PAGE:
            return {
                ...state,
                list: action.payload.words.data,
                last_page: action.payload.words.last_page,
                per_page: action.payload.words.per_page,
                to: action.payload.words.to,
                from: action.payload.words.from,
                current_page: action.payload.words.current_page,
                total: action.payload.words.total,
                pos_list: action.payload.pos_list ? action.payload.pos_list : state.pos_list,
            };
        case WORDS_PAGE_NUM:
            return {
                ...state,
                current_page: action.payload,
            };
        case WORDS_PAGE_SET_POS:
            return {
                ...state,
                pos_select: action.payload,
            };
        case WORDS_PAGE_SET_LANG:
            return {
                ...state,
                lang: action.payload,
            };
        default:
            return state;
    }
};

export default reducer;
