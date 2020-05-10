import React, { Component } from 'react';
import './Statistics.css';

class Statistics extends Component{


    render(){

        return(
            <div className="Statistics">
                <div className="panel">
                    <div className="panel_header">Статистика</div>
                    <div className="panel_content">
                        <ul className="panel-list">
                            <li>Посетители <span id="statisticUsersOnline">1</span></li>
                            <li>Гостей <span id="statisticUsersGuest">1</span></li>
                            <li>Всего <span id="statisticUsersAll">1</span></li>
                            <li>Зарегистрировано <span id="statisticUsersOnline">1</span></li>
                            <li>Всего сообщений <span id="statisticUsersOnline">1</span></li>
                        </ul>
                    </div>
                </div>
            </div>
        );
    }
}

export default Statistics;