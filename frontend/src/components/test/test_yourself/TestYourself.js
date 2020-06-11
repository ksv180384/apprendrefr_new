import React, { Component } from 'react';
import { connect } from 'react-redux';
import { modalShow } from '../../../store/actions/modalActions';

import './TestYourself.css';


class TestYourself extends Component{

    constructor(){
        super();

        this.showModal = () => {
            this.props.modalShow();
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

export default connect(mapStateToProps, { modalShow })(TestYourself);