import React  from 'react';
import { Link } from 'react-router-dom';

import '../forum.css';

const LastActiveTopicItem = (props) => {

    const { topic } = props;

    return(
        <div className="LastActiveTopic-item">
            <div className="LastActiveTopic-item-topic-title-info">
                <div>
                    <Link to={ 'forum/' + topic.forum_id + '/topic/' + topic.id }
                          className={ 'link' + (!topic.user_view_topic ? ' strong' : '') }>
                        { topic.title }
                    </Link>
                </div>
                <span>Раздел: <Link to={ '/forum/' + topic.forum_id } className="link">{ topic.forum_title }</Link></span>
                <span>Автор: <Link to={ '/user/info/' + topic.topic_create_user_id } className="link">{ topic.topic_create_user_login }</Link></span>
            </div>
            <div className="LastActiveTopic-item-topic-statistic-info">
                <div>Ответов: <strong>{ topic.count_messages - 1 }</strong></div>
                <div>Просмотров: <strong>{ topic.count_views }</strong></div>
            </div>
            <div className="LastActiveTopic-item-topic-message-info">
                <div className="LastActiveTopic-item-topic-message-info-date">
                    { topic.created_message.time } <strong>{ topic.created_message.day }</strong>
                </div>
                <div>Автор: <Link to={ '/user/info/' + topic.message_create_user_id } className="link">{ topic.message_create_user_login }</Link></div>
            </div>
        </div>
    );

};


export default LastActiveTopicItem;