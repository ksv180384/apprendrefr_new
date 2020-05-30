import { GET_FOOTER, SET_FOOTER } from '../actions';

const initState = [];

const reducer = (state = initState, action) => {
    switch (action.type){
        case SET_FOOTER:
            return action.payload;
        case GET_FOOTER:
            return state;
        default:
            return state;
    }
};

export default reducer;