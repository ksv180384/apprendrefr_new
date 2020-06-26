import { GET_PAGE, LOAD_PAGE } from '../actions';

const initState = {};

const reducer = (state = initState, action) => {
    switch (action.type){
        case LOAD_PAGE:
            return action.payload;
        case GET_PAGE:
            return state;
        default:
            return state;
    }
};

export default reducer;