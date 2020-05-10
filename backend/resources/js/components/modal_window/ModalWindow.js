import React, { Component } from 'react';
import './ModalWindow.css';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';

//import Preloader from './../../components/preloader/Preloader';
//import Preloader from "../preloader/Preloader";

class ModalWindow extends Component{

    constructor(props){
        super(props);

        this.changeDisplay = (e) =>{
            props.toggleModal();
        }

        this.clickModal = (e) => {
            e.stopPropagation();
        }
    }

    render(){

        const { display, header, content } = this.props;

        let classModalState = '';
        if(display){
            classModalState = ' show';
        }

        return(
            <div className={'ModalWindow-block' + classModalState}>
                <div
                    className="bg-modal"
                    onClick={ this.changeDisplay }
                >
                    <div className="modal-block" onClick={ this.clickModal }>
                        <div className="modal-header">
                            { header }
                            <div className="modal-close" onClick={ this.changeDisplay }>
                                <FontAwesomeIcon icon={ faTimes }/>
                            </div>
                        </div>
                        <div className="modal-content">
                            { content }
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default ModalWindow;