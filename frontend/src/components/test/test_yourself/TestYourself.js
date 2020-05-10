import React, { Component } from 'react';
import './TestYourself.css';


import { showModal } from './../../../actions';
import store from "../../../store";

class TestYourself extends Component{

    constructor(){
        super();

        this.showModal = () => {
            store.dispatch(showModal({ show_modal: true }));
        }
    }

    render(){

        return(
            <div className="TestYourself-block">
                <button onClick={ this.showModal }>Проверь себя</button>
            </div>
        );
    }
}

export default TestYourself;