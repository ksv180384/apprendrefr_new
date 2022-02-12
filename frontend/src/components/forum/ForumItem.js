import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Moment from "moment";

class ForumItem extends Component{

    render(){

        const { forum } = this.props;

        return(
            <div className="LastActiveTopic-item">
                <div className="ForumsList-list-item-topic-title-info">
                    <div><Link to={ '/forum/' + forum.id } className="link">{ forum.title }</Link></div>
                    {
                        forum.messages_count > 0
                        ?
                            <React.Fragment>
                                <span>Последнее сообщение: <Link to={ '/forum/' + forum.id + '/topic/' + forum.last_messages.topic.id } className="link">{ forum.last_messages.topic.title }</Link></span>
                                <span>от: <Link to={ '/user/info/' + forum.last_messages.user.id } className="link">{ forum.last_messages.user.login }</Link></span>в: { Moment(forum.last_messages.created_at, 'YYYY-MM-DDTHH:mm:ss.SSSSZ').format('HH:mm') } <strong>{ Moment(forum.last_messages.created_at, 'YYYY-MM-DDTHH:mm:ss.SSSSZ').format('DD MMM YYYY') }</strong>
                            </React.Fragment>
                        :
                            ''
                    }
                </div>
                <div className="ForumsList-list-item-count-topics">
                    { forum.topics_count }
                </div>
                <div className="ForumsList-list-item-count-messages">
                    { forum.messages_count }
                </div>
            </div>
        );
    }
}


export default ForumItem;