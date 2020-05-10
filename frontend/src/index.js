import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';

import ErrorBoundry from './components/error-boundry/ErrorBoundry';
//import Main from './Main';
import './index.css';

import store from './store';
import { loadPage } from './actions';

import Index from "./pages/index/Index";
import './pages/index/Index.css';

import Axios from "axios/index";
import Preloader from "./components/preloader/Preloader";
import ModalWindow from "./components/modals_windows/ModalWindow";

Axios.defaults.headers.common = {
    'Authorization':localStorage.getItem('user-token'),
};


//*
store.dispatch(loadPage({ load: true }));
Axios.post(store.getState().api_path + '/api/index', {

})
    .then((response) => {
        //console.log(userAuth(response.data));
        store.dispatch(loadPage(response.data));
        store.dispatch(loadPage({ load: false }));
        //console.log(store.getState());

    })
    .catch((error) => {
        //console.log(error);
        store.dispatch(loadPage({ load: false }));
    });


const update = () => {
    ReactDOM.render(
        <Provider store={store}>
            <ErrorBoundry>
                <Index/>
                <Preloader/>
                <ModalWindow/>
            </ErrorBoundry>
        </Provider>,
        document.getElementById('root')
    );
};
store.subscribe(update);


