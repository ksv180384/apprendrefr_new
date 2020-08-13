import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import { createBrowserHistory } from 'history';

import WordModalContent from '../../components/words_list/WordModalContent';

import { loadSearch, removeSearch } from '../../store/actions/searchActions';
import { loadSong } from '../../store/actions/playerActons';
import { loadWord } from '../../store/actions/wordActions';
import { modalShow, modalSetContent, modalSetHeader } from '../../store/actions/modalActions';


import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch, faTimes, faEye, faLink } from '@fortawesome/free-solid-svg-icons';

import './Search.css';

const history = createBrowserHistory();

class Search extends Component{

    constructor(props){
        super(props);

        this.state = {
            word: '',
            show_select: false,
            select_title: 'слово',
            type: 'word',
            lang: null,
        };

        this.toggleVisibleSelect = () => {
            this.setState({
                ...this.state,
                show_select: !this.state.show_select,
            });
        };

        this.selectSearchType = (e) => {
            e.stopPropagation();
            const el = e.currentTarget;
            let select_title = el.innerHTML;
            let type = el.getAttribute('data-search-type');

            this.setState({
                ...this.state,
                show_select: false,
                select_title: select_title,
                type: type,
            });
        };

        this.changeSearch = (e) => {
            let search_text = e.currentTarget.value;
            search_text = search_text.trim();
            //if(search_text.length < 1){
                this.setState({
                    ...this.state,
                    word: search_text,
                    lang: this.langSearch(search_text),
                });
            //}

            //console.log(this.langSearch(search_text));

            if(search_text.length < 3){
                this.props.removeSearch();
                return true;
            }

            if(search_text.length > 1) {
                const search_form = document.getElementById('searchForm');
                const formData = new FormData(search_form);
                this.props.loadSearch(formData);
            }

        };

        // Определяем язык на котором пишет пользователь
        this.langSearch = (text) => {
            const fr_pattern = /[a-zëôêûâîùçèàé]+/i;
            const ru_pattern = /[а-яё]+/i;
            const fr = fr_pattern.test(text);
            const ru = ru_pattern.test(text);
            if(text.length >= 1){
                if(fr && ru){
                    return 'non';
                }else{
                    if(fr){
                        return 'fr';
                    }else{
                        return 'ru';
                    }
                }
            }
            return null;
        };

        this.searchList = (search_result, type) => {
            if(search_result === undefined || search_result.length === 0){
                return '';
            }
            if(type === 'song'){
                let result = Object.keys(search_result).map((key) => {
                    if(!search_result[key].title){
                        return '';
                    }
                    return (
                        <li key={ search_result[key].id } data-id={ search_result[key].id } onClick={ this.selectSong }>
                            <span className="search-artist-name">{ search_result[key].artist_name }</span>
                            { search_result[key].title }
                            <Link to={ '/lyrics/item/' + search_result[key].id } className="link ml-10"><FontAwesomeIcon icon={ faLink }/></Link>
                        </li>
                    )
                });
                return result;
            }else{
                let result = Object.keys(search_result).map((key) => {
                    if(!search_result[key].word){
                        return '';
                    }
                    return (
                        <li key={ search_result[key].id }
                            onClick={ this.selectWord }
                        >
                            <span className="inline-block mr-10" onClick={ this.selectViewWord }
                                  data-word={ this.state.lang === 'ru' ? search_result[key].translation : search_result[key].word }
                                  data-id={ search_result[key].id }
                            ><FontAwesomeIcon icon={ faEye }/></span>
                            <span className="text-search-item">
                                { this.state.lang === 'ru' ? search_result[key].translation : search_result[key].word }
                             </span>
                        </li>
                    )
                });
                return result;
            }
        };

        this.selectSong = (e) => {
            const el = e.currentTarget;
            const id = el.getAttribute('data-id');
            document.getElementById('searchHeader').value = '';
            this.props.removeSearch();
            this.props.loadSong(id);
            this.setState({
                ...this.state,
                lang: null,
            });
        };

        this.selectWord = (e) => {
            const el = e.currentTarget;
            const text = el.querySelector('.text-search-item').innerHTML;
            //document.getElementById('searchHeader').value = text;
            this.props.removeSearch();

            this.setState({
                ...this.state,
                word: text,
                //lang: null,
            });
            document.getElementById('searchHeader').focus();
        };

        this.selectViewWord = (e) => {
            e.stopPropagation();
            const el = e.currentTarget;
            const id = el.getAttribute('data-id');
            const word_text = el.getAttribute('data-word');

            this.props.loadWord(id);
            this.props.modalSetHeader(word_text);
            this.props.modalSetContent(<WordModalContent/>);
            this.props.modalShow();
        };

        this.submitSearch = (e) => {
            e.preventDefault();
            if(this.state.type === 'word'){
                //history.push('/word/search/' + this.state.word + '/' + this.state.lang);
                location.href = '/word/search/' + this.state.word + '/' + this.state.lang;
            }
        }
    }

    render(){

        const { show_select, select_title, type, lang, word } = this.state;
        const { search_result } = this.props;
        const select_class = show_select ? 'show' : '';

        const lang_class = lang ? ' show-lang show-' + lang : '';
        const show_search_result = search_result === undefined || search_result.length === 0 ? '' : ' show-search-result';

        return(
            <form action="/" method="POST" id="searchForm" onSubmit={ this.submitSearch }>
                <div className="search">
                    <div className="select" onClick={ this.toggleVisibleSelect }>
                        <span>{ select_title }</span>
                        <ul className={ select_class }>
                            <li data-search-type="word" onClick={ this.selectSearchType }>слово</li>
                            <li data-search-type="song" onClick={ this.selectSearchType }>песню</li>
                        </ul>
                    </div>
                    <div className="input-search">
                        <input id="searchHeader"
                               type="text"
                               name="search"
                               placeholder="Поиск..."
                               autoComplete="off"
                               value={ word }
                               onChange={ this.changeSearch }
                        />
                        <input type="hidden" name="type" value={ type }/>
                        <input type="hidden" name="lang" value={ lang ? lang : 'fr' }/>
                        <div className={ 'search-lang' + lang_class }>
                            <span className="search-lang-ru">Ru</span>
                            <span className="search-lang-fr">Fr</span>
                            <span  className="search-lang-non"><FontAwesomeIcon icon={ faTimes }/></span>
                        </div>
                        <div className={'search-result-list' + show_search_result }>
                            <ul>
                                { this.searchList(search_result, type) }
                            </ul>
                        </div>
                    </div>
                    <div className="btn-block">
                        <button type="submit">
                            <FontAwesomeIcon icon={faSearch} />
                        </button>
                    </div>
                </div>
            </form>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        search_result: state.searchReducer.search,
    }
};


export default connect(mapStateToProps, {
    loadSearch,
    loadSong,
    removeSearch,
    modalShow,
    modalSetContent,
    modalSetHeader,
    loadWord
})(Search);