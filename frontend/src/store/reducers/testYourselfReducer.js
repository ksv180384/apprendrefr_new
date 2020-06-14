import { TESTYOURSELF_DATA, TESTYOURSELF_ERROR, TESTYOURSELF_REQUEST, TESTYOURSELF_SUCCESS } from '../actions';

const initState = {
    questions_list: {},
    loading: false,
    error: false,
};

const reducer = (state = initState, action) => {
    switch (action){
        case TESTYOURSELF_REQUEST:
            return {
                ...state,
                loading: true,
                error: false,
            };
        case TESTYOURSELF_SUCCESS:
            return {
                ...state,
                loading: false,
                questions_list: action.payload,
            };
        case TESTYOURSELF_ERROR:
            return {
                ...state,
                loading: false,
                error: true,
            };
        default:
            return state;
    }
};

export default reducer;