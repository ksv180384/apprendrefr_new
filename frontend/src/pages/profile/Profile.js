import React, { Component } from 'react';
import './Profile.css';
import Header from "../../header/Header";
import AppNoRight from "../../layouts/app/AppNoRight";
import Footer from "../../footer/Footer";

class Profile extends Component{


    render(){


        return(
            <React.Fragment>
                <Header/>
                <AppNoRight/>
                <Footer/>
            </React.Fragment>
        );
    }
}

export default Profile;