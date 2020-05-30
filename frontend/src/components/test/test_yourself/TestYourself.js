import React, { Component } from 'react';
import './TestYourself.css';


//import { showModal } from '../../../store/actions';
//import index from "../../../store/store";

class TestYourself extends Component{

    constructor(){
        super();

        this.showModal = () => {
            //index.dispatch(showModal({ show_modal: true }));
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