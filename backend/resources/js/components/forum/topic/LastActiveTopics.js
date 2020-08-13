import React  from 'react';
import { connect } from 'react-redux';

import LastActiveTopicItem from './LastActiveTopicItem';

import '../forum.css';

const LastActiveTopics = (props) =>{

    const { topics } = props;

    return(
        topics
            ?
            <div className="LastActiveTopic-list">
                <div className="panel_header">Последние темы</div>
                <div className="ForumsList-list-header-table">
                    <div className="TopicsList-list-header-table-info">
                        Название темы
                    </div>
                    <div className="TopicsList-list-header-table-count-statistic">
                        Статистика
                    </div>
                    <div className="TopicsList-list-header-table-count-messages">
                        Последнее сообщение
                    </div>
                </div>
                {
                    Object.keys(topics).map(key => {
                        return <LastActiveTopicItem key={ topics[key].id } topic={ topics[key] }/>
                    })
                }
            </div>
            :
            <div>пусто</div>
    );
};

const mapStateToPage = (state) => {
    return {
        topics: state.indexReducer.topics,
    }
};

export default connect(mapStateToPage, {  })(LastActiveTopics);