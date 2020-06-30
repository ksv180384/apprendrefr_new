import React, { Component } from 'react';
import { connect } from 'react-redux';

// components
import ForumItem from './ForumItem';

import './forum.css';

class ForumsList extends Component {

    render(){

        const { forums } = this.props;

        return(
            <div className="ForumsList-list">
                <div className="panel_header"><h1>Форум</h1></div>
                <div className="ForumsList-list-header-table">
                    <div className="ForumsList-list-header-table-info">
                        Форумы
                    </div>
                    <div className="ForumsList-list-header-table-count-topics">
                        Тем
                    </div>
                    <div className="ForumsList-list-header-table-count-messages">
                        Сообщений
                    </div>
                </div>
                {
                    forums
                    ?
                        Object.keys(forums).map((key) => {
                            return <ForumItem key={ forums[key].id } forum={ forums[key] }/>
                        })
                    :
                        <div>Пусто</div>
                }
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        forums: state.pageDataReducer
    };
};

export default connect(mapStateToProps, {  })(ForumsList);