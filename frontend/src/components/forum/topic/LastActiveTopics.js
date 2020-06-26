import React, { Component } from 'react';
import { connect } from 'react-redux';

import LastActiveTopicItem from './LastActiveTopicItem';

import './topic.css';

class LastActiveTopics extends Component{

    render(){

        const { topics } = this.props;

        return(
            <div className="LastActiveTopic-list">
                <div className="panel_header">Последние темы</div>
                {
                    Object.keys(topics).map(key => {
                        return <LastActiveTopicItem key={ topics[key].id } topic={ topics[key] }/>
                    })
                }
            </div>
        );
    }
}

const mapStateToPage = (state) => {
    return {
        topics: state.pageDataReducer
    }
};

export default connect(mapStateToPage, {  })(LastActiveTopics);