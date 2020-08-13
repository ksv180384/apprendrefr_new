import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faBars, faTimes} from "@fortawesome/free-solid-svg-icons/index";

// components
import TestRu from './TestRu';
import TestFr from './TestFr';
import { getPageItem } from "../../store/actions/lessonsActions";
import {setLoaderPage} from "../../store/actions/loaderPageActions";
import store from "../../store";

class Content extends Component{

    constructor(props){
        super(props);

        this.state = {
            show_menu_block: false
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
/*
            if(!lang){
                alert('Ваш браузер не поддерживает Французкий язык. Используйте Chrome.');
            }
            */
            return lang;
        };

        this.speak('');

        this.voice = (e) => {
            const el = e.currentTarget;
            const el_text = el.parentNode.querySelector('strong');
            this.checkSpeak();
            this.speak(el_text.innerText);
        };

        this.loadContent = (e) => {
            const el = e.target.parentNode;
            this.toggleMenuContent();
            const id = el.getAttribute('data-id-page');
            store.dispatch(setLoaderPage(true));
            this.props.getPageItem('api/lessons/item/' + (id ? id : 0), () => {
                store.dispatch(setLoaderPage(false));
            });
        };

        this.toggleMenuContent = (e) => {
            this.setState({ ...this.state, show_menu_block: !this.state.show_menu_block });
        };
    }

    componentDidMount(){
        let play_bth = document.querySelectorAll('.lesson-play-btn');
        if(play_bth.length > 0){
            for (let i = 0; i < play_bth.length; i++) {
                let btn = play_bth[i];
                btn.addEventListener('click', this.voice);
            }
        }
    }

    componentDidUpdate(prevProps) {
        let play_bth = document.querySelectorAll('.lesson-play-btn');
        if(play_bth.length > 0){
            for (let i = 0; i < play_bth.length; i++) {
                let btn = play_bth[i];
                btn.addEventListener('click', this.voice);
            }
        }
    }

    render(){
        const { content_page, menu } = this.props;
        const { show_menu_block } = this.state;

        let class_show_menu_block = '';
        if(show_menu_block){
            class_show_menu_block = ' show-menu-block';
        }

        return(
            <div className={ 'Grammar-content-block' + class_show_menu_block }>
                <div className="show-menu-content-block-btn" onClick={ this.toggleMenuContent }>
                    <FontAwesomeIcon icon={ faBars }/>
                </div>
                {
                    content_page
                        ?
                        <React.Fragment>
                            <div className="panel_header"><h1>{ content_page.title }</h1></div>
                            <div className="g-content-block p-10" dangerouslySetInnerHTML={ {__html: content_page.content } }/>
                            <div className="lesson-test-block">
                                <TestRu/>
                                <TestFr/>
                            </div>
                        </React.Fragment>
                        :
                        <div>
                            <div className="panel_header"><h1>Уроки французского языка</h1></div>
                            <div className="g-content-block p-10">
                                <strong>Каждый урок французского языка для начинающих представлен в виде темы для общения.</strong><br/>
                                В первой части урока приводится список слов (с переводом и произношением), которые будут использованы в третей части.<br/>
                                Во второй части урока изучаем грамматику французского языка. Грамматики в первых уроках совсем немного, так как поначалу приходиться учить много новых слов.<br/>
                                В третей части урока французского языка учим фразы относящиеся к теме урока.<br/>
                                На сайте используется русская транскрипция французских слов, которая довольно плохо переносит истинное звучание слов. Особенно вам будет плохо понятно как произносится слово, если вы не часто слышали французскую речь. Поэтому для лучшего понимания, рядом с каждым новым словом есть аудио запись с его произношением.<br/>
                                Но и этого мало, поначалу будет трудно разделять слова во фразах на слух, слова будут сливаться, похожие слова будут путаться, поэтому надо как можно больше слушать французскую речь, например: телевизор, радио, аудиокниги, фильмы с субтитрами.<br/>
                                {/*На сайте есть несколько аудио книг с текстом в разделе «Сказки».<br/>*/}
                                В конце каждого урока есть тесты, проходя эти тесты вы гораздо лучше запомните слова. Каждый тест желательно проходить несколько раз, пока не начнете писать перевод как в одну так и в другую сторону не задумываясь и без ошибок.<br/>
                            </div>
                        </div>
                }

                <div className="menu-content-block">
                    <div className="Grammar-menu-block">
                        <div className="close-content-menu" onClick={ this.toggleMenuContent }>
                            <FontAwesomeIcon icon={ faTimes }/>
                        </div>
                        {
                            menu
                                ?
                                <ul>
                                    <li className={content_page === undefined ? 'active' : ''}>
                                        <Link to={'/lessons'}
                                              className="link"
                                              onClick={ this.loadContent }
                                              data-id-page={ 0 }
                                        >0. Вступление</Link>
                                    </li>
                                    {
                                        menu.map((item) => {
                                            return <li key={item.id}
                                                       className={content_page.id === item.id ? 'active' : ''}
                                                       onClick={ this.loadContent }
                                                       data-id-page={item.id}>
                                                <Link to={'/lessons/item/' + item.id}
                                                      className="link">{item.title}</Link>
                                            </li>
                                        })
                                    }
                                </ul>
                                :
                                <div>пусто</div>
                        }
                    </div>
                </div>
            </div>
        );
    }
};

const mapStateToProps = (state) => {
    return {
        content_page: state.lessonsReducer.item,
        menu: state.lessonsReducer.list,
    }
};

export default connect(mapStateToProps, { getPageItem, setLoaderPage })(Content);