import { LYRIC_SET_LIST, LYRIC_SET_ITEM } from '../actions';

const stateInit = {
    list: [],
    song: null,
    song_id: null,
};

const reducer = (state = stateInit, action) => {
    switch (action.type){
        case LYRIC_SET_LIST:
            return { list: action.payload };
        case LYRIC_SET_ITEM:
            return { song: action.payload, song_id: action.payload.id };
        default:
            return state;
    }
};

export default reducer;
