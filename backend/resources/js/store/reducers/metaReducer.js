import { GET_META, SET_META } from '../actions';

const initState = {};

const reducer = (state = initState, action) => {
    switch (action.type){
        case SET_META:
            return action.payload;
        case GET_META:
            return state;
        default:
            return state;
    }
};

export default reducer;
