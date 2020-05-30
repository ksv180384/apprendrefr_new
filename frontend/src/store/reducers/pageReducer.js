import { GET_PAGE } from '../actions';

const initState = {};

const reducer = (state = initState, action) => {
    switch (action.type){
        case GET_PAGE:
            return { ...state, page: action.payload };
        default:
            return state;
    }
};

export default reducer;