import React, { Component } from 'react';
import { connect } from 'react-redux';
import { modalShow, modalSetContent, modalSetHeader } from '../../../store/actions/modalActions';
import { loadLearningWriteContent, setLoadLearningWrite } from '../../../store/actions/learningWriteActions';
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
            this.props.modalShow();
            this.props.loadLearningWriteContent();
            this.props.modalSetHeader('Учимся писать');
            this.props.modalSetContent(<LearningWriteContent/>);
        };

        this.showError = (error_message) => {
            storeNotification.addNotification({
                title: 'Ошибка авторизации',
                message: error_message,
                type: "danger",
                insert: "top",
                container: "top-right",
                animationIn: ["animated", "fadeIn"],
                animationOut: ["animated", "fadeOut"],
                dismiss: {
                    duration: 10000,
                    showIcon: true,
                    onScreen: true
                }
            });
        };
    }

    componentDidMount(){

    }

    static getDerivedStateFromProps(props, state){
        // Если при отправке формы регистрации произошла ошибка, то ловим ее тут
        // Формируем текст ошибки и показываем оповещение
        if(props.modal_state.error){
            //console.log(props.modal_state);
            //console.log(props.modal_state.error_message);
            //this.showError(props.modal_state.error_message);
        }
        return null;
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
    setLoadLearningWrite
})(LearningWrite);