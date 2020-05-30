import React, { Component } from 'react';
import './ModalWindow.css';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
//import index from "../../store/store";
import { showModal } from "../../store/actions";

//import Preloader from './../../components/preloader/Preloader';
//import Preloader from "../preloader/Preloader";

class ModalWindow extends Component{

    constructor(props){
        super(props);

        /*
        this.modalToggle = (e) =>{
            e.stopPropagation();
            index.dispatch(showModal({ show_modal: !index.getState().show_modal }));
        };
        */
    }

    render(){

        //const { show_modal, modal_data } = index.getState();

        const show_modal = false;
        const modal_data = {};

        let classModalState = '';
        if(show_modal){
            classModalState = ' show';
        }

        return(
            <div className={'ModalWindow-block' + classModalState}>
                <div
                    className="bg-modal"
                    onClick={ this.modalToggle }
                >
                </div>
                <div className="modal-block">
                    <div className="modal-header">
                        { modal_data.header }
                        <div className="modal-close" onClick={ this.modalToggle }>
                            <FontAwesomeIcon icon={ faTimes }/>
                        </div>
                    </div>
                    <div className="modal-content">
                        { modal_data.content }
                    </div>
                </div>
            </div>
        );
    }
}

export default ModalWindow;