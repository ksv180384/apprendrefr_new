import React, { Component } from 'react';
import { connect } from 'react-redux';

import { loadSong, closeSongsList } from '../../store/actions/playerActons';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes, faSpinner} from "@fortawesome/free-solid-svg-icons/index";

class SongsList extends Component{

    constructor(props){
        super(props);

        this.closeSongsList = () =>{
            props.closeSongsList();
        };


        this.selectSong = (e) => {
            const el = e.currentTarget;
            const id = el.getAttribute('data-id');
            this.props.loadSong(id);
        }
    }

    render(){

        //const { show } = this.props;
        const { show, songs_list, loading } = this.props;

        let hidden_class = ' hidden';
        if(show){
            hidden_class = '';
        }
        return(
            <div id="playerSongsList" className={"player-songs-list-block" + hidden_class}>
                <div className="panel_header">
                    Список песен
                    <div className="modal-close" onClick={ this.closeSongsList }>
                        <FontAwesomeIcon icon={ faTimes }/>
                    </div>
                </div>
                <div className="player-songs-list-content">
                    {
                        loading
                        ?
                        <div className="player-songs-preloader">
                            <FontAwesomeIcon icon={ faSpinner } spin/>
                        </div>
                        :
                        <ul>
                            {
                                Object.keys(songs_list).map((key) => {
                                    return(
                                        <li key={ songs_list[key].id }
                                            data-id={ songs_list[key].id }
                                            onClick={ this.selectSong }
                                        >
                                            <span className="player-songs-artist-name">
                                                { songs_list[key].artist_name }
                                            </span>
                                            <span className="player-song-title">
                                                { songs_list[key].title }
                                            </span>
                                        </li>
                                    )
                                })
                            }

                        </ul>
                    }
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        songs_list: state.playerReducer.songs_list,
        loading: state.playerReducer.loading,
        show: state.playerReducer.show_player_song_list_block,
    }
};

export default connect(mapStateToProps, { loadSong, closeSongsList })(SongsList);