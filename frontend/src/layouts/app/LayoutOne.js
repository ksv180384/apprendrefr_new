import React, { Component } from 'react';


import './LayoutOne.css';

class LayoutOne extends Component{

    render(){

        const { children } = this.props;

        return(
            <div className="LayoutOne">
                { children }
            </div>
        );
    }
}

export default LayoutOne