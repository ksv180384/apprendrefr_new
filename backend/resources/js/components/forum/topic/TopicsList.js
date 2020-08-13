import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';

// components
import TopicItem from './TopicItem';
import CreateThem from './CreateThem';

import '../forum.css';

class TopicsList extends Component {

    constructor(){
        super();

        this.state = {
            show_create_them: false,
        };

        this.showCreateThem = () => {
            this.setState({ ...this.state, show_create_them: true, });
        };

        this.closeCreateThem = () => {
            this.setState({ ...this.state, show_create_them: false, });
        }
    }

    render(){

        const { forum, topics, auth, user_auth } = this.props;
        const { show_create_them } = this.state;

        return(
            <React.Fragment>
                {
                    forum
                        ?
                        <div className="ForumsList-list">
                            <div className="panel_header">
                                <h1>Форум - {forum.title}</h1>
                            </div>
                            <div className="breadcrumbs">
                                <ul>
                                    <li><Link to="/forum">Форумы</Link></li>
                                    <li><span>{forum.title}</span></li>
                                </ul>
                            </div>
                            {
                                auth && user_auth.rang_alias !== 'zabanen' ?
                                    <div className="create-them-control-block">
                                        <button className="btn"
                                                title="Добавить тему форума"
                                                onClick={this.showCreateThem}>
                                            <FontAwesomeIcon icon={faPlus}/> Добавить тему
                                        </button>
                                    </div>
                                    :
                                    ''
                            }
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
                                        return <TopicItem key={topics[key].id} topic={topics[key]}/>
                                    })
                                    :
                                    <div>Пусто</div>
                            }
                        </div>
                        :
                        <div>пусто</div>
                }
                <CreateThem show={ show_create_them } forum={ forum } closeCreateThem={ this.closeCreateThem }/>
            </React.Fragment>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        forum: state.forumReducer,
        topics: state.forumTopicsListReducer,
        auth: state.loginReducer.login,
        user_auth: state.userReducer,
    };
};

export default connect(mapStateToProps, {  })(TopicsList);