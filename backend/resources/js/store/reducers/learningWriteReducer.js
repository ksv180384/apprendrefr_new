import { LEARNING_WRITE_DATA, LEARNING_WRITE_SET_LOADING } from "../actions";

const initState = {
    data: [],
    loaded: false,
};

const reducer = (state = initState, action) => {
    switch (action.type){
        case LEARNING_WRITE_DATA:
            return {
                ...state,
                data: action.payload,
                loaded: true,
            };
        case LEARNING_WRITE_SET_LOADING:
            return {
                ...state,
                loaded: action.payload,
            };
        default:
            return state;
    }
};
export default reducer;
