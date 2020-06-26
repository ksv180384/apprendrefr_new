import React, { Component } from 'react';
import { connect } from 'react-redux';
import { modalShow, modalSetHeader, modalSetContent } from '../../../store/actions/modalActions';
import { loadTestYourselfData } from '../../../store/actions/testYourselfActions';

import TestYourSelfContent from './TestYourselfContent';

import './TestYourself.css';


class TestYourself extends Component{

    constructor(props){
        super(props);

        this.showModal = () => {
            this.props.loadTestYourselfData();
            this.props.modalShow();
            this.props.modalSetHeader('Проверь себя');
            this.props.modalSetContent(<TestYourSelfContent/>);
        };
    }

    render(){

        return(
            <div className="TestYourself-block">
                <button onClick={ this.showModal }>Проверь себя</button>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        modal_state: state.modalReducer,
    }
};

export default connect(mapStateToProps, {
    modalShow,
    modalSetHeader,
    modalSetContent,
    loadTestYourselfData
})(TestYourself);