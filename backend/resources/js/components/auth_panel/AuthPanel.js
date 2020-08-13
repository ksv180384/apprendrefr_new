import React, { Component } from 'react';
import { connect } from 'react-redux';
import { config } from '../../config';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faTimes} from "@fortawesome/free-solid-svg-icons/index";

import { login } from '../../store/actions/loginActions';

import ReactTooltip from 'react-tooltip';
import { Link } from 'react-router-dom';

import BtnLoad from './../btn_load/BtnLoad';

import './AuthPanel.css';

class AuthPanel extends Component{

    constructor(props){
        super(props);

        this.state = {
            email: '',
            password: '',
            remember: false,
            show_panel: false,
        };

        this.handleChangeFormInpitText = (e) => {
            this.setState({ [e.target.name]: e.target.value });
        };

        this.handleChangeRemember = (e) => {
            this.setState({ remember: e.target.checked });
        };

        this.handleSubmit = (e) => {
            e.preventDefault();

            // Загружаем данные формы
            let formData = new FormData(e.target);

            this.props.login(formData);

            this.setState({...this.state, password: ''});
        };

        this.toggleShowPanel = (e) => {
            e.preventDefault();
            e.stopPropagation();
            this.setState({...this.state, show_panel: !this.state.show_panel });
        };

        this.stopPropagation = (e) => {
            e.stopPropagation();
        }

    }


    render(){

        const { email, password, remember, show_panel } = this.state;
        const { loading} = this.props.login_state;

        let class_show_panel = '';
        if(!show_panel){
            class_show_panel = ' hidden';
        }

        return(
            <div className="AuthPanel-block">
                <div className="AuthPanel-control-block"><a href="#" className="link" onClick={ this.toggleShowPanel }>Войти</a></div>
                <div className={ 'AuthPanel-content' + class_show_panel } onClick={ this.toggleShowPanel }>
                    <form action={ config.path + 'api/auth/login' }
                          method="post"
                          id="loginForm"
                          onSubmit={ this.handleSubmit }
                          onClick={ this.stopPropagation }
                    >
                        <div className="panel_header mb-10">
                            Авторизация
                            <div className="modal-close" onClick={ this.toggleShowPanel }>
                                <FontAwesomeIcon icon={ faTimes }/>
                            </div>
                        </div>
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
                        <div className="enter-line mt-5">
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
                                <BtnLoad load={ loading } type="submit" title="Вход"/>
                                <ReactTooltip id="tooltipLoginBtn" effect="solid" delayShow={1000} className="tooltip-header">
                                    Connexion
                                </ReactTooltip>
                            </div>
                        </div>
                        <div className="login-registration-link-block">
                            <div className="mt-5">
                                <Link to='/lost-password' className="link">Забыли пароль?</Link>
                            </div>
                            <div className="mt-10">
                                <Link to="/registration"
                                      className="link"
                                      data-tip data-for="tooltipRegistrationLink"
                                >Регистрация</Link>
                                <ReactTooltip id="tooltipRegistrationLink" effect="solid" delayShow={1000} className="tooltip-header">
                                    S'inscrire
                                </ReactTooltip>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        user: state.userReducer,
        loader: state.loaderReducer,
        login_state: state.loginReducer,
    };
};

export default connect(mapStateToProps, { login })(AuthPanel);