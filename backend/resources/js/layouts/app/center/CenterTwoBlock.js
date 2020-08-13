import React, { Component } from 'react';
import './CenterBlock.css';

class CenterTwoBlock extends Component{

    render(){

        const { children } = this.props;

        return(
            <div className="CenterTwoBlock-block">
                { children }
            </div>
        );
    }
}

export default CenterTwoBlock;