import React, { Component } from 'react';
import { connect } from 'react-redux';

import './Statistics.css';

class Statistics extends Component{


    render(){

        const { count_all, count_guests, count_users, count_users_register, count_messages } = this.props.statistic;

        return(
            <div className="Statistics">
                <div className="panel">
                    <div className="panel_header">Статистика</div>
                    <div className="panel_content">
                        <ul className="panel-list">
                            <li>Посетители <span id="statisticUsersOnline">{ count_users }</span></li>
                            <li>Гостей <span id="statisticUsersGuest">{ count_guests }</span></li>
                            <li>Всего <span id="statisticUsersAll">{ count_all }</span></li>
                            <li>Зарегистрировано <span id="statisticUsersOnline">{ count_users_register }</span></li>
                            <li>Всего сообщений <span id="statisticUsersOnline">{ count_messages }</span></li>
                        </ul>
                    </div>
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        statistic: state.statisticReducer,
    }
};

export default connect(mapStateToProps, {})(Statistics);