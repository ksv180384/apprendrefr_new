import React, { Component } from 'react';
import './CenterBlock.css';

import Proverb from './proverb/Proverb';

class CenterBlock extends Component{

    render(){

        return(
            <div className="CenterBlock-block">
                <Proverb/>
            </div>
        );
    }
}

export default CenterBlock;