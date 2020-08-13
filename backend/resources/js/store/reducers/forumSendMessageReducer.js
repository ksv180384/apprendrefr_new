import { FORUM_SEND_MESSAGE_REQUEST, FORUM_SEND_MESSAGE_SUCCESS } from '../actions';

const initState = {
    loading: false,
};

const reducer = (state = initState, action) => {
    switch (action.type){
        case FORUM_SEND_MESSAGE_REQUEST:
            return { ...state, loading: true };
        case FORUM_SEND_MESSAGE_SUCCESS:
            return { ...state, loading: false };
        default:
            return state;
    }
};

export default reducer;