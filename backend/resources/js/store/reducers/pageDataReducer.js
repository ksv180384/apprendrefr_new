import { GET_PAGE_DATA, SET_PAGE_DATA } from '../actions';

const initState = [];

const reducer = (state = initState, action) => {
    switch (action.type){
        case SET_PAGE_DATA:
            return action.payload;
        case GET_PAGE_DATA:
            return state;
        default:
            return state;
    }
};

export default reducer;