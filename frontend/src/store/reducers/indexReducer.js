import { INDEX_SET_FORUM } from '../actions';


const initState = {
    topics: [],
};

const reducer = (state = initState, action) => {
    switch (action.type){
        case INDEX_SET_FORUM:
            return { topics: action.payload };
        default:
            return state;
    }
};

export default reducer;