import React from 'react';
import { connect } from 'react-redux';

const LyricItem = (props) => {

    const { song } = props;

    return(
        song
            ?
            <div className="Lyric-item">
                <div className="panel_header">{ song.artist_name } - { song.title }</div>
                <table>
                    <tbody>
                        {
                            Object.keys(song.text_fr).map((key) => {
                                return (
                                    <tr key={ key }>
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
};

const mapStateToProps = (state) => {
    return {
        song: state.lyricReducer.song,
    }
};

export default connect(mapStateToProps, {  })(LyricItem);