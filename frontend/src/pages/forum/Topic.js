import React, { Component } from 'react';
import { connect } from 'react-redux';

// actions
import { loadTopicsListPage } from '../../store/actions/forumActions';

// components
import Header from "../../header/Header";
import Footer from "../../footer/Footer";
import LayoutOne from "../../layouts/app/LayoutOne";
import Left from "../../layouts/app/left/Left";
import Player from "../../components/player/Player";
import Test from "../../components/test/Test";
import WordsList from "../../components/words_list/WordsList";
import Joke from "../../components/joke/Joke";
import CenterBlock from "../../layouts/app/center/CenterBlock";
import Proverb from "../../components/proverb/Proverb";
import TopicsList from "../../components/forum/topic/TopicsList";
import Right from "../../layouts/app/right/Right";
import Statistics from "../../components/statistics/Statistics";
import OnlineList from "../../components/online_list/OnlineList";
import Authentification from "../../components/authentification/Authentification";
import LoaderPage from "../../components/loader_page/LoaderPage";

class Topic extends Component {

    componentDidMount(){
        this.props.loadTopicsListPage('api/forum/' + this.props.match.params.forum_id + '/topic/list');
    }

    render(){

        const { loader_page } = this.props;

        return(
            loader_page !== false
                ?
                <React.Fragment>
                    <LoaderPage/>
                </React.Fragment>
                :
                <React.Fragment>
                    <Header/>
                    <LayoutOne>
                        <Left>
                            <Player/>
                            <Test/>
                            <WordsList/>
                            <Joke/>
                        </Left>

                        <CenterBlock>
                            <Proverb/>
                            <TopicsList/>
                        </CenterBlock>

                        <Right>
                            <Authentification/>
                            <Statistics/>
                            <OnlineList/>
                        </Right>
                    </LayoutOne>

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

export default connect(mapStateToProps, { loadTopicsListPage })(Topic);