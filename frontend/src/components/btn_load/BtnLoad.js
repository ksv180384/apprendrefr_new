import React, { Component } from 'react';
import './BtnLoad.css';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSpinner } from '@fortawesome/free-solid-svg-icons';


class BtnLoad extends Component{

    render(){

        const { load, type, title, onClick } = this.props;

        return(
            <button className="Btn-load" type={ type } disabled={ load } onClick={ onClick }>
                <span>{ title }</span>
                <FontAwesomeIcon icon={faSpinner} spin/>
            </button>
        );
    }
}

export default BtnLoad;