import React from 'react';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faPlay} from "@fortawesome/free-solid-svg-icons/index";

import { speak, checkSpeak } from '../../plagins/Speak';

const SearchWordItem = (props) => {

    speak('');
    const speakWord = (e) => {
        const { word } = e.currentTarget.dataset;
        checkSpeak();
        speak(word);
    };

    const { word, transcription, translation, example } = props;

    return(
        <div className="WordSearchContent">
            <ul>
                <li>
                    <span onClick={ speakWord } data-word={ word }>
                        <FontAwesomeIcon icon={ faPlay }/>
                    </span>
                    { word }
                </li>
                <li>
                    { transcription }
                </li>
                <li className="translation">
                    { translation }
                </li>
            </ul>
            <div className="modal-example-block" dangerouslySetInnerHTML={{__html: example}}/>
        </div>
    );
};

export default SearchWordItem;