import React, { Component } from 'react';
import { connect } from 'react-redux';

import { getPage } from '../../store/actions/pageActions';
import { setLoaderPage } from '../../store/actions/loaderPageActions';
//import store from "../../store";

import AppNoRight from "../../layouts/app/AppNoRight";
import Header from "../../header/Header";
import Footer from "../../footer/Footer";
import LoaderPage from "../../components/loader_page/LoaderPage";

import './Profile.css';

class Profile extends Component{

    constructor(props){
        super(props);

    }

    componentDidMount(){
        this.props.getPage('api/user/profile-page');

        this.pageContent = () => {
            return (
                <React.Fragment>
                    <Header/>
                    <AppNoRight/>
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