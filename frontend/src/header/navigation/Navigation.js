import React, { Component } from 'react';
import { connect } from 'react-redux';

import { setLoaderPage } from '../../store/actions/loaderPageActions';
import { Link } from 'react-router-dom';

import './Navigation.css';

class Navigation extends Component{

    constructor(props){
        super(props);

    }

    componentDidMount(){
        this.changePage = () => {
            this.props.setLoaderPage(true);
        }
    }

    render(){

        const menu = this.props.menu;

        return(
            <nav>
                <ul>
                    {Object.keys(menu).map(key => {
                        return <Link onClick={ this.changePage } key={key} to={ key }>{ menu[key] }</Link>
                    })}
                </ul>
            </nav>
        );
    }
}

export default connect(null, { setLoaderPage })(Navigation);