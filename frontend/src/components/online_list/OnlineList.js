import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

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
                                                <Link to={'/user/info/' + online_users[key].id} className="link">
                                                    {online_users[key].login}
                                                </Link>
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