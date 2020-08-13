import React, { Component } from 'react';
import { connect } from 'react-redux';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';

// components
import InputGroup from '../../input_group/InputGroup';
import TextEditor from '../../forum/text_editor/TextEditor';

// actions
import { createTopic } from '../../../store/actions/forumActions';

class CreateThem extends Component{

    constructor(){
        super();

        this.state = {
            them_title: '',
        };

        this.handleInput = (e) => {
            //let value = e.target.value;
            this.setState({ them_title: e.target.value });
        };

        this.closeBlock = () => {
            this.props.closeCreateThem();
        };

        this.addThem = (message, callback) => {
            this.props.createTopic(this.props.forum.id, this.state.them_title, message, (res) => {
                if(res){
                    this.setState({ them_title: '' });
                    this.closeBlock();
                }
                callback(res);
            });
        };
    }

    render(){
        const { show, forum, topic_request } = this.props;
        const { them_title } = this.state;


        let class_show_create_message = '';
        if(show){
            class_show_create_message = ' show';
        }

        return(
            <div className={ 'create-them-block' + class_show_create_message }>
                <div className="panel_header">
                    Добавить тему форума { forum.title }
                    <div className="modal-close" onClick={ this.closeBlock }><FontAwesomeIcon icon={ faTimes }/></div>
                </div>
                <div className="create-them-form-block">
                    <InputGroup type="text"
                                label="Название темы"
                                placeholder="Введите название темы форума"
                                name="them_name"
                                vertical={ 'on' }
                                value={ them_title }
                                onChange={ this.handleInput }
                    />
                    <div className="mt-20">
                        <TextEditor send={ this.addThem } requestLoad={ topic_request }/>
                    </div>
                </div>
            </div>
        );
    }
};

const mapStateToProps = (state) => {
  return{
      topic_request: state.forumSendMessageReducer.loading,
  }
};

export default connect(mapStateToProps, { createTopic })(CreateThem);