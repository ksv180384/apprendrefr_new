import React, { Component } from 'react';
import './Navigation.css';

import { Link } from 'react-router-dom';

class Navigation extends Component{

    render(){

        const menu = this.props.menu;

        return(
            <nav>
                <ul>
                    {Object.keys(menu).map(key => {
                        return <Link key={key} to={ key }>{ menu[key] }</Link>
                    })}
                </ul>
            </nav>
        );
    }
}

export default Navigation;