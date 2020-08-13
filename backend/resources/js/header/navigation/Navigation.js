import React, { Component } from 'react';

import { Link } from 'react-router-dom';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars, faTimes } from '@fortawesome/free-solid-svg-icons';

import './Navigation.css';

class Navigation extends Component{

    constructor(){
        super();

        this.state = {
            open: false,
        };

        this.toggleSidebar = (e) => {
            const $sidebar = document.getElementById('Sidebar');
            let left = parseInt(window.getComputedStyle( $sidebar, null ).getPropertyValue('left'));
            if(left < 0){
                this.setState({ ...this.state, open: true });
                $sidebar.style.left = '0';
                document.querySelector('body').classList.add('sidebar-open');
            }else{
                this.setState({ ...this.state, open: false });
                $sidebar.style.left = '-304px';
                document.querySelector('body').classList.remove('sidebar-open');
            }
        };

        this.hideControlListPanelOutside = (e) => {
            if(
                this.state.open &&
                !e.target.matches('.sidebar-block, .sidebar-block *')
            ) {
                this.setState({ ...this.state, open: false });
                this.toggleSidebar();
                //const $sidebar = document.getElementById('Sidebar');
                //$sidebar.style.left = '-304px';
            }
        };
    }

    componentDidMount(){
        const $sidebar_btn = document.getElementById('SidebarBtn');
        const $sidebar_close_btn = document.getElementById('SidebarCloseBtn');
        $sidebar_btn.addEventListener('click', this.toggleSidebar);
        $sidebar_close_btn.addEventListener('click', this.toggleSidebar);
        document.querySelector('body').classList.remove('sidebar-open');

        document.addEventListener('click', this.hideControlListPanelOutside);
    }

    componentWillUnmount(){
        const $sidebar_btn = document.getElementById('SidebarBtn');
        $sidebar_btn.removeEventListener('click', this.toggleSidebar);

        document.removeEventListener('click', this.hideControlListPanelOutside);
    }

    render(){

        const menu = this.props.menu;

        return(
            <React.Fragment>
                <div className="sidebar">
                    <div id="SidebarBtn" className="sidebar-btn">
                        <FontAwesomeIcon icon={ faBars }/>
                    </div>
                </div>
                <div id="Sidebar" className="sidebar-block">
                    <div className="hide-sidebar-block">
                        <span>ApprendreFr.ru</span>
                        <div id="SidebarCloseBtn" className="hide-sidebar-btn">
                            <FontAwesomeIcon icon={ faTimes }/>
                        </div>
                    </div>
                    <ul>
                        {Object.keys(menu).map(key => {
                            return <li key={key}><Link to={ key } className="link">{ menu[key] }</Link></li>
                        })}
                    </ul>
                </div>
                <nav>
                    <ul>
                        {Object.keys(menu).map(key => {
                            return <Link key={key} to={ key }>{ menu[key] }</Link>
                        })}
                    </ul>
                </nav>
            </React.Fragment>
        );
    }
}

export default Navigation;