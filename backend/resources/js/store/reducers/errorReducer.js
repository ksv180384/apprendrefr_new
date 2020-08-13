import { ERROR_PAGE, ERROR_PAGE_REMOVE } from "../actions";

const initState = {
    error: false,
};

const reducer = (state = initState, action) => {
    switch(action.type){
        case ERROR_PAGE:
            return { error: true };
        case ERROR_PAGE_REMOVE:
            return { error: false };
        default:
            return state;
    }
};

export default reducer;