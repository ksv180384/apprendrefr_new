import { FORUM_SET_FORUMS_LIST } from "../actions";

const initState = {};

const reducer = (state = initState, action) => {
    switch (action.type){
        case FORUM_SET_FORUMS_LIST:
            return action.payload;
        default:
            return state;
    }
};
export default reducer;