import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import { speak, checkSpeak } from '../../plagins/Speak';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlay, faExternalLinkAlt } from '@fortawesome/free-solid-svg-icons';

// actions
import { getPagePaginate, setLang } from '../../store/actions/wordsPageActions';
import { loadWord } from '../../store/actions/wordActions';
import { modalSetHeader, modalSetContent, modalShow } from '../../store/actions/modalActions';

// components
import Paginate from '../paginate/Paginate';
import WordPreview from "./WordPreview";
import WordModalContent from '../words_list/WordModalContent';

class WordsList extends Component{

    constructor(){
        super();

        this.state = {
            preview_show: false,
            preview_word: '',
            preview_translation: '',
            preview_transcription: '',
        };

        this.loadWords = (path, params) => {
            this.props.getPagePaginate(path, { ...params, pos: this.props.pos_select, lang: this.props.lang });
        };

        this.changeLang = (e) => {
            const el = e.target;
            const lang = el.innerText.toLowerCase();
            this.props.getPagePaginate('api/word/list-paginate', { page: 1, pos: this.props.pos_select, lang: lang });
        };

        this.changePos = (e) => {
            const { id } = e.target.dataset;
            this.props.getPagePaginate('api/word/list-paginate', { page: 1, pos: id, lang: this.props.lang });
        };

        this.showPreview = (e) => {
            const { translation, transcription } = e.currentTarget.dataset;
            this.setState({
                ...this.state,
                preview_show: true,
                preview_translation: translation,
                preview_transcription: transcription,
            });
        };

        this.hidePreview = (e) => {
            this.setState({ ...this.state, preview_show: false });
        };

        // Показываем модальное окно с информацией слова
        this.showModalWord = (e) => {
            const el = e.currentTarget;
            const { id } = e.currentTarget.dataset;
            let word_text = el.innerHTML;

            this.props.loadWord(id);
            this.props.modalSetHeader(word_text);
            this.props.modalSetContent(<WordModalContent/>);
            this.props.modalShow();
        };

        speak('');
        this.speakWord = (e) => {
            const { word } = e.currentTarget.dataset;
            checkSpeak();
            speak(word);
        }
    }


    render(){
        const {
            title, list, last_page, per_page, to, from, current_page, total, pos_select,
            pos_list, lang
        } = this.props;

        return(
            <div className="WordsListPage-block">
                <div className="panel_header">{ title ? title : '' }</div>
                <ul className="pos-select-list">
                    <li
                        className={ pos_select === 0 ? 'pos-select-active' : '' }
                        title="Все"
                        onClick={ this.changePos }
                    >
                        <Link to={ '/dictionary/' + 0 + '/' + lang + '/page/1' } data-id="0">Все</Link>
                    </li>
                    {
                        pos_list.map((item) => {
                            return (
                                <li key={ item.id }
                                    title={ item.title }
                                    className={ parseInt(pos_select, 10) === parseInt(item.id, 10) ? 'pos-select-active' : '' }
                                >
                                    <Link to={ '/dictionary/' + item.id + '/' + lang + '/page/1' }
                                          data-id={ item.id }
                                          onClick={ this.changePos }
                                    >{ item.title }</Link>
                                </li>
                            )
                        })
                    }
                </ul>
                <Paginate current_page={ current_page }
                          last_page={ last_page }
                          per_page={ per_page }
                          to={ to }
                          total={ total }
                          path={ '/dictionary/' + pos_select + '/' + lang }
                          paginate_path={ '/word/list-paginate' }
                          loadPaginate={ this.loadWords }
                />
                {
                    list
                        ?
                        <ul className="WordsListPage-list">
                            <ul className="lang-select-block">
                                <li className={ this.props.lang === 'fr' ? 'lang-select-active' : '' } onClick={ this.changeLang }>
                                    <Link to={ '/dictionary/' + pos_select + '/fr/page/1' }>fr</Link>
                                </li>
                                <li className={ this.props.lang === 'ru' ? 'lang-select-active' : '' } onClick={ this.changeLang }>
                                    <Link to={ '/dictionary/' + pos_select + '/ru/page/1' }>ru</Link>
                                </li>
                            </ul>
                            {
                                list.map((item) => {
                                    return (
                                        <li key={ item.id }
                                            data-id={ item.id }
                                            data-word={ item.word }
                                            data-translation={ item.translation }
                                            data-transcription={ item.transcription }
                                            onMouseEnter={ this.showPreview }
                                            onMouseLeave={ this.hidePreview }
                                        >

                                            <div className="WordsListPage-word-item">
                                                <span className="question_voice"
                                                      title="Произношение"
                                                      data-word={ item.fr }
                                                      onClick={ this.speakWord }
                                                >
                                                    <FontAwesomeIcon icon={ faPlay }/>
                                                </span>
                                                <span className="WordsListPage-word-item-text"
                                                      data-id={ item.id }
                                                      title={ item.word }
                                                      onClick={ this.showModalWord }
                                                >
                                                    { item.word }
                                                </span>
                                            </div>
                                            <small className="mt-5">
                                                <Link to={ '/dictionary/word/' + item.id } className="link mr-5" title="Перейти на страницу с переводом">
                                                    <FontAwesomeIcon icon={ faExternalLinkAlt }/>
                                                </Link>
                                                { item.pos_title }
                                            </small>
                                        </li>
                                    )
                                })
                            }
                        </ul>
                        :
                        <div>пусто</div>
                }
                <Paginate current_page={ current_page }
                          last_page={ last_page }
                          per_page={ per_page }
                          to={ to }
                          total={ total }
                          path={ '/dictionary/' + pos_select + '/' + lang}
                          paginate_path={ '/word/list-paginate/' }
                          loadPaginate={ this.loadWords }
                />
                <WordPreview show={ this.state.preview_show }
                             word={ this.state.preview_word }
                             translation={ this.state.preview_translation }
                             transcription={ this.state.preview_transcription }
                />
            </div>
        )
    }
};

const mapStateToProps = (state) => {
    return {
        list: state.wordsPageReducer.list,
        last_page: state.wordsPageReducer.last_page,
        per_page: state.wordsPageReducer.per_page,
        to: state.wordsPageReducer.to,
        from: state.wordsPageReducer.from,
        current_page: state.wordsPageReducer.current_page,
        total: state.wordsPageReducer.total,
        pos_select: state.wordsPageReducer.pos_select,
        pos_list: state.wordsPageReducer.pos_list,
        lang: state.wordsPageReducer.lang,
        title: state.metaReducer.title,
    }
};

export default connect(mapStateToProps, {
    getPagePaginate,
    setLang,
    loadWord,
    modalSetHeader,
    modalSetContent,
    modalShow
})(WordsList);