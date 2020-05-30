import React, { Component } from 'react';
import { connect } from 'react-redux';
import { config } from '../../config';
import store from '../../store';
import { setUser } from '../../store/actions/userActions';
import { setAuth } from '../../store/actions/authActions';
import { setLoader } from '../../store/actions/loaderActions';

import ReactTooltip from 'react-tooltip';
import { Link } from 'react-router-dom';

import BtnLoad from './../btn_load/BtnLoad';

import Axios from 'axios';
Axios.defaults.headers.common = {
    'Authorization':localStorage.getItem('user-token'),
};

//import { userAuth, loadPage } from '../../store/actions';

import './AuthPanel.css';

class AuthPanel extends Component{

    constructor(props){
        super(props);

        this.state = {
            email: '',
            password: '',
            remember: false,
            loadFormLoginUser: false,
        };

        this.handleChangeFormInpitText = (e) => {
            this.setState({ [e.target.name]: e.target.value });
        };

        this.handleChangeRemember = (e) => {
            this.setState({ remember: e.target.checked });
        };

        this.handleSubmit = (e) => {
            e.preventDefault();

            store.dispatch(setLoader(true));
            this.setState({ loadFormLoginUser: true });
            console.log(store.getState());
            Axios.post(config.path + 'api/auth/login', {
                email: this.state.email,
                password: this.state.password,
                remember: this.state.remember
            })
                .then((response) => {

                    this.setState({
                        email: '',
                        password: '',
                        remember: false,
                        loadFormLoginUser: false,
                    });
                    localStorage.setItem('user-token', response.data.token_type + ' ' + response.data.access_token);
                    store.dispatch(setUser(response.data.user_data.user));
                    store.dispatch(setAuth(response.data.user_data.auth));
                    store.dispatch(setLoader(false));
                })
                .catch((error) => {
                    store.dispatch(setLoader(false));
                    this.setState({
                        password: '',
                        loadFormLoginUser: false,
                    });
                });
        };
    }

    componentDidMount(){

    }

    render(){

        const { email, password, remember, loadFormLoginUser } = this.state;

        return(
            <div className="AuthPanel-block">
                <div className="panel">
                    <div className="panel_header">
                        Панель авторизации
                    </div>
                    <div className="panel_content">
                        <form action={ config.path + 'api/auth/login' }
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
                                <Link to='/lost-password' className="link">Забыли пароль?</Link>
                                <Link to="/registration"
                                   className="link"
                                   data-tip data-for="tooltipRegistrationLink"
                                >Регистрация</Link>
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

const mapStateToProps = (state) => {
    return {
        user: state.userReducer,
        loader: state.loaderReducer,
    };
};

export default connect(mapStateToProps, { setUser, setLoader })(AuthPanel);