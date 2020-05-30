import React, { Component } from 'react';
import './LostPassword.css';

import Axios from 'axios';
import BtnLoad from "../../components/btn_load/BtnLoad";

import { loadPage } from '../../store/actions';
//import index from "../../store/store";

class LostPassword extends Component{
    constructor(){
        super();

        this.state = {
            confirm_email: ''
        };

        this.handleChangeFormInputText = (e) => {
            this.setState({ [e.target.name]: e.target.value });
        };

        this.confirmPasswordSubmit = (e) => {
            e.preventDefault();

            /*
            const url = event.target.attributes.getNamedItem('action').value;

            index.dispatch(loadPage({ load: true }));
            Axios.post(url, {
                confirm_email: this.state.confirm_email
            })
                .then((response) => {
                    index.dispatch(loadPage({ load: false }));
                })
                .catch((error) => {
                    index.dispatch(loadPage({ load: false }));
                });
                */

        }

    }

    render(){

        const { confirm_email } = this.state;
        //const { api_path, load } = index.getState();
        const api_path = {};
        const load = {};

        return(
            <div className="ConfirmPassword">
                <div className="panel-registration">
                    <div className="panel-registration-header">
                        Восстановление пароля
                    </div>
                    <div className="panel-registration-content">
                        <form action={ api_path + '/api/auth/lost_password' }
                              method="post"
                              onSubmit={ this.confirmPasswordSubmit }
                        >
                            <div className="form-item">
                                <label htmlFor="confirmEmail">email</label>
                                <input type="email" name="confirm_email" id="confirmEmail"
                                       placeholder="email" onChange={ this.handleChangeFormInputText }
                                       value={ confirm_email } required/>
                            </div>
                            <div className="form-item mt-30">
                                <BtnLoad load={ load } type="submit" title="Отправить"/>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        );
    }
}

export default LostPassword;