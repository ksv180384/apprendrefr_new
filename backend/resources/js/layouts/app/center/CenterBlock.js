import React, { Component } from 'react';
import './CenterBlock.css';

class CenterBlock extends Component{

    render(){

        const { children } = this.props;

        return(
            <div className="CenterBlock-block">
                { children }
            </div>
        );
    }
}

export default CenterBlock;