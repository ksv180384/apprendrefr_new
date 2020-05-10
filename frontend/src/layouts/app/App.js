import React, { Component } from 'react';
import './App.css';

import Left from './left/Left';
import CenterBlock from './center/CenterBlock';
import Right from './right/Right';

class App extends Component{

    render(){
        return(
            <div className="App">
                <div className="App-left-block">
                    <Left/>
                </div>
                <div className="App-center-block">
                    <CenterBlock/>
                </div>
                <div className="App-right-block">
                    <Right/>
                </div>
            </div>
        )
    }
}

export default App;