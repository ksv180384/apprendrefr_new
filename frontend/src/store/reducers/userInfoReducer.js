import { USER_INFO_SET_INFO } from '../actions/index';

const initState = {
    user_info: {},
};

const reducer = (state = initState, action) => {
    switch (action.type){
        case USER_INFO_SET_INFO:
            return { user_info: action.payload };
        default:
            return state;
    }
};

export default reducer;