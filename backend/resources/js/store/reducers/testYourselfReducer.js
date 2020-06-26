import { TESTYOURSELF_ERROR, TESTYOURSELF_REQUEST, TESTYOURSELF_SUCCESS } from '../actions';

const initState = {
    questions_list: {},
    loading: false,
    error: false,
};

const reducer = (state = initState, action) => {
    switch (action.type){
        case TESTYOURSELF_REQUEST:
            return {
                ...state,
                loading: false,
                error: false,
            };
        case TESTYOURSELF_SUCCESS:
            return {
                ...state,
                loading: true,
                questions_list: action.payload,
            };
        case TESTYOURSELF_ERROR:
            return {
                ...state,
                loading: true,
                error: true,
            };
        default:
            return state;
    }
};

export default reducer;