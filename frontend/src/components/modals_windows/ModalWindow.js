import React, { Component } from 'react';
import { connect } from 'react-redux';
import { modalHide } from '../../store/actions/modalActions';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
//import index from "../../store/store";
//import { showModal } from "../../store/actions";

//import Preloader from './../../components/preloader/Preloader';
//import Preloader from "../preloader/Preloader";

import './ModalWindow.css';

class ModalWindow extends Component{

    constructor(props){
        super(props);

        this.modalHide = () => {
            this.props.modalHide();
        };
    }

    render(){

        const { show, header, content } = this.props.modal_state;

        let classModalState = '';
        if(show){
            classModalState = ' show';
        }

        return(
            <div className={'ModalWindow-block' + classModalState}>
                <div
                    className="bg-modal"
                    onClick={ this.modalHide }
                >
                </div>
                <div className="modal-block">
                    <div className="modal-header">
                        { show ? header : '' }
                        <div className="modal-close" onClick={ this.modalHide }>
                            <FontAwesomeIcon icon={ faTimes }/>
                        </div>
                    </div>
                    <div className="modal-content">
                        { show ? content : '' }
                    </div>
                </div>
            </div>
        );
    }
}

const mapToStateFromProps = (state) => {
    return {
        modal_state: state.modalReducer,
    }
};

export default connect(mapToStateFromProps, { modalHide })(ModalWindow);