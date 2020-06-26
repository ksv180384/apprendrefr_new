import React, { Component } from 'react';

import './LayoutTwo.css';

class LayoutTwo extends Component{

    render(){

        const { children } = this.props;

        return(
            <div className="LayoutTwo">
                { children }
            </div>
        );
    }
}

export default LayoutTwo;