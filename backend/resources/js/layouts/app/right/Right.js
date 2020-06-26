import React, { Component } from 'react';

import './Right.css';


class Right extends Component{



    render(){

        const { children } = this.props;

        return(
            <div className="Right-block">
                { children }
            </div>
        );
    }
}


export default Right;