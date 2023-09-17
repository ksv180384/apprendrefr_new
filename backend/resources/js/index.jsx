import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';

import '../css/app.css';

import App from './app.jsx';

const app = ReactDOM.createRoot(document.getElementById('app'));

app.render(
    <React.StrictMode>
        <BrowserRouter>
            <App/>
        </BrowserRouter>
    </React.StrictMode>
);
