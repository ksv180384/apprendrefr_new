import { PRIVACY_POLICY_GET, PRIVACY_POLICY_SET } from '../actions';

const initState = null;

const reducer = (state = initState, action) => {
    switch (action.type){
        case PRIVACY_POLICY_SET:
            return action.payload;
        case PRIVACY_POLICY_GET:
            return state;
        default:
            return state;
    }
};

export default reducer;