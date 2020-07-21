import { FORUM_QUOTE_ADD, FORUM_QUOTS_REMOVE } from '../actions';

const initState = {
    quotes: [],
};

const reducer = (state = initState, action) => {
    switch (action.type){
        case FORUM_QUOTE_ADD:
            return { quotes: state.quotes.concat(action.payload) };
        case FORUM_QUOTS_REMOVE:
            return { quotes: [] };
        default:
            return state;
    }
};

export default reducer;