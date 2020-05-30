import React, { Component } from 'react';
import './LearningWrite.css';
//import { showModal } from "../../../store/actions";
//import index from "../../../store/store";

class LearningWrite extends Component{

    constructor(){
        super();

        this.showModal = () => {
            //index.dispatch(showModal({ show_modal: true }));
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