import { STATISTIC_SET_DATA } from '../actions';

const initState = {
    count_all: 0,
    count_guests: 0,
    count_users: 0,
    count_users_register: 0,
    count_messages: 0,
    online_users: [],
};

const reducer = (state = initState, action) => {
    switch (action.type){
        case STATISTIC_SET_DATA:
            return {
                ...state,
                count_all: action.payload.count_all,
                count_guests: action.payload.count_guests,
                count_users: action.payload.count_users,
                count_users_register: action.payload.count_users_register,
                count_messages: action.payload.count_messages,
                online_users: action.payload.online_users
            };
        default:
            return state;
    }
};

export default reducer;