import React,  { Component } from 'react';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faSpinner} from "@fortawesome/free-solid-svg-icons/index";

import './LoaderPage.css';

class LoaderPage extends Component{

    render(){

        return(
            <div className="LoaderPage">
                <div>
                    <div className="mb-10">
                        <FontAwesomeIcon icon={faSpinner} spin/>
                    </div>
                    <div className="load-text">Загрузка...</div>
                </div>
            </div>
        );
    }
}

export default LoaderPage;