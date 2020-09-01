import React, { Component } from 'react';
import { connect } from 'react-redux';


class LyricItem extends Component{

    constructor(){
        super();

        this.state = {
            lang: 'fr',
            active: false,
        };

        this.changeLang = (e) => {
            const lang = e.target.innerText.toLowerCase();
            this.setState({ ...this.state, lang: lang });
        };

        this.toggleActive = (e) => {
            const i = e.currentTarget.dataset.key;
           this.setState({
               ...this.state,
               active: (this.state.active !== i ? i : false),
           });
        }
    }

    render(){
        const { song } = this.props;
        const { lang, active } = this.state;

        return(
            song
                ?
                <div className={ 'Lyric-item ' + lang }>
                    <div className="lyric-mini-menu">
                        <ul>
                            <li className={ lang === 'fr' ? 'active' : '' } onClick={ this.changeLang }>Fr</li>
                            <li className={ lang === 'tr' ? 'active' : '' } onClick={ this.changeLang }>Tr</li>
                            <li className={ lang === 'ru' ? 'active' : '' } onClick={ this.changeLang }>Ru</li>
                        </ul>
                    </div>
                    <div className="panel_header"><h1>{ song.artist_name } - { song.title }</h1></div>
                    <table>
                        <tbody>
                        {
                            Object.keys(song.text_fr).map((key) => {
                                return (
                                    <tr key={ key }
                                        data-key={ key }
                                        className={ active === key ? 'active' : '' }
                                        onClick={ this.toggleActive }>
                                        <td dangerouslySetInnerHTML={{__html: song.text_fr[key] }}/>
                                        <td dangerouslySetInnerHTML={{__html: song.text_ru[key] }}/>
                                        <td dangerouslySetInnerHTML={{__html: song.text_transcription[key] }}/>
                                    </tr>
                                )
                            })
                        }
                        </tbody>
                    </table>
                </div>
                :
                <div>пусто</div>
        )
    }
};

const mapStateToProps = (state) => {
    return {
        song: state.lyricReducer.song,
    }
};

export default connect(mapStateToProps, {  })(LyricItem);