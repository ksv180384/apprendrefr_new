import React, { Component } from 'react';
import { connect } from 'react-redux';

// actions
import { modalShow, modalSetHeader, modalSetContent } from '../../store/actions/modalActions';

//components
import TestBlock from './TestBlock';

class TestRu extends Component{

    constructor(props){
        super(props);

        this.start = () => {

            this.props.modalShow();
            this.props.modalSetHeader('Переведите с русского на французский');
            this.props.modalSetContent(<TestBlock typeAnswer="ru" typeQuestion="fr"/>);
        }
    }

    render(){
        return(
            <button className="lesson-btn-test" onClick={ this.start }>Проверка зананий RU => FR</button>
        );
    }
}

export default connect(null, {modalShow, modalSetHeader, modalSetContent,})(TestRu);