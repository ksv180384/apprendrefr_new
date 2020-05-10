import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';

import ErrorBoundry from './components/error-boundry/ErrorBoundry';
import Main from './Main';
import './index.css';

import store from './store';
import { loadPage } from './actions';

import menu from './config/menu';

import Axios from "axios/index";


store.dispatch(loadPage( {load: true} ));
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
                <Main menu={menu} />
            </ErrorBoundry>
        </Provider>,
        document.getElementById('root')
    );
};
store.subscribe(update);


