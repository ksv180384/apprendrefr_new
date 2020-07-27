import React, { Component } from 'react';

// components
import InputForm from "../input_form/InputForm";

class TestBlock extends Component{

    constructor(props){
        super(props);

        this.getWordsList = () => {
            const words_list = [];
            const lesson_words = document.querySelectorAll('ul.spis_sl li');
            for(let key in lesson_words){
                if(lesson_words[key] instanceof Element && lesson_words[key].querySelector('strong')){
                    words_list.push({
                        fr: lesson_words[key].querySelector('strong').innerText,
                        ru: lesson_words[key].querySelector('.Pervod').innerText
                    });
                }
            }
            return this.shuffle(words_list);
        };

        this.shuffle = (array) => {
            let currentIndex = array.length, temporaryValue, randomIndex;

            while (0 !== currentIndex) {

                randomIndex = Math.floor(Math.random() * currentIndex);
                currentIndex -= 1;

                temporaryValue = array[currentIndex];
                array[currentIndex] = array[randomIndex];
                array[randomIndex] = temporaryValue;
            }

            return array;
        };

        this.state = {
            wordsList: this.getWordsList(),
            word_input: '',
            count_word: 0,
            count_error: 0,
            show_hint: false,
            show_end_test: false,
        };

        this.validateWord = (e) => {
            this.setState({ [e.target.name]: e.target.value, show_hint: false });
            let word = e.target.value;
            let word_length = word.length;
            let w_arr = this.state.wordsList[this.state.count_word][this.props.typeQuestion].split(",");

            let err = false;
            for(let i = 0; i < w_arr.length; i++) {
                let word_question = w_arr[i].trim().slice(0, word_length);
                if(word === w_arr[i].trim()){
                    let c = this.state.count_word+1;
                    if(c >= this.state.wordsList.length){
                        this.setState({ show_end_test: true });
                    }else{
                        this.setState({ count_word: c, [e.target.name]: '' });
                    }
                    err = false;
                    break;
                }

                if(word_question === word){
                    err = false;
                    break;
                }
                err = true;
            }
            if(err){
                this.setState({ count_error: this.state.count_error+1, show_hint: true });
            }
        };

        this.keyboardClick = (e) => {
            this.insertText('input[name="word_input"]', e.target.innerHTML);
        };

        this.insertText = ( selector, text ) => {
            //ищем элемент по селектору
            const txtarea = document.querySelector(selector);
            const evt = new Event('change');
            txtarea.addEventListener('change', (e) => {
                this.validateWord(e);
            }, false);
            //ищем первое положение выделенного символа
            const start = txtarea.selectionStart;
            //ищем последнее положение выделенного символа
            const end = txtarea.selectionEnd;
            // текст до + вставка + текст после (если этот код не работает, значит у вас несколько id)
            const finText = txtarea.value.substring(0, start) + text + txtarea.value.substring(end);
            // подмена значения
            txtarea.value = finText;
            // возвращаем фокус на элемент
            txtarea.focus();
            // возвращаем курсор на место - учитываем выделили ли текст или просто курсор поставили
            txtarea.selectionEnd = ( start === end )? (end + text.length) : end ;
            txtarea.dispatchEvent(evt);
            txtarea.removeEventListener('change', (e) => {
                this.validateWord(e);
            }, false);
        }
    }

    render(){

        const { wordsList, count_word, count_error, word_input, show_hint, show_end_test } = this.state;
        const { typeAnswer, typeQuestion } = this.props;

        let class_show_hint = '';
        let class_show_end_test = '';
        if(show_hint){
            class_show_hint = ' show-hint';
        }
        if(show_end_test){
            class_show_end_test = ' show-end-test';
        }

        return(
            <div className="LessonsTestBlock">
                <div className={ 'LessonsTestBlock-word-count' + (count_word > 0 ? ' show-count' : '') }>ответов: { count_word }</div>
                <div className={ 'LessonsTestBlock-word-error' + (count_error > 0 ? ' show-error' : '') }>ошибок: { count_error }</div>
                <div className="LessonsTestBlock-word">
                    { wordsList[count_word][typeAnswer] }
                </div>
                <div className={ 'LessonsTestBlock-hint' + class_show_hint }>{ wordsList[count_word][typeQuestion] }</div>
                <InputForm name="word_input"
                           placeholder={ 'Напишите перевод слова "' + wordsList[count_word][typeAnswer] + '"' }
                           type="text"
                           value={ word_input }
                           onChange={ this.validateWord }
                           autoComplete="off"
                />
                {
                    typeAnswer === 'fr'
                        ?
                        <div className="LearningWrite-keyboard mt-25 mb-25">
                            <ul>
                                <li onClick={ this.keyboardClick }>ë</li>
                                <li onClick={ this.keyboardClick }>ô</li>
                                <li onClick={ this.keyboardClick }>ê</li>
                                <li onClick={ this.keyboardClick }>û</li>
                                <li onClick={ this.keyboardClick }>â</li>
                                <li onClick={ this.keyboardClick }>î</li>
                                <li onClick={ this.keyboardClick }>ù</li>
                                <li onClick={ this.keyboardClick }>ç</li>
                                <li onClick={ this.keyboardClick }>è</li>
                                <li onClick={ this.keyboardClick }>à</li>
                                <li onClick={ this.keyboardClick }>é</li>
                            </ul>
                        </div>
                        :
                        ''
                }
                <div className={ 'end-test-block' + class_show_end_test }>Вы прошли тест</div>
            </div>
        );
    }
}


export default TestBlock;