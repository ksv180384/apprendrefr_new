import React, { Component } from 'react';
import { connect } from 'react-redux';
import { config } from '../../config';
import { setUser } from '../../store/actions/userActions';
import { setLoader } from "../../store/actions/loaderActions";
import { setLogin } from "../../store/actions/loginActions";
import { setLoaderPage } from "../../store/actions/loaderPageActions";
import { setStatistic } from "../../store/actions/statisticActions";

import store from "../../store";

import { Link } from 'react-router-dom';
import axios from "axios/index";

import './UserPanel.css';

class UserPanel extends Component{

    componentDidMount(){
        this.changePage = (e) => {
            this.props.setLoaderPage(true);
        };

        this.logout = (e) => {
            e.preventDefault();

            store.dispatch(setLoader(true));
            axios.defaults.headers.common = {
                'Authorization':localStorage.getItem('user-token'),
                'App-User-Token': config.UserToken ,
            };
            axios.post(config.path + 'api/auth/logout', {})
                .then((response) => {
                    store.dispatch(setLoader(false));
                    store.dispatch(setLogin(response.data.auth));
                    store.dispatch(setUser({}));
                    if(response.data.statistic){
                        store.dispatch(setStatistic(response.data.statistic));
                    }
                    localStorage.setItem('user-token', null);
                })
                .catch((error) => {
                    store.dispatch(setLoader(false));
                });
        }
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
                        <div className="user-rang text-center mt-5 mb-10">
                            { rang_title }
                        </div>
                        <ul className="panel-list">
                            <li>
                                <Link to='/profile' onClick={ (e) => this.changePage(e) } className="link">Профиль</Link>
                            </li>
                            <li><a href="#">Личные сообщения</a></li>
                            <li><Link to={'/users-list'}>Пользователи</Link></li>
                            <li><a href="#" onClick={ (e) => this.logout(e) }>Вход</a></li>
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

export default connect(mapStateToProps, { setLoaderPage, setStatistic })(UserPanel);