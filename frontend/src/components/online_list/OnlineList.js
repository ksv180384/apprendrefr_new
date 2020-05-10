import React, { Component } from 'react';
import './OnlineList.css';

class OnlineList extends Component{

    render(){

        return(
            <div className="Online-list">
                <div className="panel">
                    <div className="panel_content">
                        <ul>
                            <li><a href="" className="link">Admin</a></li>
                            <li><a href="" className="link">ДиммКа</a></li>
                            <li><a href="" className="link">Тайка</a></li>
                            <li><a href="" className="link">Anastasia</a></li>
                            <li><a href="" className="link">Мария</a></li>
                        </ul>
                    </div>
                </div>
            </div>
        );
    }
}

export default OnlineList;