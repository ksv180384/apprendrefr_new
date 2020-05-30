import { GET_AUTH, SET_AUTH } from '../actions/index';

const initState = false;

const reducer = (state = initState, action) => {
    switch (action.type){
        case SET_AUTH:
            return action.payload;
        case GET_AUTH:
            return state;
        default:
            return state;
    }
};

export default reducer;