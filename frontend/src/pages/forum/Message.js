import React, { Component } from 'react';
import { connect } from 'react-redux';

// actions
import { loadMessagesListPage } from '../../store/actions/forumActions';

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

class Message extends Component {

    constructor(){
        super();

        this.state = {
            page: 1,
        };
    }

    componentDidMount(){
        this.props.loadMessagesListPage('api/forum/' + this.props.match.params.forum_id + '/topic/' + this.props.match.params.topic_id + '/messages', { page: this.props.match.params.page });
    }

    render(){

        const { auth, loader_page, paginate, meta_data } = this.props;

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
                <React.Fragment>
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
                            { auth ? <TextEditor topic={ this.props.match.params.topic_id }/> : '' }
                            <Quotes/>
                        </CenterTwoBlock>

                    </LayoutTwo>

                    <Footer/>
                </React.Fragment>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        loader_page: state.loaderPageReducer,
        meta_data: state.metaReducer,
        auth: state.loginReducer.login,
        paginate: {
            current_page: state.forumMessagesListReduer.current_page,
            last_page: state.forumMessagesListReduer.last_page,
            per_page: state.forumMessagesListReduer.per_page,
            to: state.forumMessagesListReduer.to,
            total: state.forumMessagesListReduer.total,
        },
    };
};

export default connect(mapStateToProps, { loadMessagesListPage })(Message);