import React, { Component } from 'react';
import { connect } from 'react-redux';
import { modalShow, modalSetContent, modalSetHeader } from '../../../store/actions/modalActions';
import { loadLearningWriteContent, setLoadLearningWrite, removeLearningWrite } from '../../../store/actions/learningWriteActions';
import { store as storeNotification } from 'react-notifications-component';

import LearningWriteContent from './LearningWriteContent';

import './LearningWrite.css';

class LearningWrite extends Component{

    constructor(){
        super();

        this.state = {
            header: '',
            content: '',
            word: 'word',
            translation: '',

        };

        this.showModal = (e) => {
            this.props.removeLearningWrite();
            this.props.modalShow();
            this.props.loadLearningWriteContent();
            this.props.modalSetHeader('Учимся писать');
            this.props.modalSetContent(<LearningWriteContent/>);
        };

    }

    render(){

        return(
            <div className="LearningWrite-block">
                <button onClick={ this.showModal }>Учимся писать</button>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        modal_state: state.modalReducer,
        learning_write: state.learningWriteReducer,
    }
};

export default connect(mapStateToProps, {
    modalShow,
    loadLearningWriteContent,
    modalSetContent,
    modalSetHeader,
    setLoadLearningWrite,
    removeLearningWrite
})(LearningWrite);