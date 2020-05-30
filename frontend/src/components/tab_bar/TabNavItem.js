import React, { Component } from 'react';
import './TabBar.css'

class TabNavItem extends Component{

    constructor(props){
        super(props);

        this.clickNavItem = (e) => {
            this.props.onClick(this.props);
        }
    }

    render(){

        const { children, active } = this.props;

        let className = '';
        if(active){
            className = ' active';
        }
        return(
            <button className={ 'tab-nav-item' + className } onClick={ this.clickNavItem }>{ children }</button>
        );
    }
}

export default TabNavItem;