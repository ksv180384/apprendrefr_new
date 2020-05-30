import React, { Component } from 'react';
import { connect } from 'react-redux';
import { config } from '../../config';
import { getUser, setUser } from '../../store/actions/userActions';
import { setLoader } from "../../store/actions/loaderActions";
import { setAuth } from "../../store/actions/authActions";

import store from "../../store";

import { Link } from 'react-router-dom';
import axios from "axios/index";

import './UserPanel.css';

class UserPanel extends Component{

    constructor(){
        super();

        this.logout = (e) => {
            e.preventDefault();

            store.dispatch(setLoader(true));
            axios.defaults.headers.common = {
                'Authorization':localStorage.getItem('user-token'),
            };
            axios.post(config.path + 'api/auth/logout', {})
                .then((response) => {
                    store.dispatch(setLoader(false));
                    store.dispatch(setAuth(response.data.auth));
                    store.dispatch(setUser(response.data.user));
                })
                .catch((error) => {
                    store.dispatch(setLoader(false));
                });
        }
    }

    componentDidUpdate(){
        //this.props.user = this.props.getUser();
        this.props.user = store.getState().userReducer;
    }
    
    render(){

        const { login, avatar, rang_title } = this.props.user;

        return(
            <div className="User-panel">
                <div className="panel">
                    <div className="panel_header">
                        Панель пользователя
                    </div>
                    <div className="panel_content">
                        <div className="user-name">
                            { login }
                        </div>
                        <div className="avatar-right-mini-panel" style={ { backgroundImage: 'url(' + avatar + ')' }  }>

                        </div>
                        <div className="user-name mt-5 mb-10">
                            { rang_title }
                        </div>
                        <ul className="panel-list">
                            <li>
                                <Link to='/profile' className="link">Профиль</Link>
                            </li>
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

const mapStateToProps = (state) => {
    return {
        user: state.userReducer,
    }
};

export default connect(mapStateToProps, { getUser })(UserPanel);