import React from 'react';
import { connect } from 'react-redux';

import { speak, checkSpeak } from '../../plagins/Speak';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faPlay} from "@fortawesome/free-solid-svg-icons/index";

const WordItem = (props) => {

    const { word, meta_data } = props;

    const speakWord = (e) => {
        const { word } = e.currentTarget.dataset;
        checkSpeak();
        speak(word);
    };

    return(

        word
            ?
            <div className="WordItemPage">
                <div className="panel_header">{ meta_data.title }</div>
                <div className="WordModalContent">
                    <ul>
                        <li>
                    <span onClick={ speakWord } data-word={ word.word }>
                        <FontAwesomeIcon icon={ faPlay }/>
                    </span>
                            { word.word }
                        </li>
                        <li>
                            { word.transcription }
                        </li>
                        <li className="translation">
                            { word.translation }
                        </li>
                    </ul>
                    <div className="modal-example-block" dangerouslySetInnerHTML={{__html: word.example}}/>
                </div>
            </div>
            :
            ''

    )
};

const mapStateToProps = (state) => {
    return {
        word: state.wordPageReducer.word,
        meta_data: state.metaReducer,
    }
};

export default connect(mapStateToProps, {})(WordItem);