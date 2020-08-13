import { PROFILE_FORM_REQUEST, PROFILE_FORM_SUCCESS, PROFILE_FORM_ERROR } from '../actions';

const initSate = {
    loading: false,
};

const reducer = (state = initSate, action) => {
    switch (action.type){
        case PROFILE_FORM_REQUEST:
            return {
                ...state,
                loading: true,
            };
        case PROFILE_FORM_SUCCESS:
            return {
                ...state,
                loading: false,
            };
        case PROFILE_FORM_ERROR:
            return {
                ...state,
                loading: false,
            };
        default:
            return state;
    }
};

export default reducer;