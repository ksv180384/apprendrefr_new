import React, { Component } from 'react';

import './Navigation.css';

class Navigation extends Component{

    render(){

        const menu = this.props.menu;

        return(
            <nav>
                <ul>
                    {Object.keys(menu).map(key => {
                        return <li key={key}><a href={key}>{menu[key]}</a></li>
                    })}
                </ul>
            </nav>
        );
    }
}

export default Navigation;