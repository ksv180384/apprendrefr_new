import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { Router, Switch, Route } from 'react-router-dom';
import { createBrowserHistory } from 'history';
import ErrorBoundry from './components/error-boundry/ErrorBoundry';

// Pages
import Index from "./pages/index/Index";
import Registration from "./pages/registration/Registration";
import LostPassword from "./pages/lost_password/LostPassword";
import Profile from "./pages/profile/Profile";
import Forum from "./pages/forum/Forum";
import Topic from "./pages/forum/Topic";
import Message from "./pages/forum/Message";
import UserInfo from "./pages/user_info/UserInfo";
import UsersList from "./pages/users_list/UsersList";
import Grammar from "./pages/grammar/Grammar";
import Lessons from "./pages/lessons/Lessons";
import Lyrics from "./pages/lyrics/Lyrics";
import Lyric from "./pages/lyrics/Lyric";
import Words from "./pages/word/Words";
import Word from "./pages/word/Word";
import ConfirmEmail from "./pages/confirm_email/ConfirmEmail";
import ChangePasswordPage from "./pages/change_password/ChangePasswordPage";
import TermsUser from "./pages/info/TermsUser";
import SearchWordPage from "./pages/search/SearchWordPage";
import PrivacyPolicy from "./pages/info/PrivacyPolicy";

// Components
import ModalWindow from './components/modals_windows/ModalWindow';
import Preloader from './components/preloader/Preloader';
import ReactNotification from 'react-notifications-component';
import ErrorIndicator from './components/error-indicator/ErrorIndicator';

import 'react-notifications-component/dist/theme.css';

import './index.css';
import store from './store';

const customHistory = createBrowserHistory();

ReactDOM.render(
    <Provider store={ store }>
        <ErrorBoundry>
            <ReactNotification/>
            <Router history={ customHistory }>
                <Switch>
                    <Route exact path='/' component={ Index }/>
                    <Route exact path='/profile' component={ Profile }/>
                    <Route exact path='/registration' component={ Registration }/>
                    <Route exact path='/lost-password' component={ LostPassword }/>
                    <Route exact path='/grammar' component={ Grammar }/>
                    <Route exact path='/grammar/item/:id' component={ Grammar }/>
                    <Route exact path='/lessons' component={ Lessons }/>
                    <Route exact path='/lessons/item/:id' component={ Lessons }/>
                    <Route exact path='/lyrics' component={ Lyrics }/>
                    <Route exact path='/lyrics/item/:id' component={ Lyric }/>
                    <Route exact path='/users-list' component={ UsersList }/>
                    <Route exact path='/users-list/page/:page' component={ UsersList }/>
                    <Route exact path='/user/info/:id' component={ UserInfo }/>
                    <Route exact path='/forum' component={ Forum }/>
                    <Route exact path='/forum/:forum_id' component={ Topic }/>
                    <Route exact path='/forum/:forum_id/topic/:topic_id' component={ Message }/>
                    <Route exact path='/forum/:forum_id/topic/:topic_id/page/:page' component={ Message }/>
                    <Route exact path='/dictionary' component={ Words }/>
                    <Route exact path='/dictionary/:pos?/:lang?/page/:page' component={ Words }/>
                    <Route exact path='/dictionary/word/:id' component={ Word }/>
                    <Route exact path='/user/confirm-email/:token' component={ ConfirmEmail }/>
                    <Route exact path='/user/change-password/:token' component={ ChangePasswordPage }/>
                    <Route exact path='/info/privacy-policy' component={ PrivacyPolicy }/>
                    <Route exact path='/info/terms-user' component={ TermsUser }/>
                    <Route exact path='/word/search/:word/:lang?' component={ SearchWordPage }/>
                    <Route exact component={ ErrorIndicator }/>
                </Switch>
            </Router>
            <Preloader/>
            <ModalWindow/>
        </ErrorBoundry>
    </Provider>,
    document.getElementById('root')
);



