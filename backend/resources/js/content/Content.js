import React, { Component } from 'react';
import './Content.css';

import Left from './left/Left';
import CenterBlock from './center/CenterBlock';
import Right from './right/Right';

class Content extends Component{

    render(){
        return(
            <div className="Content">
                <div className="Content-left-block">
                    <Left/>
                </div>
                <div className="Content-center-block">
                    <CenterBlock/>
                </div>
                <div className="Content-right-block">
                    <Right/>
                </div>
            </div>
        )
    }
}

export default Content;