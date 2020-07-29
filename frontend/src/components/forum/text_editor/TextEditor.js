import  React, { Component } from 'react';
import { connect } from 'react-redux';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEraser, faTimes, faCheck, faLink, faImage, faQuoteRight } from '@fortawesome/free-solid-svg-icons';

// components
import BtnLoad from '../../../components/btn_load/BtnLoad';

// actions
import { removeQuotes } from "../../../store/actions/quotesActions";

import './TextEditor.css';

class TextEditor extends Component{

    constructor(props){
        super(props);

        this.state = {
            text: '',
            link_window_is_visible: false,
            img_window_is_visible: false,
            smiles_window_is_visible: false,
            selection: null, // объек для управления выделенным текстом
            range: null, // объек для управления выделенным текстом
            link_text: '',
            link_url: '',
            img_url: '',
        };

        this.textEditor = (target) => {
            //const el = e.target;
            //console.log(this);
            //const editor = el.closest('.TextEditor');
            //const text = editor.querySelector('.text');
            //console.log(target.innerHTML);
            //console.log(this.state.text);
            this.setState({ ...this.state, text: target.innerHTML });
        };

        this.textInput = (e) => {

            this.setState({ ...this.state, [e.target.name]: e.target.value });
        };

        this.bold = (e) => {
            document.execCommand( 'bold', false, null );
            this.imitateEvent(e);
        };

        this.italic = (e) => {
            document.execCommand( 'italic', false, null );
            this.imitateEvent(e);
        };

        this.underline = (e) => {
            document.execCommand( 'underline', false, null );
            this.imitateEvent(e);
        };

        this.strike = (e) => {
            document.execCommand( 'strikeThrough', false, null );
            this.imitateEvent(e);
        };

        this.removeFormat = (e) => {
            document.execCommand( 'removeFormat', false, null );
            this.imitateEvent(e);

        };

        this.blockQuote = (e) => {
            const selection = window.getSelection();
            let range = window.getSelection().getRangeAt(0);
            const el = selection.anchorNode.parentNode;
            if(!el.closest('.text') && !el.classList.contains('text') && !el.classList.contains('editor')){
                return true;
            }

            if(selection.toString()){
                let blockquote = document.createElement('blockquote');
                blockquote.innerHTML = selection.toString();
                range.deleteContents();
                range.insertNode(blockquote);
            }
            if(this.props.quotes.length > 0){
                const br = document.createElement('br');
                range.insertNode(br);
                for (let k in this.props.quotes){
                    let blockquote = document.createElement('blockquote');
                    blockquote.innerHTML = this.props.quotes[k].content;
                    range.insertNode(blockquote);
                }
                this.props.removeQuotes();
            }
            //document.execCommand( 'formatBlock', false, 'blockquote' );
            const editor_content = e.target.closest('.TextEditor').querySelector('.text').innerHTML;
            this.setState({
                ...this.state,
                text: editor_content,
            });

        };

        // Показываем окно для добавления ссылки
        this.createLinkShowWindow = (e) => {
            let selection = null;
            let range = null;
            let link_text = '';
            let link_window_is_visible = false;

            if(window.getSelection().rangeCount > 0){
                selection = window.getSelection();
                range = window.getSelection().getRangeAt(0);
                link_text = window.getSelection().toString();
                link_window_is_visible = true;

                const el = selection.anchorNode.parentNode;
                if(!el.closest('.text') && !el.classList.contains('text') && !el.classList.contains('editor')){
                    return true;
                }
            }

            this.setState({
                ...this.state,
                link_window_is_visible: link_window_is_visible,
                selection: selection,
                range: range,
                link_text: link_text,
                link_url: '',
            });
        };

        this.createImgShowWindow = (e) => {
            let selection = window.getSelection();
            let range = window.getSelection().getRangeAt(0);
            const img_window_is_visible = true;

            const el = selection.anchorNode.parentNode;
            if(!el.closest('.text') && !el.classList.contains('text') && !el.classList.contains('editor')){
                return true;
            }

            this.setState({
                ...this.state,
                selection: selection,
                range: range,
                img_url: '',
                img_window_is_visible: img_window_is_visible,
            });
        };

        this.hideLinkWindow = () => {
            this.setState({
                ...this.state,
                selection: null,
                range: null,
                link_text: '',
                link_url: '',
                img_url: '',
                link_window_is_visible: false,
                img_window_is_visible: false,
                smiles_window_is_visible: false,
            });
        };

        // Формирует и добавляет ссылку в текстовое поле
        this.addLink = (e) => {
            let link_text = this.state.link_url;
            if(this.state.link_text){
                link_text = this.state.link_text;
            }
            // Проверяем является ли строка link_urk ссылкой
            const pattern = /(^https?:\/\/)?[a-z0-9~_\-\.]+\.[a-z]{2,9}(\/|:|\?[!-~]*)?$/i; // fragment locator
            if(!pattern.test(this.state.link_url)) {
                alert('неверная ссылка.');
                document.querySelector('input[name="link_url"]').focus();
                return true;
            }
            let a = document.createElement('a');
            a.href =  this.state.link_url;
            a.innerText = link_text;

            this.state.range.deleteContents();
            this.state.range.insertNode(a);
            const editor_content = e.target.closest('.TextEditor').querySelector('.text').innerHTML;
            this.setState({
                ...this.state,
                text: editor_content,
                selection: null,
                range: null,
                link_text: '',
                link_url: '',
                link_window_is_visible: false,
            });
        };

        // Формирует и добавляет картинку в текстовое поле
        this.addImg = (e) => {

            let a = document.createElement('a');
            a.href =  this.state.img_url;
            a.setAttribute('target', '_blank');
            a.innerHTML = '<img src="' + this.state.img_url + '"/>';
            //let img = document.createElement('img');
            //img.src =  this.state.img_url;
            //a.insertNode(img);

            this.state.range.deleteContents();
            this.state.range.insertNode(a);
            const editor_content = e.target.closest('.TextEditor').querySelector('.text').innerHTML;
            this.setState({
                ...this.state,
                text: editor_content,
                selection: null,
                range: null,
                link_text: '',
                link_url: '',
                img_url: '',
                link_window_is_visible: false,
                img_window_is_visible: false,
            });
        };

        // Определяем клик вне окна добавлния ссылки, если вне, то закрываем его
        this.handleClickOutsideLinkWindow = (e) => {
            if(
                !e.target.closest('.link-window') &&
                !e.target.closest('.img-window') &&
                !e.target.closest('.editor-add-link-btn') &&
                !e.target.closest('.editor-add-img-btn') &&
                !e.target.closest('.editor-add-smiles-btn')
            ){
                this.hideLinkWindow();
            }
        };

        // показываем окно со смайликами
        this.showSmiles = (e) => {
            let selection = window.getSelection();
            //console.log(selection);
            let range = window.getSelection().getRangeAt(0);
            const el = selection.anchorNode.parentNode;
            //console.log(el);
            if(!el.closest('.text') && !el.classList.contains('text') && !el.classList.contains('editor')){
                return true;
            }

            this.setState({
                ...this.state,
                selection: selection,
                range: range,
                link_url: '',
                smiles_window_is_visible: true,
            });
        };

        this.addSmile = (e) => {
            this.state.range.deleteContents();
            let smile = document.createElement('span');
            smile.innerHTML = e.target.innerText;
            this.state.range.insertNode(smile);
            const editor_content = e.target.closest('.TextEditor').querySelector('.text').innerHTML;
            this.setState({
                ...this.state,
                text: editor_content,
                selection: null,
                range: null,
                smiles_window_is_visible: false,
            });
        };

        // имитируем событие
        this.imitateEvent = (e) => {
            const btn = e.target;
            const editor = btn.closest('.TextEditor');
            const text = editor.querySelector('.text');
            let t = text.innerHTML;
            this.setState({
                ...this.state,
                text: t,
            });
        };

        // отправка сообщения
        this.sendMessage = (e) => {
            const message = this.state.text;
            const topic_id = this.props.topic;
            const btn = e.target;
            const editor = btn.closest('.TextEditor');
            const text = editor.querySelector('.text');

            // Получем результат отправки сообщения через колбек, если все нормально, то очищаем поля редактора
            this.props.send(topic_id, message, (res) => {
                if(!res){
                    return true;
                }
                this.setState({
                    ...this.state,
                    text: '',
                    selection: null,
                    range: null,
                    link_text: '',
                    link_url: '',
                    link_window_is_visible: false,
                });
                text.innerHTML = '';
            });
        };
    }

    componentDidMount(){
        document.addEventListener('click', this.handleClickOutsideLinkWindow, false);
    }

    componentWillUnmount(){
        document.removeEventListener('click', this.handleClickOutsideLinkWindow, false);
    }

    render(){

        const { text, link_window_is_visible, img_window_is_visible, link_text, link_url,
                img_url, smiles_window_is_visible } = this.state;

        const { quotes, requestLoad } = this.props;

        let class_show_link_window = '';
        let class_show_img_window = '';
        let class_show_smiles_window = '';
        let class_quotes_add = '';
        if(link_window_is_visible){
            class_show_link_window = ' show_link_window';
        }
        if(img_window_is_visible){
            class_show_img_window = ' show_img_window';
        }
        if(smiles_window_is_visible){
            class_show_smiles_window = ' show_smiles_window';
        }
        if(quotes.length > 0){
            class_quotes_add = 'quotes-add';
        }

        return(
            <div className="TextEditor">
                <div className="editor">
                    <ul className="btn-block">
                        <li><button onClick={ this.bold } title="Жирный" className="strong">B</button></li>
                        <li><button onClick={ this.italic } title="Курсив" className="i">I</button></li>
                        <li><button onClick={ this.underline } title="Подчеркнутый" className="u">U</button></li>
                        <li><button onClick={ this.strike } title="Зачеркнутый" className="s">S</button></li>
                        <li>
                            <button className={ class_quotes_add } onClick={ this.blockQuote } title="Цитировать">
                                <FontAwesomeIcon icon={ faQuoteRight }/>
                            </button>
                        </li>
                        <li className="editor-add-link-btn">
                            <button onClick={ this.createLinkShowWindow } title="Добаить ссылку">
                                <FontAwesomeIcon icon={ faLink }/>
                            </button>
                        </li>
                        <li className="editor-add-img-btn">
                            <button onClick={ this.createImgShowWindow } title="Вставить картинку">
                                <FontAwesomeIcon icon={ faImage }/>
                            </button>
                        </li>
                        <li className="editor-add-smiles-btn">
                            <button onClick={ this.showSmiles } title="Смайлики">
                                &#128515;
                            </button>
                        </li>
                        <li>
                            <button onClick={ this.removeFormat } title="Удалить форматирование текста">
                                <FontAwesomeIcon icon={ faEraser }/>
                            </button>
                        </li>
                    </ul>

                        <div className="text"
                             name="text"
                             data-text-editor="true"
                             onKeyUp={ (e) => this.textEditor(e.target) }
                             contentEditable
                             defaultValue={ text }>

                        </div>
                    
                    <div className={'link-window' + class_show_link_window }>
                        <ul>
                            <li>
                                <label>адрес ссылки</label>
                                <input type="text"
                                       name="link_url"
                                       onChange={ this.textInput }
                                       value={ link_url }
                                />
                            </li>
                            <li>
                                <label>текст</label>
                                <input type="text"
                                       name="link_text"
                                       onChange={ this.textInput }
                                       value={ link_text }
                                />
                            </li>
                        </ul>
                        <ul className="link-window-btn-block">
                            <li>
                                <button onClick={ this.addLink }><FontAwesomeIcon icon={ faCheck }/></button>
                            </li>
                            <li>
                                <button onClick={ this.hideLinkWindow }><FontAwesomeIcon icon={ faTimes }/></button>
                            </li>
                        </ul>
                    </div>

                    <div className={'img-window' + class_show_img_window }>
                        <ul>
                            <li>
                                <label>ссылка на картинку</label>
                                <input type="text"
                                       name="img_url"
                                       onChange={ this.textInput }
                                       value={ img_url }
                                />
                            </li>
                        </ul>
                        <ul className="link-window-btn-block">
                            <li>
                                <button onClick={ this.addImg }><FontAwesomeIcon icon={ faCheck }/></button>
                            </li>
                            <li>
                                <button onClick={ this.hideLinkWindow }><FontAwesomeIcon icon={ faTimes }/></button>
                            </li>
                        </ul>
                    </div>
                    <div className={'smile-window ' + class_show_smiles_window }>
                        <ul>
                            <li onClick={ this.addSmile }>&#128513;</li>
                            <li onClick={ this.addSmile }>&#128514;</li>
                            <li onClick={ this.addSmile }>&#128515;</li>
                            <li onClick={ this.addSmile }>&#128516;</li>
                            <li onClick={ this.addSmile }>&#128517;</li>
                            <li onClick={ this.addSmile }>&#128518;</li>
                            <li onClick={ this.addSmile }>&#128519;</li>
                            <li onClick={ this.addSmile }>&#128520;</li>
                            <li onClick={ this.addSmile }>&#128521;</li>
                            <li onClick={ this.addSmile }>&#128522;</li>
                            <li onClick={ this.addSmile }>&#128523;</li>
                            <li onClick={ this.addSmile }>&#128524;</li>
                            <li onClick={ this.addSmile }>&#128525;</li>
                            <li onClick={ this.addSmile }>&#128526;</li>
                            <li onClick={ this.addSmile }>&#128527;</li>
                            <li onClick={ this.addSmile }>&#128528;</li>
                            <li onClick={ this.addSmile }>&#128530;</li>
                            <li onClick={ this.addSmile }>&#128531;</li>
                            <li onClick={ this.addSmile }>&#128532;</li>
                            <li onClick={ this.addSmile }>&#128534;</li>
                            <li onClick={ this.addSmile }>&#128536;</li>
                            <li onClick={ this.addSmile }>&#128538;</li>
                            <li onClick={ this.addSmile }>&#128540;</li>
                            <li onClick={ this.addSmile }>&#128541;</li>
                            <li onClick={ this.addSmile }>&#128542;</li>
                            <li onClick={ this.addSmile }>&#128544;</li>
                            <li onClick={ this.addSmile }>&#128545;</li>
                            <li onClick={ this.addSmile }>&#128546;</li>
                            <li onClick={ this.addSmile }>&#128547;</li>
                            <li onClick={ this.addSmile }>&#128548;</li>
                            <li onClick={ this.addSmile }>&#128549;</li>
                            <li onClick={ this.addSmile }>&#128552;</li>
                            <li onClick={ this.addSmile }>&#128553;</li>
                            <li onClick={ this.addSmile }>&#128554;</li>
                            <li onClick={ this.addSmile }>&#128555;</li>
                            <li onClick={ this.addSmile }>&#128557;</li>
                            <li onClick={ this.addSmile }>&#128560;</li>
                            <li onClick={ this.addSmile }>&#128561;</li>
                            <li onClick={ this.addSmile }>&#128562;</li>
                            <li onClick={ this.addSmile }>&#128563;</li>
                            <li onClick={ this.addSmile }>&#128565;</li>
                            <li onClick={ this.addSmile }>&#128566;</li>
                            <li onClick={ this.addSmile }>&#128567;</li>
                            <li onClick={ this.addSmile }>&#128568;</li>
                            <li onClick={ this.addSmile }>&#128569;</li>
                            <li onClick={ this.addSmile }>&#128570;</li>
                            <li onClick={ this.addSmile }>&#128571;</li>
                            <li onClick={ this.addSmile }>&#128572;</li>
                            <li onClick={ this.addSmile }>&#128573;</li>
                            <li onClick={ this.addSmile }>&#128574;</li>
                            <li onClick={ this.addSmile }>&#128575;</li>
                            <li onClick={ this.addSmile }>&#128576;</li>
                            <li onClick={ this.addSmile }>&#128581;</li>
                            <li onClick={ this.addSmile }>&#128582;</li>
                            <li onClick={ this.addSmile }>&#128583;</li>
                            <li onClick={ this.addSmile }>&#128584;</li>
                            <li onClick={ this.addSmile }>&#128585;</li>
                            <li onClick={ this.addSmile }>&#128586;</li>
                            <li onClick={ this.addSmile }>&#128587;</li>
                            <li onClick={ this.addSmile }>&#128588;</li>
                            <li onClick={ this.addSmile }>&#128589;</li>
                            <li onClick={ this.addSmile }>&#128590;</li>
                            <li onClick={ this.addSmile }>&#128591;</li>
                            <li onClick={ this.addSmile }>&#127918;</li>
                            <li onClick={ this.addSmile }>&#127925;</li>
                            <li onClick={ this.addSmile }>&#127926;</li>
                            <li onClick={ this.addSmile }>&#127911;</li>
                            <li onClick={ this.addSmile }>&#127874;</li>
                            <li onClick={ this.addSmile }>&#127866;</li>
                            <li onClick={ this.addSmile }>&#127865;</li>
                            <li onClick={ this.addSmile }>&#127861;</li>
                            <li onClick={ this.addSmile }>&#127867;</li>
                            <li onClick={ this.addSmile }>&#127876;</li>
                            <li onClick={ this.addSmile }>&#127877;</li>
                            <li onClick={ this.addSmile }>&#127936;</li>
                            <li onClick={ this.addSmile }>&#9748;</li>
                            <li onClick={ this.addSmile }>&#9757;</li>
                            <li onClick={ this.addSmile }>&#9996;</li>
                            <li onClick={ this.addSmile }>&#9995;</li>
                        </ul>
                    </div>
                </div>
                <textarea defaultValue={ text }/>
                <div className="send-forum-message-block">
                    <BtnLoad load={ requestLoad }
                             type="button"
                             title="отправить"
                             onClick={ this.sendMessage }
                    />
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        quotes: state.quotesReducer.quotes,
    }
};

export default connect(mapStateToProps, { removeQuotes })(TextEditor);