import { FORUM_SET_STATUSES } from "../actions";

const initState = {};

const reducer = (state = initState, action) => {
    switch (action.type){
        case FORUM_SET_STATUSES:
            return action.payload;
        default:
            return state;
    }
};
export default reducer;