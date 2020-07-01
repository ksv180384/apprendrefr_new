import React, { Component } from 'react';
import { connect } from 'react-redux';
import { loadWord } from '../../store/actions/wordActions';
import { modalShow, modalSetHeader, modalSetContent } from '../../store/actions/modalActions';

import ReactTooltip from 'react-tooltip';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faInfoCircle } from '@fortawesome/free-solid-svg-icons';

import WordModalContent from './WordModalContent';

import './WordsList.css';

class WordsList extends Component{

    constructor(props){
        super(props);

        // Показываем модальное окно с информацией слова
        this.showModalWord = (e) => {
            const el = e.currentTarget;
            let word_text = el.querySelector('.word-text').innerHTML;

            this.props.loadWord(el.getAttribute('data-id'));
            this.props.modalSetHeader(word_text);
            this.props.modalSetContent(<WordModalContent/>);
            this.props.modalShow();
        };


    }

    render(){

        const { words } = this.props;

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
                        {
                            typeof words !== 'undefined' && words.length > 0
                            ?
                            <ul>
                                {
                                    Object.keys(words).map(key => {
                                        return (
                                            <li key={ words[key].id }
                                                title={ words[key].transcription }
                                                data-id={ words[key].id }
                                                onClick={ this.showModalWord }
                                            >
                                                <FontAwesomeIcon icon={faInfoCircle}/> <span className="word-text">
                                                { words[key].word }
                                                </span> - <span className="translation">{ words[key].translation }</span>
                                            </li>
                                        )
                                    })
                                }
                            </ul>
                            :
                            <div>
                                Loading
                            </div>
                        }

                    </div>
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        words: state.wordReducer.list
    };
};

export default connect(mapStateToProps, { modalShow, modalSetHeader, modalSetContent, loadWord })(WordsList);