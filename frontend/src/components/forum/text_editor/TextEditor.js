import  React, { Component } from 'react';
import { connect } from 'react-redux';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEraser, faTimes, faCheck, faLink, faImage } from '@fortawesome/free-solid-svg-icons';

import './TextEditor.css';
import { sendMessage } from "../../../store/actions/forumActions";

class TextEditor extends Component{

    constructor(props){
        super(props);

        this.state = {
            text: '',
            link_window_is_visible: false,
            img_window_is_visible: false,
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
            document.execCommand( 'formatBlock', false, 'blockquote' );
            this.imitateEvent(e);

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

                //console.log(selection.anchorNode.parentElement)
                const el = selection.anchorNode.parentElement;
                console.log(el.querySelector('.text'));
                if(
                    !el.getAttribute('data-text-editor') &&
                    !el.closest('.text').getAttribute('data-text-editor')
                ){
                    return true;
                }
                //console.log(el.closest('.text'));
                //data-text-editor
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
            let selection = null;
            let range = null;
            let link_text = '';
            let img_window_is_visible = false;

            selection = window.getSelection();
            range = window.getSelection().getRangeAt(0);
            img_window_is_visible = true;

            this.setState({
                ...this.state,
                selection: selection,
                range: range,
                link_url: '',
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
            });
        };

        // Формирует и добавляет ссылку в текстовое поле
        this.addLink = (e) => {
            let link_text = this.state.link_url;
            if(this.state.link_text){
                link_text = this.state.link_text;
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

            let img = document.createElement('img');
            img.src =  this.state.img_url;

            this.state.range.deleteContents();
            this.state.range.insertNode(img);
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
        this.send = (e) => {
            this.props.sendMessage(this.props.topic, this.state.text);
            this.setState({
                ...this.state,
                text: '',
                selection: null,
                range: null,
                link_text: '',
                link_url: '',
                link_window_is_visible: false,
            });
            const btn = e.target;
            const editor = btn.closest('.TextEditor');
            const text = editor.querySelector('.text');
            text.innerHTML = '';
        }
    }

    render(){

        const { text, link_window_is_visible, img_window_is_visible, link_text, link_url, img_url } = this.state;
        let class_show_link_window = '';
        let class_show_img_window = '';
        if(link_window_is_visible){
            class_show_link_window = ' show_link_window';
        }
        if(img_window_is_visible){
            class_show_img_window = ' show_img_window';
        }

        return(
            <div className="TextEditor">
                <div className="editor">
                    <ul className="btn-block">
                        <li><button onClick={ this.bold } title="Жирный" className="strong">B</button></li>
                        <li><button onClick={ this.italic } title="Курсив" className="i">I</button></li>
                        <li><button onClick={ this.underline } title="Подчеркнутый" className="u">U</button></li>
                        <li><button onClick={ this.strike } title="Зачеркнутый" className="s">S</button></li>
                        <li><button onClick={ this.blockQuote } title="Цитировать">"</button></li>
                        <li>
                            <button onClick={ this.createLinkShowWindow } title="Добаить ссылку">
                                <FontAwesomeIcon icon={ faLink }/>
                            </button>
                        </li>
                        <li>
                            <button onClick={ this.createImgShowWindow } title="Вставить картинку">
                                <FontAwesomeIcon icon={ faImage }/>
                            </button>
                        </li>
                        <li><button onClick={ this.strike }>
                            <div className="tox-collection__item-icon">🚟</div></button></li>
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
                                       defaultValue={ link_url }
                                />
                            </li>
                            <li>
                                <label>текст</label>
                                <input type="text"
                                       name="link_text"
                                       onChange={ this.textInput }
                                       defaultValue={ link_text }
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
                                       defaultValue={ img_url }
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
                </div>
                <textarea defaultValue={ text } ></textarea>
                <div className="send-forum-message-block">
                    <button className="send-forum-message" onClick={ this.send }>отправить</button>
                </div>
            </div>
        );
    }
}

export default connect(null, { sendMessage })(TextEditor);