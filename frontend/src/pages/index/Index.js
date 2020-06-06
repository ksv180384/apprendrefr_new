import React,  { Component } from 'react';
import { connect } from 'react-redux';

import App from "../../layouts/app/App";

import { getPage } from '../../store/actions/pageActions';
import Header from "../../header/Header";
import Footer from "../../footer/Footer";
import LoaderPage from "../../components/loader_page/LoaderPage";

import './Index.css';

class Index extends Component {

    constructor(props){
        super(props);

        this.pageContent = () => {
            return (
                <React.Fragment>
                    <Header/>
                        <App/>
                    <Footer/>
                </React.Fragment>
            );
        };
    }


    componentDidMount(){
        this.props.getPage('api/index');
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

const mapStateToPage = (state) => {
    return {
        loader_page: state.loaderPageReducer
    }
};

export default connect(mapStateToPage, { getPage })(Index);