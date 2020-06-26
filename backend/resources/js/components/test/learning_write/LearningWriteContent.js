import React, { Component } from 'react';
import { connect } from 'react-redux';
import { setLoadLearningWrite, loadLearningWriteContent } from '../../../store/actions/learningWriteActions';

import InputForm from '../../../components/input_form/InputForm';

class LearningWriteContent extends Component{

    constructor(props){
        super(props);


        this.state = {
            word: '', //this.props.learning_write.data[0].word,
            translation: '', //this.props.learning_write.data[0].translation,
            transcription: '', //this.props.learning_write.data[0].transcription,
            learning_write: '',
            count: 0,
            data: [],
        };

        this.getWord = () => {

            let result = {
                word: '',
                translation: '',
                transcription: '',
            };
            if(this.props.learning_write.data[this.state.count] && this.state.count === 0){

                result = {
                    word: this.props.learning_write.data[this.state.count].word,
                    translation: this.props.learning_write.data[this.state.count].translation,
                    transcription: this.props.learning_write.data[this.state.count].transcription,
                }
            }
            if(this.props.learning_write.data[this.state.count] && this.state.count > 0){
                result = {
                    word: this.state.data[this.state.count].word,
                    translation: this.state.data[this.state.count].translation,
                    transcription: this.state.data[this.state.count].transcription,
                }
            }
            return result;
        };

        this.handleChangeLearningWrite = (e) => {

            this.setState({ [e.target.name]: e.target.value });
            if(e.target.value === this.state.data[this.state.count].word){
                this.setState({
                    ...this.state,
                    learning_write: '',
                    count: this.state.count + 1,
                });
                if(this.state.count === 5){
                    this.props.loadLearningWriteContent();
                }
                if(this.state.count === 9){
                    this.setState({
                        ...this.state,
                        data: this.props.learning_write.data,
                        count: 0,
                    });
                }
            }
        };

        this.keyboardClick = (e) => {
            //console.log(e.target.innerHTML);
            this.insertText('input[name="learning_write"]', e.target.innerHTML);
        };

        this.insertText = ( selector, text ) => {
            //ищем элемент по селектору
            const txtarea = document.querySelector(selector);
            const evt = new Event('change');
            txtarea.addEventListener('change', (e) => {
                this.handleChangeLearningWrite(e);
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
        }
    }

    static getDerivedStateFromProps(props, state){
        // Если при отправке формы регистрации произошла ошибка, то ловим ее тут
        // Формируем текст ошибки и показываем оповещение
        if(props.learning_write.loaded && state.count === 0){
            state = {
                ...state,
                data: props.learning_write.data,
            };
        }
        return state;
    }

    render(){

        //const { word, translation, transcription } = this.state;
        const { word, translation, transcription } = this.getWord();
        const { learning_write } = this.state;

        return(
            <div className="LearningWrite-block">
                
                <div className="LearningWrite-word mb-10 mt-15">
                    { word }
                </div>
                <div className="LearningWrite-transcription mb-10">
                    { transcription }
                </div>
                <div className="LearningWrite-translation translation">
                    { translation }
                </div>
                <div className="">
                    <InputForm name="learning_write"
                               placeholder={'Напишите слово ' + word }
                               type="text"
                               value={ learning_write }
                               onChange={ this.handleChangeLearningWrite } />
                </div>
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
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        learning_write: state.learningWriteReducer,
    }
};

export default connect(mapStateToProps, { setLoadLearningWrite, loadLearningWriteContent })(LearningWriteContent);