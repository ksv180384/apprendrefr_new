import React  from 'react';
import { Link } from 'react-router-dom';

import '../forum.css';
import Moment from "moment";

const LastActiveTopicItem = (props) => {

    const { topic } = props;

    return(
        <div className="LastActiveTopic-item">
            <div className="LastActiveTopic-item-topic-title-info">
                <div>
                    <Link to={ 'forum/' + topic.forum.id + '/topic/' + topic.id }
                          className={ 'link' + (!topic.count_views ? ' strong' : '') }>
                        { topic.title }
                    </Link>
                </div>
                <span>Раздел: <Link to={ '/forum/' + topic.forum.id } className="link">{ topic.forum.title }</Link></span>
                <span>Автор: <Link to={ '/user/info/' + topic.user.id } className="link">{ topic.user.login }</Link></span>
            </div>
            <div className="LastActiveTopic-item-topic-statistic-info">
                <div>Ответов: <strong>{ topic.messages_count - 1 }</strong></div>
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
                            Автор: <Link to={'/user/info/' + topic.last_messages.user.id} className="link">{ topic.last_messages.user.login }</Link>
                        </div>
                    </div>
                    :
                    ''
                }
            </div>
        </div>
    );

};


export default LastActiveTopicItem;