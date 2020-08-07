import { TERMS_USER_GET, TERMS_USER_SET } from '../actions';

const initState = null;

const reducer = (state = initState, action) => {
    switch (action.type){
        case TERMS_USER_SET:
            return action.payload;
        case TERMS_USER_GET:
            return state;
        default:
            return state;
    }
};

export default reducer;