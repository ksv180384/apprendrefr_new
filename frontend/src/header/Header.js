import React, { Component } from 'react';
import './Header.css';
import Navigation from "./navigation/Navigation";
import Authentification from "../components/authentification/Authentification";
import Search from "../components/searsh/Search";

import menu from './../config/menu';

class Header extends Component{

    render(){

        return(
            <header>
                <div className="header-content-block">
                    <div className="navigation">
                        <Navigation menu={ menu }/>
                    </div>
                    <div className="search-block">
                        <Search/>
                        <Authentification/>
                    </div>
                </div>
            </header>
        )
    }
}

export default Header;