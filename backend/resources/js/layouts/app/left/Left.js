import React, { Component } from 'react';


import './Left.css';

class Left extends Component{

    render(){

        const { children } = this.props;

        return(
            <div className="Left-block">
                { children }
            </div>
        );
    }
}

export default Left;