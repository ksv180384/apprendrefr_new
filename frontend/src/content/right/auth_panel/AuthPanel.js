import React, { Component } from 'react';
import './AuthPanel.css';

import ReactTooltip from 'react-tooltip';

import BtnLoad from './../../../components/btn_load/BtnLoad';

import Axios from 'axios';
Axios.defaults.headers.common = {
    'Authorization':localStorage.getItem('user-token'),
};

import { userAuth } from './../../../actions';
import store from "../../../store";
import {loadPage} from "../../../actions";


class AuthPanel extends Component{

    constructor(props){
        super(props);

        this.state = {
            email: '',
            password: '',
            remember: false,
            loadFormLoginUser: false,
        };

        this.handleChangeFormInpitText = (event) => {
            this.setState({ [event.target.name]: event.target.value });
        };

        this.handleChangeRemember = (event) => {
            this.setState({ remember: event.target.checked });
        };

        this.handleSubmit = (event) => {
            event.preventDefault();

            this.setState({ loadFormLoginUser: true });

            const url = event.target.attributes.getNamedItem('action').value;

            store.dispatch(loadPage({ load: true }));
            Axios.post(url, {
                email: this.state.email,
                password: this.state.password,
                remember: this.state.remember
            })
                .then((response) => {
                    console.log(response.data.user_data);

                    this.setState({
                        email: '',
                        password: '',
                        remember: false,
                        loadFormLoginUser: false,
                    });
                    localStorage.setItem('user-token', response.data.token_type + ' ' + response.data.access_token);
                    store.dispatch(userAuth(response.data.user_data));
                    store.dispatch(loadPage({ load: false }));
                })
                .catch((error) => {
                    //console.log(error.response.data);
                    store.dispatch(loadPage({ load: false }));
                    this.setState({
                        password: '',
                        loadFormLoginUser: false,
                    });
                });
        };

    }

    render(){

        const { email, password, remember, loadFormLoginUser } = this.state;
        const { api_path } = store.getState();

        return(
            <div className="AuthPanel-block">
                <div className="panel">
                    <div className="panel_header">
                        Панель авторизации
                    </div>
                    <div className="panel_content">
                        <form action={ api_path + '/api/auth/login' }
                              method="post"
                              onSubmit={ this.handleSubmit }
                        >
                            <div className="login-block">
                                <div className="login-input-block">
                                    <div className="login-input-item">
                                        <input name="email"
                                               type="text"
                                               placeholder="Ваш логин/email"
                                               required
                                               value={ email }
                                               data-tip data-for="tooltipLoginInput"
                                               onChange={ this.handleChangeFormInpitText }
                                        />
                                        <ReactTooltip id="tooltipLoginInput" effect="solid" delayShow={1000} className="tooltip-header">
                                            Votre identifiant/email
                                        </ReactTooltip>
                                    </div>
                                    <div className="login-input-item">
                                        <input name="password"
                                               type="password"
                                               placeholder="пароль"
                                               value={ password }
                                               data-tip data-for="tooltipPasswordInput"
                                               required
                                               onChange={ this.handleChangeFormInpitText }
                                        />
                                        <ReactTooltip id="tooltipPasswordInput" effect="solid" delayShow={1000} className="tooltip-header">
                                            Votre mot de passe
                                        </ReactTooltip>
                                    </div>
                                </div>
                            </div>
                            <div className="login-remember-block" data-tip data-for="tooltipRememberCheckbox">
                                <div className="checkbox-apr">
                                    <input id="remember"
                                           type="checkbox"
                                           name="remember"
                                           checked={ remember }
                                           onChange={ this.handleChangeRemember }
                                    />
                                    <span></span>
                                </div>
                                <label htmlFor="remember">Запомнить</label>
                                <ReactTooltip id="tooltipRememberCheckbox" effect="solid" delayShow={1000} className="tooltip-header">
                                    Se souvenir moi
                                </ReactTooltip>
                            </div>
                            <div className="login-submit-block" data-tip data-for="tooltipLoginBtn">
                                <BtnLoad load={ loadFormLoginUser } type="submit" title="Вход"/>
                                <ReactTooltip id="tooltipLoginBtn" effect="solid" delayShow={1000} className="tooltip-header">
                                    Connexion
                                </ReactTooltip>
                            </div>
                            <div className="login-registration-link-block">
                                <a href="#" className="link">Забыли пароль?</a>
                                <a href="#" className="link" data-tip data-for="tooltipRegistrationLink">Регистрация</a>
                                <ReactTooltip id="tooltipRegistrationLink" effect="solid" delayShow={1000} className="tooltip-header">
                                    S'inscrire
                                </ReactTooltip>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        );
    }
}

export default AuthPanel;