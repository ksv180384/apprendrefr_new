import { GET_USER, SET_USER } from '../actions/index';

const initState = {};

const reducer = (state = initState, action) => {
    switch (action.type){
        case SET_USER:
            return action.payload;
        case GET_USER:
           return state;
        default:
            return state;
    }
};

export default reducer;