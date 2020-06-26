import React, { Component } from 'react';
import { connect } from 'react-redux';

import ModalLoader from '../modals_windows/ModalLoader';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faPlay} from "@fortawesome/free-solid-svg-icons/index";

class WordModalContent extends Component{

    constructor(props){
        super(props);

        this.speakWord = (e) => {
            const el = e.currentTarget;

            //let wordUrl = encodeURI(el.querySelector('.word-text').innerHTML);
            let word_text = el.getAttribute('data-word');

            this.speak(word_text);
            this.checkSpeak();
        };

        this.speak = (word) =>{
            const speech = new SpeechSynthesisUtterance();

            speech.lang = 'fr-FR';
            speech.rate = .8;
            speech.pitch = 1;
            speech.volume = 1;
            speech.text = word;
            window.speechSynthesis.cancel();
            window.speechSynthesis.speak(speech);
        };

        this.checkSpeak = () => {
            const voices = window.speechSynthesis.getVoices();
            let lang = false;

            for(let key in voices){
                if(voices[key].lang === 'fr-FR'){
                    lang = true;
                }
            }

            if(!lang){
                alert('Ваш браузер не поддерживает Французкий язык. Используйте Chrome.')
            }
            return lang;
        };

        // Запускаем пустую функцию проговаривания текста для подгрузки массива
        // со списком поддерживаемых языков
        this.speak('');
    }

    render(){

        const { item, loading_item } = this.props.content;

        return(
            <React.Fragment>
                {
                    loading_item
                    ?
                        <ModalLoader/>
                    :
                        <div className="WordModalContent">
                            <ul>
                                <li>
                                    <span onClick={ this.speakWord } data-word={ item.word }>
                                        <FontAwesomeIcon icon={ faPlay }/>
                                    </span>
                                    { item.word }
                                </li>
                                <li>
                                    { item.translation }
                                </li>
                                <li className="translation">
                                    { item.translation }
                                </li>
                            </ul>
                            <div className="modal-example-block" dangerouslySetInnerHTML={{__html: item.example}}/>
                        </div>
                }

            </React.Fragment>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        content: state.wordReducer,
    }
};

export default connect(mapStateToProps, {})(WordModalContent);