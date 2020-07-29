import { FORUM_CREATE_THEM_REQUEST, FORUM_CREATE_THEM_SUCCESS } from '../actions';

const initState = {
    loading: false,
};

const reducer = (state = initState, action) => {
    switch (action.type){
        case FORUM_CREATE_THEM_REQUEST:
            return { ...state, loading: true };
        case FORUM_CREATE_THEM_SUCCESS:
            return { ...state, loading: false };
        default:
            return state;
    }
};

export default reducer;