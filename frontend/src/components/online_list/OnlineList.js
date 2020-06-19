import React, { Component } from 'react';
import { connect } from 'react-redux';

import './OnlineList.css';

class OnlineList extends Component{

    render() {

        const {online_users} = this.props.statistic;

        if (online_users.length === 0) {

            return ('')
        } else {
            return (
                <div className="Online-list">
                    <div className="panel">
                        <div className="panel_content">
                            <ul>
                                {
                                    Object.keys(online_users).map(key => {
                                        return (
                                            <li key={online_users[key].id}>
                                                <a href={'#' + online_users[key].id} className="link">
                                                    {online_users[key].login}
                                                </a>
                                            </li>
                                        )
                                    })
                                }
                            </ul>
                        </div>
                    </div>
                </div>
            );
        }
    }
}

const mapStateToProps = (state) => {
    return {
        statistic: state.statisticReducer,
    }
};

export default connect(mapStateToProps, {})(OnlineList);