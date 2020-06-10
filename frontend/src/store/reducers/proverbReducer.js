import { LOAD_PROVERB } from '../actions';

const initState = {
    text: '',
    translation: '',
};

export const reducer = (state = initState, action) => {
    switch (action.type){
        case LOAD_PROVERB:
            return action.payload;
        default:
            return state;
    }
};

export default reducer;