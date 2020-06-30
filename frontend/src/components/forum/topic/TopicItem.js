import React, { Component } from 'react';

class TopicItem extends Component{

    render(){

        const { topic } = this.props;

        return(
            <div className="LastActiveTopic-item">
                <div className="LastActiveTopic-item-topic-title-info">
                    <div><a href={ '/forum/' + topic.forum_id + '/topic/' + topic.id  } className="link">{ topic.title }</a></div>
                    <span>Автор: <a href={ '#' + topic.topic_create_user_id } className="link">{ topic.topic_create_user_login }</a></span>
                </div>
                <div className="LastActiveTopic-item-topic-statistic-info">
                    <div>Ответов: <strong>{ topic.count_messages - 1 }</strong></div>
                    <div>Просмотров: <strong>{ topic.count_views }</strong></div>
                </div>
                <div className="LastActiveTopic-item-topic-message-info">
                    <div className="LastActiveTopic-item-topic-message-info-date">{ topic.message_created_at }</div>
                    <div>Автор: <a href={ '#' + topic.message_create_user_id } className="link">{ topic.message_create_user_login }</a></div>
                </div>
            </div>
        );
    }
}


export default TopicItem;