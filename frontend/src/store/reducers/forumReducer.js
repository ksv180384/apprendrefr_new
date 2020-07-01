import { FORUM_SET_FORUM } from "../actions";

const initState = {};

const reducer = (state = initState, action) => {
    switch (action.type){
        case FORUM_SET_FORUM:
            return action.payload;
        default:
            return state;
    }
};
export default reducer;