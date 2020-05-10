import React, { Component } from 'react';
import './Preloader.css';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSpinner } from '@fortawesome/free-solid-svg-icons';

import store from './../../store';

class Preloader extends Component{



    render(){

        const { load } = store.getState();

        let classShow = '';
        if(load){
            classShow = ' show';
        }

        return(
            <div className={'Preloader-block' + classShow }>
                Télécharger <FontAwesomeIcon icon={faSpinner} spin/>
            </div>
        );
    }
}

export default Preloader;