import React, { Component } from 'react';
import { connect } from 'react-redux';

// actions
import { loadMessagesListPage, sendMessage } from '../../store/actions/forumActions';

// components
import Header from "../../header/Header";
import Footer from "../../footer/Footer";
import LayoutTwo from "../../layouts/app/LayoutTwo";
import Left from "../../layouts/app/left/Left";
import Player from "../../components/player/Player";
import Test from "../../components/test/Test";
import WordsList from "../../components/words_list/WordsList";
import Joke from "../../components/joke/Joke";
import CenterTwoBlock from "../../layouts/app/center/CenterTwoBlock";
import Proverb from "../../components/proverb/Proverb";
import MessagesList from "../../components/forum/message/MessagesList";
import LoaderPage from "../../components/loader_page/LoaderPage";
import TextEditor from '../../components/forum/text_editor/TextEditor';
import Quotes from '../../components/forum/Quotes';
import StatisticBlock from "../../layouts/app/StatisticBlock";

class Message extends Component {

    constructor(){
        super();

        this.sendMessage = (message, callback) => {
            this.props.sendMessage(this.props.match.params.topic_id, message, (res) => {
                callback(res);
            });
        }
    }

    componentDidMount(){
        this.props.loadMessagesListPage('api/forum/' + this.props.match.params.forum_id + '/topic/' + this.props.match.params.topic_id + '/messages', { page: this.props.match.params.page });
    }

    render(){

        const { auth, loader_page, meta_data, user_auth, message_request, topic } = this.props;

        document.title = meta_data.title;
        document.querySelector('meta[name="description"]').content = meta_data.description;
        document.querySelector('meta[name="keywords"]').content = meta_data.keywords;

        return(
            loader_page
                ?
                <React.Fragment>
                    <LoaderPage/>
                </React.Fragment>
                :
                <div className="forum-page">
                    <Header/>
                    <LayoutTwo>
                        <Left>
                            <Player/>
                            <Test/>
                            <WordsList/>
                            <Joke/>
                        </Left>

                        <CenterTwoBlock>
                            <Proverb/>
                            <MessagesList/>
                            { auth && user_auth.rang_alias !== 'zabanen' &&
                              (
                                  topic.status_topic_alias === 'visible_everyone' ||
                                  topic.status_topic_alias === 'visible_only_registered_users'
                              )
                                ?
                                <TextEditor send={ this.sendMessage }
                                            requestLoad={ message_request }
                                />
                                :
                                ''
                            }
                            <Quotes/>
                        </CenterTwoBlock>

                    </LayoutTwo>
                    <StatisticBlock/>
                    <Footer/>
                </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        loader_page: state.loaderPageReducer,
        meta_data: state.metaReducer,
        auth: state.loginReducer.login,
        user_auth: state.userReducer,
        topic: state.forumTopicReducer,
        message_request: state.forumSendMessageReducer.loading,
    };
};

export default connect(mapStateToProps, { loadMessagesListPage, sendMessage })(Message);