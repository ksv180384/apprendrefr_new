import React, { Component } from 'react';
import ReactTooltip from 'react-tooltip';
import Jsmediatags from 'jsmediatags';
import Moment from 'moment';

import './Player.css';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlay, faStop, faUpload, faBars, faPause } from '@fortawesome/free-solid-svg-icons';

class Player extends Component{

    constructor(props){
        super(props);

        this.player = document.getElementById('PlayerMp3');

        this.audio = null;

        this.state = {
            play: false,
            upload_file: false,
        };

        this.openWindowUploadFile = () => {

            const input = document.getElementById('uploadFile');
            input.click();
        };

        this.uploadFile = (e) => {

            const file_type =  e.target.files[0].type;
            if (file_type.indexOf('audio') !== -1){
                this.audioFileInit(e.target.files[0]);
            }
        };

        this.audioFileInit = (file) => {
            const sound = URL.createObjectURL(file);
            const a = new Audio(sound);
            this.audio = a;
            Jsmediatags.read(file, {
                onSuccess: function(tag) {
                    console.log(Moment(a.duration*1000).format('mm:ss'));
                    console.log(file.name);
                    console.log(tag.tags.artist);
                    console.log(tag.tags.title);
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
            }else{
                this.setState({play: true});
                this.audio.play();
            }
        };

        this.stop = () => {
            if(this.audio){
                this.audio.pause();
            }
        };
    }


    render(){

        const { play, upload_file } = this.state;

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
                                <FontAwesomeIcon icon={faPlay}/>
                                <FontAwesomeIcon icon={faPause}/>
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
                                onClick={ this.openWindowUploadFile }
                            >
                                { <FontAwesomeIcon icon={faUpload}/> }
                                <ReactTooltip id="tooltipPlayerOpenMp3" effect="solid" delayShow={1000} className="tooltip-player">
                                    Открыть mp3 файл
                                </ReactTooltip>
                            </li>
                            <li id="playerBTNList" data-tip data-for="tooltipPlayerList">
                                { <FontAwesomeIcon icon={faBars}/> }
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
            </div>
        );
    }
}

export default Player;