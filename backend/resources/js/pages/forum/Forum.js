import React, { Component } from 'react';
import { connect } from 'react-redux';

// actions
import { loadForumsListPage } from '../../store/actions/forumActions';

// components
import Header from "../../header/Header";
import Footer from "../../footer/Footer";
import LayoutTwo from "../../layouts/app/LayoutTwo";
import CenterTwoBlock from "../../layouts/app/center/CenterTwoBlock";
import Left from "../../layouts/app/left/Left";
import Player from "../../components/player/Player";
import Test from "../../components/test/Test";
import WordsList from "../../components/words_list/WordsList";
import Joke from "../../components/joke/Joke";
import Proverb from "../../components/proverb/Proverb";
import ForumsList from "../../components/forum/ForumsList";
import LoaderPage from "../../components/loader_page/LoaderPage";
import StatisticBlock from "../../layouts/app/StatisticBlock";

class Forum extends Component {

    componentDidMount(){
        this.props.loadForumsListPage('api/forum');
    }

    render(){

        const { loader_page, meta_data } = this.props;

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
                            <ForumsList/>
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
    };
};

export default connect(mapStateToProps, { loadForumsListPage })(Forum);