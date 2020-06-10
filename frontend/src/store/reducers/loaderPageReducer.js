import {GET_LOADER_PAGE, SET_LOADER, SET_LOADER_PAGE} from '../actions';

const initState = true;

const reducer = (state = initState, action) => {
    switch (action.type){
        case SET_LOADER_PAGE:
            return action.payload;
        case GET_LOADER_PAGE:
            return state;
        default:
            return state;
    }
};

export default reducer;