import React, { Component } from 'react';
import './Header.css';
import Navigation from "./navigation/Navigation";
import Search from "./searsh/Search";

import menu from './../config/menu';

class Header extends Component{

    render(){

        return(
            <header>
                <div className="navigation">
                    <Navigation menu={ menu }/>
                </div>
                <div className="search-block">
                    <Search/>
                </div>
            </header>
        )
    }
}

export default Header;