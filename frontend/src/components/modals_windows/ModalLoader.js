import React, { Component } from 'react';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSpinner } from '@fortawesome/free-solid-svg-icons';

class ModalLoader extends Component{

    render(){
        return(
            <div className="ModalLoader">
                <FontAwesomeIcon icon={ faSpinner } spin/>
            </div>
        );
    }
}

export default ModalLoader;