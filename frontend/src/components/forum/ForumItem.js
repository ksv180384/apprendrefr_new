import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class ForumItem extends Component{

    render(){

        const { forum } = this.props;

        return(
            <div className="LastActiveTopic-item">
                <div className="ForumsList-list-item-topic-title-info">
                    <div><Link to={ '/forum/' + forum.id } className="link">{ forum.title }</Link></div>
                    {
                        forum.count_messages > 0
                        ?
                            <React.Fragment>
                                <span>Последнее сообщение: <a href={ '/forum/' + forum.id + '/topic/' + forum.topic_id } className="link">{ forum.topic_title }</a></span>
                                <span>от: <a href={ '#' + forum.message_create_user_id } className="link">{ forum.message_create_user_login }</a></span>в: { forum.created_message.time } <strong>{ forum.created_message.day }</strong>
                            </React.Fragment>
                        :
                            ''
                    }
                </div>
                <div className="ForumsList-list-item-count-topics">
                    { forum.count_topics }
                </div>
                <div className="ForumsList-list-item-count-messages">
                    { forum.count_messages }
                </div>
            </div>
        );
    }
}


export default ForumItem;