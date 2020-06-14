import { combineReducers } from 'redux';

import pageReducer from './pageReducer';
import userReducer from './userReducer';
import footerReducer from './footertReducer';
import loaderReducer from './loaderReducer';
import loaderPageReducer from './loaderPageReducer';
import wordReducer from './wordReducer';
import provrbReducer from './proverbReducer';
import metaReducer from './metaReducer';
import pageDataReducer from './pageDataReducer';
import loginReducer from './loginReducer';
import registrationReducer from './registrationReducer';
import profileReducer from './profileReducer';
import modalReducer from './modalReducer';
import learningWriteReducer from './learningWriteReducer';
import testYourselfReducer from './testYourselfReducer';

export default combineReducers({
    pageReducer: pageReducer,
    userReducer: userReducer,
    footerReducer: footerReducer,
    loaderReducer: loaderReducer,
    loaderPageReducer: loaderPageReducer,
    wordReducer: wordReducer,
    proverbReducer: provrbReducer,
    metaReducer: metaReducer,
    pageDataReducer: pageDataReducer,
    loginReducer: loginReducer,
    registrationReducer: registrationReducer,
    profileReducer: profileReducer,
    modalReducer: modalReducer,
    learningWriteReducer: learningWriteReducer,
    testYourselfReducer: testYourselfReducer,
});