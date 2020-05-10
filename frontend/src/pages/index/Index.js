import React,  { Component } from 'react';
import Header from "../../header/Header";
import Footer from "../../footer/Footer";
import App from "../../layouts/app/App";
import Registration from "../../components/modals_windows/registration/Registration";


class Index extends Component {

    render(){

        return(
            <React.Fragment>
                <Header/>
                <App/>
                <Footer/>
                <Registration />
            </React.Fragment>
        );
    }
}

export default Index;