import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

// actions
import { getPage } from '../../../store/actions/pageActions';

// components
import MessageItem from './MessageItem';
import Paginate from "../../paginate/Paginate";

class MessagesList extends Component{

    constructor(){
        super();

        this.loadContent = (page) => {
            this.props.getPage('api/forum/' + this.props.forum.id + '/topic/' + this.props.topic.id + '/messages', { page: page });
        };
    }

    render(){

        const { massages, topic, forum, paginate } = this.props;

        return(
            <div className="ForumsList-list">
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
                {
                    massages !== undefined
                        ?
                        Object.keys(massages).map((key) => {
                            return <MessageItem key={ massages[key].id }
                                                message={ massages[key] }
                                                topic={ topic }
                            />
                        })
                        :
                        <div>Пусто</div>
                }
                <Paginate current_page={paginate.current_page}
                          last_page={paginate.last_page}
                          per_page={paginate.per_page}
                          to={paginate.to}
                          total={paginate.total}
                          getContent={ this.loadContent }
                          path={ '/forum/' + forum.id + '/topic/' + topic.id }
                />
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    //console.log(state.pageDataReducer);
    return {
        massages: state.pageDataReducer.messages.data,
        topic: state.pageDataReducer.topic,
        forum: state.pageDataReducer.forum,
        paginate: {
            current_page: state.pageDataReducer.messages.current_page,
            last_page: state.pageDataReducer.messages.last_page,
            per_page: state.pageDataReducer.messages.per_page,
            to: state.pageDataReducer.messages.to,
            total: state.pageDataReducer.messages.total,
        }
    }
};

export default connect(mapStateToProps, { getPage })(MessagesList);