import React, { Component } from 'react';
import { connect } from 'react-redux';
import { config } from '../../config';

// actions
import { setUser } from '../../store/actions/userActions';
import { setLoader } from "../../store/actions/loaderActions";
import { setLogin } from "../../store/actions/loginActions";
import { setLoaderPage } from "../../store/actions/loaderPageActions";
import { setStatistic } from "../../store/actions/statisticActions";

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSortDown } from '@fortawesome/free-solid-svg-icons';

import store from "../../store";

import { Link } from 'react-router-dom';
import axios from "axios/index";

import './UserPanel.css';

class UserPanel extends Component{

    constructor(){
        super();

        this.state = {
            show_list: false,
        };

        this.toggleControlListPanel = (e) => {
            e.preventDefault();
            this.setState({ ...this.state, show_list: !this.state.show_list });
        }
    }

    componentDidMount(){
        this.changePage = (e) => {
            this.props.setLoaderPage(true);
        };

        this.logout = (e) => {
            e.preventDefault();

            store.dispatch(setLoader(true));
            axios.defaults.headers.common = config.headerAuthorizationToken();
            axios.post(config.path + 'api/auth/logout', {})
                .then((response) => {
                    store.dispatch(setLoader(false));
                    store.dispatch(setLogin(response.data.auth));
                    store.dispatch(setUser(null));
                    if(response.data.statistic){
                        store.dispatch(setStatistic(response.data.statistic));
                    }
                    localStorage.setItem('user-token', null);
                })
                .catch((error) => {
                    store.dispatch(setLoader(false));
                });
        };

        this.hideControlListPanelOutside = (e) => {
            if(
                !e.target.matches('.User-panel-control, .User-panel-control *') &&
                this.state.show_list &&
                !e.target.matches('.User-mini-panel, .User-mini-panel *')
            ) {
                this.setState({ ...this.state, show_list: false });
            }
        };

        window.addEventListener('click', this.hideControlListPanelOutside);
    }

    componentWillUnmount(){
        window.removeEventListener('click', this.hideControlListPanelOutside);
    }

    render(){

        const { login, avatar, rang_title } = this.props.user;
        const { show_list } = this.state;

        let class_show_list = ' hidden';
        if(show_list){
            class_show_list = '';
        }

        return(
            <div className="User-panel">

                <div className="User-mini-panel" onClick={ this.toggleControlListPanel }>
                    <div className="avatar-mini-panel" style={ { backgroundImage: 'url(' + avatar + ')' }  } title={ login }>

                    </div>
                    <div className="list-panel">
                        <FontAwesomeIcon icon={ faSortDown }/>
                    </div>
                </div>

                <div className={ 'User-panel-control' + class_show_list }>
                    <div className="user-name-mini">
                        { login }
                    </div>

                    <div className="user-rang-mini text-center mt-5 mb-10">
                        { rang_title }
                    </div>
                    <ul className="panel-list">
                        <li>
                            <Link to='/profile' onClick={ (e) => this.changePage(e) } className="link">Профиль</Link>
                        </li>
                        {/*<li><a href="#">Личные сообщения</a></li>*/}
                        <li><Link to={'/users-list'}>Пользователи</Link></li>
                        <li><a href="#" onClick={ (e) => this.logout(e) }>Вход</a></li>
                    </ul>
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
