import React, { Component } from 'react';
import './Left.css';
import Player from "../../../components/player/Player";
import Test from "../../../components/test/Test";
import WordsList from "../../../components/words_list/WordsList";
import Joke from "../../../components/joke/Joke";



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