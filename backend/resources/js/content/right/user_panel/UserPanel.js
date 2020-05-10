import React, { Component } from 'react';
import './UserPanel.css';
import { userAuth, loadPage } from "../../../actions";
import store from "../../../store";
import Axios from "axios/index";

class UserPanel extends Component{

    constructor(){
        super();

        this.logout = (e) => {
            store.dispatch(loadPage( {load: true} ));
            e.preventDefault();
            Axios.post('/json/logout', {})
                .then((response) => {
                    store.dispatch(userAuth(response.data));
                    store.dispatch(loadPage( {load: false} ));
                })
                .catch((error) => {
                    console.log(error.response.data);
                    store.dispatch(loadPage( {load: false} ));
                });
        }
    }
    
    render(){
        
        return(
            <div className="User-panel">
                <div className="panel">
                    <div className="panel_header">
                        Панель пользователя
                    </div>
                    <div className="panel_content">
                        <div className="user-name">
                            Admin
                        </div>
                        <div className="avatar-right-mini-panel">

                        </div>
                        <div className="user-name mt-5 mb-10">
                            Администратор
                        </div>
                        <ul className="panel-list">
                            <li><a href="#">Профиль</a></li>
                            <li><a href="#">Личные сообщения</a></li>
                            <li><a href="#">Пользователи</a></li>
                            <li><a href="#" onClick={ this.logout }>Вход</a></li>
                        </ul>
                    </div>
                </div>
            </div>
        );
    }
}

export default UserPanel;