import { combineReducers } from 'redux';

import pageReducer from './pageReducer';
import authReducer from './authReducer';
import userReducer from './userReducer';
import footerReducer from './footertReducer';
import loaderReducer from './loaderReducer';
import wordReducer from './wordReducer';

export default combineReducers({
    pageReducer: pageReducer,
    authReducer: authReducer,
    userReducer: userReducer,
    footerReducer: footerReducer,
    loaderReducer: loaderReducer,
    wordReducer: wordReducer,
});