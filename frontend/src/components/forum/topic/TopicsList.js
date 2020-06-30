import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

// components
import TopicItem from './TopicItem';

import '../forum.css';

class TopicsList extends Component {

    render(){

        const { forum, topics } = this.props;

        return(
            <div className="ForumsList-list">
                <div className="panel_header">
                    <h1>Форум - { forum.title }</h1>
                </div>
                <div className="breadcrumbs">
                    <ul>
                        <li><Link to="/forum">Форумы</Link></li>
                        <li><span>{ forum.title }</span></li>
                    </ul>
                </div>
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
                    topics
                        ?
                        Object.keys(topics).map((key) => {
                            return <TopicItem key={ topics[key].id } topic={ topics[key] }/>
                        })
                        :
                        <div>Пусто</div>
                }
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        forum: state.pageDataReducer.forum,
        topics: state.pageDataReducer.topics,
    };
};

export default connect(mapStateToProps, {  })(TopicsList);