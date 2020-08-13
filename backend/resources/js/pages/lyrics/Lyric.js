import React,  { Component } from 'react';
import { connect } from 'react-redux';

import { getPageItem } from '../../store/actions/lyricActions';

// components
import Header from "../../header/Header";
import Footer from "../../footer/Footer";
import LayoutFull from "../../layouts/app/LayoutFull";
import LyricItem from "../../components/lyrics/LyricItem";
import StatisticBlock from "../../layouts/app/StatisticBlock";

import LoaderPage from "../../components/loader_page/LoaderPage";

class Lyric extends Component {

    componentDidMount(){
        this.props.getPageItem(this.props.match.params.id);
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
                    <LayoutFull>
                        <LyricItem/>
                    </LayoutFull>
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

export default connect(mapStateToPage, { getPageItem })(Lyric);