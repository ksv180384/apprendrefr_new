import React , { Component } from 'react';
import './Registration.css';
import BtnLoad from "../../components/btn_load/BtnLoad";

import Axios from 'axios';
Axios.defaults.headers.common = {
    'Authorization':localStorage.getItem('user-token'),
};

import { loadPage } from './../../actions';
import store from "./../../store";

class Registration extends Component{

    constructor(){
        super();

        this.state = {
            email: '',
            login: '',
            password: '',
            password_confirmation: ''
        };

        this.handleChangeFormInpitText = (e) => {
            //console.log(e.target.name);
            //console.log(e.target.value);
            this.setState({ [e.target.name]: e.target.value });
        };

        this.registrationSubmit = (e) => {
            e.preventDefault();

            const url = event.target.attributes.getNamedItem('action').value;

            store.dispatch(loadPage({ load: true }));
            Axios.post(url, {
                email: this.state.email,
                login: this.state.login,
                password: this.state.password,
                password_confirmation: this.state.password_confirmation
            })
                .then((response) => {
                    console.log(response.data.user_data);
                    this.setState({
                        password: '',
                        password_confirmation: '',
                    });
                    store.dispatch(loadPage({ load: false }));
                })
                .catch((error) => {
                    store.dispatch(loadPage({ load: false }));
                    this.setState({
                        password: '',
                        password_confirmation: '',
                    });
                });

        }

    }

    render(){

        const { api_path, load } = store.getState();
        const { email, login, password, password_confirmation } = this.state;

        return(
            <div className="Registration">
                <div className="panel-registration">
                    <div className="panel-registration-header">
                        Регистрация
                    </div>
                    <div className="panel-registration-content">
                        <form action={ api_path + '/api/auth/registration' }
                              method="post"
                              onSubmit={ this.registrationSubmit }
                        >
                            <div className="form-item">
                                <label htmlFor="emailRegistration">email</label>
                                <input type="email" name="email" id="emailRegistration"
                                       placeholder="email" onChange={ this.handleChangeFormInpitText }
                                       value={ email } required/>
                            </div>
                            <div className="form-item">
                                <label htmlFor="emailRegistration">Имя/логин</label>
                                <input type="text" name="login" id="loginlRegistration"
                                       placeholder="Имя/логин" onChange={ this.handleChangeFormInpitText }
                                       value={ login } required/>
                            </div>
                            <div className="form-item">
                                <label htmlFor="passwordRegistration">Пароль</label>
                                <input type="password" name="password" id="passwordRegistration"
                                       placeholder="пароль" onChange={ this.handleChangeFormInpitText }
                                       value={ password } required/>
                            </div>
                            <div className="form-item">
                                <label htmlFor="passwordConfirmRegistration">Подтвердите пароль</label>
                                <input type="password" name="password_confirmation"
                                       id="passwordConfirmRegistration" onChange={ this.handleChangeFormInpitText } placeholder="подтвердите пароль"
                                       value={ password_confirmation } required
                                />
                            </div>
                            <div className="form-item mt-30">
                                <BtnLoad load={ load } type="submit" title="Зарегистрироваться"/>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        );
    }
}

export default Registration;