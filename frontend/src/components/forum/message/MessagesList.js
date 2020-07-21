import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

// actions
import { loadMessagesPaginate } from '../../../store/actions/forumActions';

// components
import MessageItem from './MessageItem';
import Paginate from "../../paginate/Paginate";

class MessagesList extends Component{

    constructor(){
        super();

        this.loadMessages = (path, params) => {
            this.props.loadMessagesPaginate(path, params);
        };
    }

    render(){

        const { massages, topic, forum, paginate } = this.props;

        return(
            typeof massages !== 'undefined'
                ?
                    <div className="MessagesList">
                        <div className="panel_header">
                            <h1>Форум - { topic.title }</h1>
                        </div>
                        <div className="breadcrumbs">
                            <ul>
                                <li><Link to="/forum">Форумы</Link></li>
                                <li><Link to={ '/forum/' + forum.id }>{ forum.title }</Link></li>
                                <li><span>{ topic.title }</span></li>
                            </ul>
                        </div>
                        <Paginate current_page={paginate.current_page}
                                  last_page={paginate.last_page}
                                  per_page={paginate.per_page}
                                  to={paginate.to}
                                  total={paginate.total}
                                  path={ '/forum/' + forum.id + '/topic/' + topic.id }
                                  paginate_path={ '/forum/' + forum.id + '/topic/' + topic.id + '/messages-paginate' }
                                  loadPaginate={ this.loadMessages }
                        />
                        {
                            Object.keys(massages).map((key) => {
                                return <MessageItem key={ massages[key].id }
                                                    message={ massages[key] }
                                                    topic={ topic }
                                />
                            })
                        }
                        <Paginate current_page={paginate.current_page}
                                  last_page={paginate.last_page}
                                  per_page={paginate.per_page}
                                  to={paginate.to}
                                  total={paginate.total}
                                  path={ '/forum/' + forum.id + '/topic/' + topic.id }
                                  paginate_path={ '/forum/' + forum.id + '/topic/' + topic.id + '/messages-paginate' }
                                  loadPaginate={ this.loadMessages }
                        />
                    </div>
                :
                    <div>пусто</div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        massages: state.forumMessagesListReduer.data,
        topic: state.forumTopicReducer,
        forum: state.forumReducer,
        paginate: {
            current_page: state.forumMessagesListReduer.current_page,
            last_page: state.forumMessagesListReduer.last_page,
            per_page: state.forumMessagesListReduer.per_page,
            to: state.forumMessagesListReduer.to,
            total: state.forumMessagesListReduer.total,
        }
    }
};

export default connect(mapStateToProps, { loadMessagesPaginate })(MessagesList);