import React, { Component } from 'react';
import { connect } from 'react-redux';

import { closeSong, initLyrics } from '../../store/actions/playerActons';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faTimes} from "@fortawesome/free-solid-svg-icons/index";

class Song extends Component{

    constructor(props){
        super(props);

        this.closeSong = () =>{
            props.closeSong();
        };



    }

    componentDidMount(){
        //const Lyrics = new GoLyrics(this.props.song);
    }

    render(){

        const { show, lyrics, title } = this.props;

        let class_hidden = ' hidden';
        if(show){
            class_hidden = '';
        }

        return(

            <div className={ "player-text-block" + class_hidden}>
                <div className="panel_header">
                    Текст песни { title }
                    <div className="modal-close" onClick={ this.closeSong }>
                        <FontAwesomeIcon icon={ faTimes }/>
                    </div>
                </div>
                <div className="player-text-item-block">
                    <div className="label">
                        Оригинал
                    </div>
                    <div className="player-text-content-block">
                        <div id="FrText" className="player-text-content" dangerouslySetInnerHTML={{__html: lyrics.getFr() }} />
                    </div>
                </div>

                <div className="player-text-item-block">
                    <div className="label">
                        Транскрипция
                    </div>
                    <div className="player-text-content-block">
                        <div id="TrText" className="player-text-content" dangerouslySetInnerHTML={{__html: lyrics.getTr()}} />
                    </div>
                </div>

                <div className="player-text-item-block">
                    <div className="label">
                        Перевод
                    </div>
                    <div className="player-text-content-block">
                        <div id="RuText" className="player-text-content" dangerouslySetInnerHTML={{__html: lyrics.getRu() }} />
                    </div>
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state) => {

    return {
        show: state.playerReducer.show_player_text_block,
        title: state.playerReducer.song.title,
        lyrics: state.playerReducer.song_lyrics,
    }
};

export default connect(mapStateToProps, { closeSong })(Song);