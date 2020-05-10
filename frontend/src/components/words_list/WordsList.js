import React, { Component } from 'react';
import './WordsList.css';

import ReactTooltip from 'react-tooltip';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faInfoCircle } from '@fortawesome/free-solid-svg-icons';
import store from "./../../store";

class WordsList extends Component{

    constructor(props){
        super(props);

        this.state = {
            words: [],
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

            voices.map((voice) => {
                if(voice.lang === 'fr-FR'){
                    lang = true;
                }
            });
            if(!lang){

                alert('Ваш браузер не поддерживает Французкий язык. Используйте Chrome.')
            }
        };

        this.voice = (e) =>{
            const el = e.currentTarget;

            //let wordUrl = encodeURI(el.querySelector('.word-text').innerHTML);
            let word_text = el.querySelector('.word-text').innerHTML;

            this.speak(word_text);
            this.checkSpeak();
        };

        // Запускаем пустую функцию проговаривания текста для подгрузки массива
        // со списком поддерживаемых языков
        this.speak('');
    }

    render(){

        const { words } = store.getState().page_data;
        //const words = {};

        return(
            <div className="WordsList-block">
                <div className="panel">
                    <div className="panel_header" data-tip data-for="tooltipHeaderWordsBlock">
                        Слова
                        <ReactTooltip clssName="tooltip-header" id="tooltipHeaderWordsBlock" effect="solid" delayShow={1000} className="tooltip-header">
                            les mots
                        </ReactTooltip>
                    </div>
                    <div className="panel_content">
                        <ul>
                            {
                                Object.keys(words).map(key => {
                                    return (
                                        <li key={ words[key].id } title={ words[key].transcription } onClick={ this.voice }>
                                            <FontAwesomeIcon icon={faInfoCircle}/> <span className="word-text">{ words[key].word }</span> - <span className="translation">{ words[key].translation }</span>
                                        </li>
                                    )
                                })
                            }
                        </ul>
                    </div>
                </div>
            </div>
        );
    }
}

export default WordsList;