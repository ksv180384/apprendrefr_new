import React, { Component } from 'react';
import ReactTooltip from 'react-tooltip';
import Jsmediatags from 'jsmediatags';
import Moment from 'moment';
import { connect } from 'react-redux';
import { loadSongsList, closeSongList, searchSong } from '../../store/actions/playerActons';

import SongsList from './SongsList';
import Song from './Song';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlay, faStop, faUpload, faBars, faPause } from '@fortawesome/free-solid-svg-icons';

import './Player.css';
import {faSpinner} from "@fortawesome/free-solid-svg-icons/index";

class Player extends Component{

    constructor(props){
        super(props);

        this.fr_text = null; // DOM элемент с францзским текстом
        this.tr_text = null; // DOM элемент с текстом транскрипции
        this.ru_text = null; // DOM элемент с русским текстом
        this.time_interval = null; // Анимация скролинга текста по таймеру (setTimeInterval())
        this.p = 0; // Текщая позиция трека в пикселях

        // Объект audio с загруженным файлом
        this.audio = null;

        this.state = {
            play: false,
            upload_file: false,
            show_songs_list: false,
            show_song: false,
        };

        this.openWindowUploadFile = () => {

            this.stop();
            const input = document.getElementById('uploadFile');
            input.click();
        };

        this.uploadFile = (e) => {

            if(typeof e.target.files[0] === 'undefined'){
                return true;
            }
            const file_type =  e.target.files[0].type;
            if (file_type.indexOf('audio') !== -1){
                this.audioFileInit(e.target.files[0]);
            }
        };

        this.audioFileInit = (file) => {
            const sound = URL.createObjectURL(file);
            this.audio = new Audio(sound);
            const audio = this.audio;
            //this.audio.ontimeupdate = () => { this.goLyrics(this.audio.currentTime.toFixed(2)) };
            //
            Jsmediatags.read(file, {
                onSuccess: (tag) => {
                    console.log(Moment(audio.duration*1000).format('mm:ss'));
                    console.log(file.name);
                    console.log(tag.tags.artist);
                    console.log(tag.tags.title);
                    console.log(tag.tags);
                    this.props.searchSong(tag.tags.artist, tag.tags.title, file.name);
                },
                onError: function(error) {
                    console.log(':(', error.type, error.info);
                }
            });
            this.setState({upload_file: true});
        };

        this.play = (e) => {

            if(!this.audio){
                return true;
            }
            if(this.state.play){
                this.setState({play: false});
                this.audio.pause();
                clearTimeout(this.time_interval);
            }else{
                this.setState({play: true});
                this.audio.play();
                this.fr_text = document.getElementById('FrText');
                this.tr_text = document.getElementById('TrText');
                this.ru_text = document.getElementById('RuText');

                // Устанавливаем начальное положение текста
                this.fr_text.style.top = '50%';
                this.tr_text.style.top = '50%';
                this.ru_text.style.top = '50%';
                // Фмксируем начальное положение текста
                this.text_position = parseInt(window.getComputedStyle(this.fr_text).top, 10);
                // Текщая позиция трека в пикселях
                this.p = 0;
                // Анимация скролинга текста по таймеру
                this.time_interval = setInterval(() => {
                    let maintenant_temps = this.audio.currentTime; // Текущее время проигрывания трека
                    // Пробегаем по массиву в котором указано время для каждого пикселя
                    for(let pixel = 0; this.props.lyrics.times_position_text.length >= pixel; pixel++) {
                        // Если текущее время проигрывания трека больше чем время элемента массива, то берам индекс
                        // массива (кол-во пикселей) и отнимаем от первоначального положения текста
                        if (this.p === pixel && parseFloat(this.props.lyrics.times_position_text[pixel]) <= parseFloat(maintenant_temps)) {
                            let css_top = (this.text_position - pixel) + 'px';
                            this.fr_text.style.top = css_top;
                            this.tr_text.style.top = css_top;
                            this.ru_text.style.top = css_top;
                            this.p = pixel + 1;
                        }
                    }
                }, 30);
            }
        };

        this.stop = () => {
            if(this.audio){
                this.setState({play: false});
                this.audio.pause();
                this.audio.currentTime = 0;
                this.p = 0;
                if(this.fr_text){
                    this.fr_text.style.top = '50%';
                    this.tr_text.style.top = '50%';
                    this.ru_text.style.top = '50%';
                }
            }
            clearTimeout(this.time_interval);
        };

        // Показываем список треков
        this.showSongsList = () =>{
            this.props.loadSongsList();
            this.setState({ ...this.state, show_songs_list: true});
        };

        // Закрываем список треков
        this.closeSongsList = () =>{
            this.setState({ ...this.state, show_songs_list: false});
            this.props.closeSongList();
        };

    }

    render(){

        const { play, upload_file, show_songs_list, show_song } = this.state;
        const { loading_open_track } = this.props;

        return(
            <div className="panel">
                <div className="panel_header" data-tip data-for="tooltipPlayerBlock">
                    Плеер
                    <ReactTooltip id="tooltipPlayerBlock" effect="solid" delayShow={1000} className="tooltip-header">
                        Un lecteur
                    </ReactTooltip>
                </div>
                <div className="panel_content player-block">
                    <div id="PlayerMp3" className="Player-control-panel">
                        <ul>
                            <li id="playerBTNPlay" className={ play?'play':'' } data-tip data-for="tooltipPlayerPlay" onClick={ this.play }>
                                <FontAwesomeIcon icon={ faPlay }/>
                                <FontAwesomeIcon icon={ faPause }/>
                                <ReactTooltip clssName="tooltip-header" id="tooltipPlayerPlay" effect="solid" delayShow={1000} className="tooltip-player">
                                    Плей/пауза
                                </ReactTooltip>
                            </li>
                            <li id="playerBTNStop" data-tip data-for="tooltipPlayerStop" onClick={ this.stop }>
                                { <FontAwesomeIcon icon={faStop}/> }
                                <ReactTooltip id="tooltipPlayerStop" effect="solid" delayShow={1000} className="tooltip-player">
                                    Стоп
                                </ReactTooltip>
                            </li>
                            <li id="playerBTNOpen"
                                data-tip data-for="tooltipPlayerOpenMp3"
                                className={ upload_file?'open':'' }
                                onClick={ loading_open_track ? ()=>{return false} : this.openWindowUploadFile }
                            >
                                { loading_open_track ? <FontAwesomeIcon icon={ faSpinner } spin/> : <FontAwesomeIcon icon={faUpload}/> }
                                <ReactTooltip id="tooltipPlayerOpenMp3" effect="solid" delayShow={1000} className="tooltip-player">
                                    Открыть mp3 файл
                                </ReactTooltip>
                            </li>
                            <li id="playerBTNList" data-tip data-for="tooltipPlayerList" onClick={ this.showSongsList }>
                                { <FontAwesomeIcon icon={ faBars }/> }
                                <ReactTooltip id="tooltipPlayerList" effect="solid" delayShow={1000} className="tooltip-player">
                                    Показать список текстов
                                </ReactTooltip>
                            </li>
                        </ul>
                        <input type="file" className="hidden" name="upload_file" id="uploadFile" onChange={ this.uploadFile }/>
                    </div>
                    <div className="Player-info-panel">
                        <strong>Инструкция:</strong><br/>
                        Откройте mp3 файл со своего компьютера при помощи кнопки <strong>"открыть mp3 файл"</strong>.
                        Программа попытается сама найти текст, если не найдет, то нажмите на кнопку <strong>"показать
                        список текстов"</strong>. Выберите нужный текст и нажмите кнопку <strong>"плей/пауза"</strong>
                    </div>
                </div>



                <SongsList show={ show_songs_list }/>
                <Song show={ show_song }/>




            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        lyrics: state.playerReducer.song_lyrics,
        loading_open_track: state.playerReducer.loading_open_track,
    }
};

export default connect(mapStateToProps, { loadSongsList, closeSongList, searchSong })(Player);