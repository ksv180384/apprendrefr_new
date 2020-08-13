import { WORD_PAGE_SET_DATA } from '../actions';

const initState = {
    word: null,
};

const reducer = (state = initState, action) => {
    switch (action.type){
        case WORD_PAGE_SET_DATA:
            return {
                ...state,
                word: action.payload,
            };
        default:
            return state;
    }
};

export default reducer;
