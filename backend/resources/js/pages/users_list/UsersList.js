import React,  { Component } from 'react';
import { connect } from 'react-redux';

import { getPage } from '../../store/actions/usersListActions';

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
import UsersL from '../../components/users_l/UsersL';

import LoaderPage from "../../components/loader_page/LoaderPage";


class UsersList extends Component{

    componentDidMount(){
        this.props.getPage('api/user/list-page', { page: this.props.match.params.page });
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
                            <UsersL/>
                        </CenterTwoBlock>
                    </LayoutTwo>

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

export default connect(mapStateToPage, { getPage })(UsersList);