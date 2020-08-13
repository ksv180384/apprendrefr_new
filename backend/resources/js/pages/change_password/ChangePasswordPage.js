import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronCircleLeft } from "@fortawesome/free-solid-svg-icons/index";

// actions
import { changePassword } from '../../store/actions/userActions';
import { getPage } from '../../store/actions/pageActions';

// components
import LoaderPage from '../../components/loader_page/LoaderPage';
import BtnLoad from "../../components/btn_load/BtnLoad";
import InputForm from "../../components/input_form/InputForm";

import '../lost_password/LostPassword.css';
import {config} from "../../config";

class ChangePasswordPage extends Component{

    constructor(){
        super();

        this.state = {
            password: '',
            password_confirmation: '',
        };

        this.handleChangeFormInputText = (e) => {
            this.setState({ [e.target.name]: e.target.value });
            e.target.parentNode.classList.remove('error');
        };

        this.changePasswordSubmit = (e) => {
            e.preventDefault();
            const form = e.target;
            // Загружаем данные формы
            const formData = new FormData(form);
            this.props.changePassword(formData, (res) => {
                if(res){
                    this.props.history.push('/');
                }
            });
        }
    }

    componentDidMount(){
        this.props.getPage('api/auth/change-password-page');
    }

    render(){

        const { load, load_page, auth } = this.props;
        const { password, password_confirmation } = this.state;

        document.title = 'Смена пароля';
        document.querySelector('meta[name="description"]').content = 'Смена пароля';
        document.querySelector('meta[name="keywords"]').content = 'Смена пароля';

        return(
            auth ? <Redirect to="/"/> :
            load_page
                ?
                <LoaderPage/>
                :
                <div className="ConfirmPassword">
                    <div className="panel-registration">
                        <div className="panel-registration-header">
                            <Link to="/" className="btn-go-home-page" title="На главную">
                                <FontAwesomeIcon icon={ faChevronCircleLeft }/>
                            </Link>
                            Смена пароля
                        </div>
                        <div className="panel-registration-content">
                            <form action={ config.path + 'api/user/change-password' + this.props.match.params.token }
                                  method="post"
                                  onSubmit={ this.changePasswordSubmit }
                            >
                                <div className="form-item">
                                    <InputForm name="password"
                                               placeholder="Пароль"
                                               type="password"
                                               value={ password }
                                               onChange={ this.handleChangeFormInputText } />
                                </div>
                                <div className="form-item">
                                    <InputForm name="password_confirmation"
                                               placeholder="Подтвердите пароль"
                                               type="password"
                                               value={ password_confirmation }
                                               onChange={ (e) => {this.handleChangeFormInputText(e)} } />
                                </div>
                                <input type="hidden" name="token" value={ this.props.match.params.token }/>
                                <div className="form-item mt-40 text-center">
                                    <BtnLoad load={ load } type="submit" title="Отправить"/>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
        );
    }
};

const mapStateToProps = (state) => {
    return {
        load: state.loaderReducer,
        load_page: state.loaderPageReducer,
        auth: state.loginReducer.login,
    }
};

export default connect(mapStateToProps, { changePassword, getPage })(ChangePasswordPage);