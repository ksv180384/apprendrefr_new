import  React, { Component } from 'react';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEraser, faTimes, faCheck } from '@fortawesome/free-solid-svg-icons';

import './TextEditor.css';

class TextEditor extends Component{

    constructor(props){
        super(props);

        this.state = {
            text: '',
            link_window_is_visible: false,
            range: null, // объек для управления выделенным текстом
            link_text: '',
            link_url: '',
        };

        this.textEditor = (e) => {
            const el = e.currentTarget;
            console.log(el.innerHTML);
            this.setState({ ...this.state, text: el.innerHTML });
        };

        this.textInput = (e) => {
            this.setState({ [e.target.name]: e.target.value });
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
            document.execCommand( 'removeFormat', false, null );
            this.imitateEvent(e);

        };

        // Показываем окно для добавления ссылки
        this.createLinkShowWindow = (e) => {

            let range = null;
            let link_text = '';
            let link_window_is_visible = false;

            //console.log(window.getSelection().rangeCount);

            if(window.getSelection().rangeCount > 0){
                range = window.getSelection().getRangeAt(0);
                link_text = window.getSelection().toString();
                link_window_is_visible = true;
            }


            //console.log(window.getSelection().toString());

            this.setState({
                ...this.state,
                link_window_is_visible: link_window_is_visible,
                range: range,
                link_text: link_text,
                link_url: '',
            });
        };

        this.hideLinkWindow = () => {
            this.setState({
                ...this.state,
                link_window_is_visible: false,
            });
        };

        this.createLink = (e) => {
            let link_text = this.state.link_url;
            if(this.state.link_text){
                let link_text = this.state.link_text;
            }
            //let a = document.createElement('a');
            //a.href = this.state.link_url;
            //a.href = this.state.link_url;
            //document.execCommand( 'createLink', this.state.link_text, this.state.link_url );
            //this.imitateEvent(e);
            this.hideLinkWindow();
        };

        // имитируем событие keyup
        this.imitateEvent = (e) => {
            const btn = e.currentTarget;
            const editor = btn.parentNode.parentNode.parentNode;
            const text = editor.querySelector('.text');

            text.addEventListener('keyup', this.textInput(e), false);
            const evt = new Event('keyup');
            text.dispatchEvent(evt);
            //text.removeEventListener('keyup', this.textInput, false);
        };

        this.getSelectPosition = (e) => {
            const btn = e.currentTarget;
            const state_text = this.state.text;
            //console.log(state);
            const text_editor = btn.parentNode.parentNode.parentNode.parentNode;
            const editor = text_editor.querySelector('.editor');
            //const text = text_editor.querySelector('.text');
            const box_editor = editor.getBoundingClientRect() || editor.createTextRange();


            const range = window.getSelection().getRangeAt(0);
            //range.collapse(false);
            console.log(range);
            const dummy = document.createElement("span");
            range.insertNode(dummy);
            //this.imitateEvent(e);
            const box_range = dummy.getBoundingClientRect() || dummy.createTextRange();
            const x = box_range.left - box_editor.left;
            const y = box_range.top - box_editor.top;

            //const txt = window.getSelection();
            //const rang = txt.getRangeAt(0);
            dummy.parentNode.removeChild(dummy);
            //const boundary = rang.getBoundingClientRec();
            //console.log(rang);
            //this.imitateEvent(e);
            //text.innerHTML = state_text;

            //this.getSelectOffset(e);

            return { x: x, y: y };
        };


    }

    render(){

        const { text, link_window_is_visible, link_text, link_url } = this.state;
        let class_show_link_window = '';
        if(link_window_is_visible){
            class_show_link_window = ' show_link_window';
        }

        return(
            <div className="TextEditor">
                <div className="editor">
                    <ul className="btn-block">
                        <li><button onClick={ this.bold } className="strong">B</button></li>
                        <li><button onClick={ this.italic } className="i">I</button></li>
                        <li><button onClick={ this.underline } className="u">U</button></li>
                        <li><button onClick={ this.strike } className="s">S</button></li>
                        <li><button onClick={ this.createLinkShowWindow }>L</button></li>
                        <li><button onClick={ this.blockQuote }>"</button></li>
                        <li><button onClick={ this.strike }>🚟</button></li>
                        <li><button onClick={ this.strike }>
                            <div className="tox-collection__item-icon">🚟</div></button></li>
                        <li>
                            <button onClick={ this.removeFormat } title="Удалить форматирование текста">
                                <FontAwesomeIcon icon={ faEraser }/>
                            </button>
                        </li>
                    </ul>

                        <div className="text" onKeyUp={ this.textEditor } contentEditable defaultValue={ text }>

                        </div>
                    
                    <div className={'link-window' + class_show_link_window }>
                        <ul>
                            <li>
                                <label>адрес ссылки</label>
                                <input type="text"
                                       name="link_url"
                                       defaultValue={ link_url }
                                />
                            </li>
                            <li>
                                <label>текст</label>
                                <input type="text" name="link_text" defaultValue={ link_text }/>
                            </li>
                        </ul>
                        <ul className="link-window-btn-block">
                            <li>
                                <button onClick={ this.createLink }><FontAwesomeIcon icon={ faCheck }/></button>
                            </li>
                            <li>
                                <button onClick={ this.hideLinkWindow }><FontAwesomeIcon icon={ faTimes }/></button>
                            </li>
                        </ul>
                    </div>
                </div>
                <textarea defaultValue={ text }></textarea>
            </div>
        );
    }
}

export default TextEditor;