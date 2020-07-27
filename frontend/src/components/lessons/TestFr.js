import React, { Component } from 'react';
import { connect } from 'react-redux';

// actions
import { modalShow, modalSetHeader, modalSetContent } from '../../store/actions/modalActions';

//components
import TestBlock from './TestBlock';

class TestFr extends Component{

    constructor(props){
        super(props);

        this.start = () => {
            this.props.modalShow();
            this.props.modalSetHeader('Переведите с французского на русский');
            this.props.modalSetContent(<TestBlock typeAnswer="fr" typeQuestion="ru"/>);
        }
    }

    render(){
        return(
            <button className="lesson-btn-test" onClick={ this.start }>Проверка зананий FR => RU</button>
        );
    }
}

export default connect(null, {modalShow, modalSetHeader, modalSetContent,})(TestFr);