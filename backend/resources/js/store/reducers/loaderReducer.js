import { SET_LOADER, GET_LOADER } from '../actions';

const initState = false;

const loaderReducer = (state = initState, action) => {
    //console.log(action.payload);
    switch (action.type){
        case SET_LOADER:
            return action.payload;
        case GET_LOADER:
            return state;
        default:
            return state;
    }
};

export default loaderReducer;