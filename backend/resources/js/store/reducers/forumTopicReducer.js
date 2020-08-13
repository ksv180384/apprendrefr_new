import { FORUM_SET_TOPIC } from "../actions";

const initState = {};

const reducer = (state = initState, action) => {
    switch (action.type){
        case FORUM_SET_TOPIC:
            return action.payload;
        default:
            return state;
    }
};
export default reducer;