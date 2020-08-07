import React, { Component } from 'react';
import { connect } from 'react-redux';

// actions
import { getPage } from '../../store/actions/searchWordPageActions';

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
import LoaderPage from "../../components/loader_page/LoaderPage";
import SearchWord from '../../components/search_word/SearchWord';

class SearchWordPage extends Component {

    constructor(){
        super();

    }

    componentDidMount(){
        const { word, lang } = this.props.match.params;
        this.props.getPage(word, lang);
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
                            <SearchWord/>
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

export default connect(mapStateToProps, { getPage })(SearchWordPage);