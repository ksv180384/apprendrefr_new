import React, { Component } from 'react';
import { connect } from 'react-redux';
import { loadTestYourselfData } from '../../../store/actions/testYourselfActions';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlay } from '@fortawesome/free-solid-svg-icons';

// components
import ModalLoader from '../../modals_windows/ModalLoader';

class TestYourSelfContent extends Component{

    constructor(props){
        super(props);

        this.state = {
            count: 0,
            questions_list: {},
        };

        this.selectAnswer = (e) => {
            const select_answer = parseInt(this.state.questions_list[this.state.count].answer.id, 10);
            const answer = parseInt(e.target.getAttribute('data-id'), 10);

            if(select_answer === answer){
                this.setState({ ...this.state, count: ++this.state.count });
            }

            if(this.state.count === 5){
                this.props.loadTestYourselfData();
            }

            if(this.state.count === 9){
                this.setState({
                        ...this.state,
                        count: 0,
                        questions_list: this.props.test_yourself.questions_list,
                    });
            }
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
                alert('Ваш браузер не поддерживает Французкий язык. Используйте Chrome.')
            }
            */
            return lang;
        };

        this.voice = (e) =>{
            const word_text = this.state.questions_list[this.state.count].answer.word;

            this.speak(word_text);
            this.checkSpeak();
        };

        this.speak('');
    }

    //*
    static getDerivedStateFromProps(props, state){
        // Если при отправке формы регистрации произошла ошибка, то ловим ее тут
        // Формируем текст ошибки и показываем оповещение
        if(props.test_yourself.loading && state.count === 0){
            state = {
                ...state,
                questions_list: props.test_yourself.questions_list,
            };
        }
        return state;
    }
    //*/

    render(){

        const { count, questions_list } = this.state;

        if(typeof questions_list[count] !== 'undefined'){
            this.voice();
        }

        return(
            <div className="TestYourselfContent">

                {
                    typeof questions_list[count] === 'undefined'
                    ?
                        <ModalLoader/>
                    :
                        <ul className="answer_list">
                            {
                                Object.keys(questions_list[count].answer_options).map(key => {
                                    return (
                                        <li key={questions_list[count].answer_options[key].id}
                                            data-id={questions_list[count].answer_options[key].id}
                                            onClick={this.selectAnswer}>
                                            {questions_list[count].answer_options[key].translation}
                                        </li>
                                    );
                                })
                            }
                            <li className="border-non mt-30 mb-20">
                                <span className="question_voice" onClick={ this.voice }>
                                    <FontAwesomeIcon icon={faPlay}/>
                                </span>
                            </li>
                         </ul>
                }
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        test_yourself: state.testYourselfReducer,
    }
};

export default connect(mapStateToProps, { loadTestYourselfData })(TestYourSelfContent);