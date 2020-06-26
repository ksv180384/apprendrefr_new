import React, { Component } from 'react';
import { connect } from 'react-redux';

import { getPage } from '../../store/actions/pageActions';
import { setLoaderPage } from '../../store/actions/loaderPageActions';

import LayoutTwo from "../../layouts/app/LayoutTwo";
import Header from "../../header/Header";
import Left from "../../layouts/app/left/Left";
import UserProfileEdit from "../../components/user_profile_edit/UserProfileEdit";
import Player from "../../components/player/Player";
import Test from "../../components/test/Test";
import WordsList from "../../components/words_list/WordsList";
import Joke from "../../components/joke/Joke";
import Footer from "../../footer/Footer";
import LoaderPage from "../../components/loader_page/LoaderPage";

import './Profile.css';

class Profile extends Component{

    componentDidMount(){
        this.props.getPage('api/user/profile-page');

        this.pageContent = () => {
            return (
                <React.Fragment>
                    <Header/>
                    <LayoutTwo>
                        <Left>
                            <Player/>
                            <Test/>
                            <WordsList/>
                            <Joke/>
                        </Left>
                        <UserProfileEdit/>
                    </LayoutTwo>
                    <Footer/>
                </React.Fragment>
            );
        };
    }

    render(){

        const { loader_page } = this.props;

        return(
            <React.Fragment>
                { loader_page ? <LoaderPage/> : this.pageContent() }
            </React.Fragment>
        );
    }
}

const mapSateToProps = (state) => {
    return {
        loader_page: state.loaderPageReducer,
    }
};

export default connect(mapSateToProps, { getPage, setLoaderPage })(Profile);