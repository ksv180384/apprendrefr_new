import { LOAD_WORDS, GET_WORDS } from '../actions';

const initState = {};

const reducer = (state = initState, action) => {
    switch (action.type){
        case LOAD_WORDS:
            return action.payload;
        case GET_WORDS:
            return state;
        default:
            return state;
    }
};

export default reducer;
