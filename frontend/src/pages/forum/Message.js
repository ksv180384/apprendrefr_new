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

    static getDerivedStateFromProps(props, state){
        if(typeof state.page === 'undefined'){
            state.page = 1;
        }
        if(typeof props !== 'undefined'){
            let page = props.match.params.page;
            if(typeof page === 'undefined'){
                page = 1;
            }
            if(page !== state.page){
                state.page = props.match.params.page;
                props.loadMessagesListPage('api/forum/' + props.match.params.forum_id + '/topic/' + props.match.params.topic_id + '/messages', { page: page });
            }
        }
        return state;
    }

    render(){

        const { loader_page } = this.props;

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
    };
};

export default connect(mapStateToProps, { loadMessagesListPage })(Message);