import React,  { Component } from 'react';
import { connect } from 'react-redux';

import { getPage } from '../../store/actions/wordPageActions';

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
import WordItem from '../../components/words_page/WordItem';
import StatisticBlock from '../../layouts/app/StatisticBlock';
import LoaderPage from "../../components/loader_page/LoaderPage";


class Words extends Component {

    componentDidMount(){
        this.props.getPage({ id: this.props.match.params.id });
    }

    render(){

        const { loader_page, meta_data } = this.props;

        document.title = meta_data.title;
        document.querySelector('meta[name="description"]').content = meta_data.description;
        document.querySelector('meta[name="keywords"]').content = meta_data.keywords;

        return(

            loader_page
                ?
                <LoaderPage/>
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
                            <WordItem/>
                        </CenterTwoBlock>
                    </LayoutTwo>
                    <StatisticBlock/>
                    <Footer/>
                </React.Fragment>


        );
    }
}

const mapStateToPage = (state) => {
    return {
        loader_page: state.loaderPageReducer,
        meta_data: state.metaReducer,
    }
};

export default connect(mapStateToPage, { getPage })(Words);