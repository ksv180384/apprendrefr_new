import React, { Component } from 'react';
import './Header.css';
import Navigation from "./navigation/Navigation";
import Search from "./searsh/Search";

class Header extends Component{
    render(){

        return(
            <header>
                <div className="navigation">
                    <Navigation menu={this.props.menu}/>
                </div>
                <div className="search-block">
                    <Search/>
                </div>
            </header>
        )
    }
}

export default Header;