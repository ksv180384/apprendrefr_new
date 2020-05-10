import React, { Component } from 'react';
import './LearningWrite.css';
import { showModal } from "../../../actions";
import store from "../../../store";

class LearningWrite extends Component{

    constructor(){
        super();

        this.showModal = () => {
            store.dispatch(showModal({ show_modal: true }));
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

export default LearningWrite;