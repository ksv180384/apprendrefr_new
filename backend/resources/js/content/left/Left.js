import React, { Component } from 'react';
import './Left.css';

import Player from './player/Player';
import Test from './test/Test';
import WordsList from './words_list/WordsList';
import Joke from './joke/Joke';

class Left extends Component{

    render(){

        return(
            <div className="Left-block">
                <Player/>
                <Test/>
                <WordsList/>
                <Joke/>
            </div>
        );
    }
}

export default Left;