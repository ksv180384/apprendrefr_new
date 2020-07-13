import React, { Component } from 'react';
import { connect } from 'react-redux';
import { config } from '../../config';


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

    }


    render(){

        const { email, password, remember } = this.state;
        const { loading} = this.props.login_state;

        return(
            <div className="AuthPanel-block">
                <div className="panel">
                    <div className="panel_header">
                        Панель авторизации
                    </div>
                    <div className="panel_content">
                        <form action={ config.path + 'api/auth/login' }
                              method="post"
                              id="loginForm"
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
                                <BtnLoad load={ loading } type="submit" title="Вход"/>
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
        login_state: state.loginReducer,
    };
};

export default connect(mapStateToProps, { login })(AuthPanel);