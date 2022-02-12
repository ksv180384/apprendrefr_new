import React, { Component } from 'react';
import { connect } from 'react-redux';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faEye, faCheck, faTimes } from '@fortawesome/free-solid-svg-icons';

// components
import { Link } from 'react-router-dom';

// actions
import { updateTopic, changeStatusTopic } from '../../../store/actions/forumActions';
import Moment from "moment";

class TopicItem extends Component{

    constructor(){
        super();

        this.state = {
            show_statuses_list: false,
            edit_block: '',
            edit_title_value: '',
        };

        this.handleChangeTopicTitle = (e) => {
            if(e.key === 'Enter'){
                this.updateTopic();
                return true;
            }
            this.setState({ ...this.state, edit_title_value: e.target.value });
        };

        this.updateTopic = () => {

            this.props.updateTopic(this.props.topic.id, this.state.edit_title_value, (res, topic) => {
                if(res){
                    this.toggleEditBlock();
                    this.setState({
                        ...this.state,
                        new_topic_title_value: topic.title,
                    });
                }
            });
        };

        this.toggleEditBlock = () => {
            if(!this.state.edit_block){
                this.setState({
                    ...this.state,
                    edit_block: <div className="topic-edit-block">
                                    <input onKeyUp={ this.handleChangeTopicTitle } type="text" defaultValue={ this.state.edit_title_value }/>
                                    <ul className="menu-topic-control">
                                        <li title="Применить" onClick={ this.updateTopic }><FontAwesomeIcon icon={ faCheck }/></li>
                                        <li title="Отмена" onClick={ this.toggleEditBlock }><FontAwesomeIcon icon={ faTimes }/></li>
                                    </ul>
                                </div>
                });
            }else{
                this.setState({ ...this.state, edit_block: '' });
            }
        };

        this.showStatusesList = () => {
            this.setState({ ...this.state, show_statuses_list: !this.state.show_statuses_list });
        };

        this.changeStatus = (e) => {
            const { id } = e.currentTarget.dataset;

            this.props.changeStatusTopic(this.props.topic.id, id, (res) => {
                if(res){

                }
            });

        }
    }

    componentDidMount(){
        this.setState({
            ...this.state,
            edit_title_value: this.props.topic.title,
            new_topic_title_value: this.props.topic.title,
        });
    }

    render(){

        const { topic, user, statuses } = this.props;
        const { edit_block, new_topic_title_value, show_statuses_list } = this.state;

        let class_show_statuses_list = '';
        if(show_statuses_list){
            class_show_statuses_list = ' show-statuses-list';
        }
        return(
            <div className={ 'LastActiveTopic-item' + (topic.status.alias === 'hidden' ? ' hidden-st' : '') }>
                <div className="LastActiveTopic-item-topic-title-info">
                    <div>
                        <Link to={ '/forum/' + topic.forum_id + '/topic/' + topic.id  }
                              className={ 'link' + (topic.user_view_last_message && topic.user_view_last_message.viewed_data < topic.last_messages.created_at ? ' strong' : '') }>
                            { new_topic_title_value }
                        </Link>
                        { edit_block }
                        <ul className="menu-topic-control">
                            {
                                user &&
                                (
                                    user.admin === 1 ||
                                    user.rang_alias === 'administrator' ||
                                    user.rang_alias === 'moderator' ||
                                    user.id === topic.user.id
                                )
                                    ?
                                    <li title="Редактировать название темы"
                                        onClick={ this.toggleEditBlock }
                                    >
                                        <FontAwesomeIcon icon={ faEdit }/>
                                    </li>
                                    :
                                    ''
                            }
                            {
                                user &&
                                (
                                    user.admin === 1 ||
                                    user.rang_alias === 'administrator' ||
                                    user.rang_alias === 'moderator'
                                )
                                    ?
                                        <li title="Запретить писать сообщения" onClick={ this.showStatusesList }>
                                            <FontAwesomeIcon icon={ faEye }/>
                                            <ul className={ 'topic-statuses-list' + class_show_statuses_list }>
                                                {
                                                    statuses.map((item) => {

                                                        return <li className={'' + (topic.status === item.id ? 'select-status' : '') }
                                                                   data-id={ item.id }
                                                                   onClick={ this.changeStatus }
                                                                   key={ item.id }
                                                                >
                                                            { item.title }
                                                            </li>
                                                    })
                                                }
                                            </ul>
                                        </li>
                                    :
                                        ''
                            }
                        </ul>
                    </div>
                    <span>Автор: <Link to={ '/user/info/' + topic.user.id } className="link">{ topic.user.login }</Link></span>
                </div>
                <div className="LastActiveTopic-item-topic-statistic-info">
                    <div>Ответов: <strong>{ topic.messages_count === 0 ? 0 : (topic.messages_count - 1) }</strong></div>
                    <div>Просмотров: <strong>{ topic.count_views }</strong></div>
                </div>
                <div className="LastActiveTopic-item-topic-message-info">
                    { topic.last_messages
                        ?
                        <div>
                            <div className="LastActiveTopic-item-topic-message-info-date">
                                { Moment(topic.last_messages.created_at, 'YYYY-MM-DDTHH:mm:ss.SSSSZ').format('HH:mm') }
                                <strong> { Moment(topic.last_messages.created_at, 'YYYY-MM-DDTHH:mm:ss.SSSSZ').format('DD MMM YYYY') }</strong>
                            </div>
                            <div>
                                Автор: <Link to={ '/user/info/' + topic.last_messages.user.id } className="link">{ topic.last_messages.user.login }</Link>
                            </div>
                        </div>
                        :
                        ''
                    }
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        user: state.userReducer,
        statuses: state.forumStatusesReducer,
    }
};

export default connect(mapStateToProps, { updateTopic, changeStatusTopic })(TopicItem);