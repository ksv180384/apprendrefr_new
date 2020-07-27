import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

const LyricsList = (props) => {

    const listArtistsView = (list) => {
        return Object.keys(list).map((key) => {
           return (
               <li key={ list[key].id }>
                   { list[key].name }
                   <ul className="songs-list">
                       { listSongsView(list[key].songs) }
                   </ul>
                </li>
           )
        });
    };

    const listSongsView = (list) => {
        return Object.keys(list).map((key) => {
            return (
                <li key={ list[key].id }>
                    <Link className="link" to={ '/lyrics/item/' + list[key].id }>{ list[key].title }</Link>
                </li>
            )
        });
    };

    const { list }  = props;

    return(
        <div className="Lyrics-list-block">
            <div className="panel_header"><h1>Тексты, транскрипции и переводы французских песен</h1></div>
            {
                list
                    ?
                    <ul className="artists-list">
                        { listArtistsView(list) }
                    </ul>

                    :
                    <div>пусто</div>
            }
        </div>
    )
};

const mapStateToProps = (state) => {
    return {
        list: state.lyricReducer.list,
    }
};

export default connect(mapStateToProps, {  })(LyricsList);