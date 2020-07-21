import { USERS_LIST_SET_DATA } from '../actions/index';

const initState = {
    users: [],
    paginate: {},
};

const reducer = (state = initState, action) => {
    switch (action.type){
        case USERS_LIST_SET_DATA:
            return {
                users: action.payload.data,
                paginate: {
                    current_page: action.payload.current_page,
                    first_page_url: action.payload.first_page_url,
                    from: action.payload.from,
                    last_page: action.payload.last_page,
                    last_page_url: action.payload.last_page_url,
                    next_page_url: action.payload.next_page_url,
                    path: action.payload.path,
                    per_page: action.payload.per_page,
                    prev_page_url: action.payload.prev_page_url,
                    to: action.payload.to,
                    total: action.payload.total,
                }
            };
        default:
            return state;
    }
};

export default reducer;