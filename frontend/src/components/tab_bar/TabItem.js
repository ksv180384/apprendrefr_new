import React, { Component } from 'react';
import './TabBar.css'

class TabItem extends Component{
    
    render(){

        const { children, active, ...attrs } = this.props;

        let className = '';
        if(active){
            className = ' active';
        }

        return(
            <div className={ 'tab-item' + className } {...attrs}>
                { children }
            </div>
        );
    }
}

export default TabItem;