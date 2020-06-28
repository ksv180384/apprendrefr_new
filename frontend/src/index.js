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

// Components
import ModalWindow from "./components/modals_windows/ModalWindow";
import Preloader from "./components/preloader/Preloader";
import ReactNotification from 'react-notifications-component';
import 'react-notifications-component/dist/theme.css';

import './index.css';
import store from './store';

const customHistory = createBrowserHistory();

ReactDOM.render(
    <Provider store={ store }>
        <ReactNotification />
        <ErrorBoundry>
            <Router history={ customHistory }>
                <Switch>
                    <Route exact path='/' component={ Index }/>
                    <Route exact path='/profile' component={ Profile }/>
                    <Route exact path='/registration' component={ Registration }/>
                    <Route exact path='/lost-password' component={ LostPassword }/>
                    <Route exact path='/forum' component={ Forum }/>
                </Switch>
            </Router>
            <Preloader/>
            <ModalWindow/>
        </ErrorBoundry>
    </Provider>,
    document.getElementById('root')
);



