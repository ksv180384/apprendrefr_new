import { LYRIC_SET_DATA } from '../actions';

const stateInit = {
    list: [],
    song: null,
    song_id: null,
};

const reducer = (state = stateInit, action) => {
    switch (action.type){
        case LYRIC_SET_DATA:
            return { list: action.payload };
        default:
            return state;
    }
};

export default reducer;
