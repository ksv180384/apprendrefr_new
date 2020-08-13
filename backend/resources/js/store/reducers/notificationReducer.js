/*import {
    NOTIFICATION_ERROR_SET_DATA,
    NOTIFICATION_ERROR_REMOVE,
    NOTIFICATION_SUCCESS_SET_DATA,
    NOTIFICATION_WARNING_SET_DATA
} from '../actions';

const initState = {
    type: 'error',
    text: '',
};

const reducer = (state = initState, action) => {

    switch (action.type){
        case NOTIFICATION_ERROR_SET_DATA:
            return { text: action.payload, type: 'error' };
        case NOTIFICATION_SUCCESS_SET_DATA:
            return { error_text: '', type: 'success' };
        case NOTIFICATION_WARNING_SET_DATA:
            return { error_text: '', type: 'warning' };
        case NOTIFICATION_ERROR_REMOVE:
            return { error_text: '' };
        default:
            return state;
    }
};

export default reducer;
*/