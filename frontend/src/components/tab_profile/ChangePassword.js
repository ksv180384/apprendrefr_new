import React, { Component } from 'react';
import { connect } from 'react-redux';
import {config} from "../../config";

// components
import InputForm from '../input_form/InputForm';
import BtnLoad from '../btn_load/BtnLoad';

// actions
import { profileChangePassword } from '../../store/actions/propfileActions';

class ChangePassword extends Component{

    constructor(){
        super();

        this.state = {
            old_password: '',
            password: '',
            password_confirmation: '',
        };

        this.handleChangeFormInputText = (e) => {
            this.setState({ [e.target.name]: e.target.value });
        };

        this.changePasswordSubmit = (e) => {
            e.preventDefault();
            const form = e.target;
            // Загружаем данные формы
            const formData = new FormData(form);
            this.props.profileChangePassword(formData, (res) => {
                if(res){
                    this.setState({
                        ...this.state,
                        old_password: '',
                        password: '',
                        password_confirmation: '',
                    });
                }
            });
        };
    }


    render(){
        const { load } = this.props;
        const { old_password, password, password_confirmation } = this.state;

        return(
            <div className="up-change-password">
                <div className="header-dashed mb-10">Сменить пароль</div>

                <div className="up-change-password-form-block">
                    <form action={ config.path + 'api/user/change-password' }
                          method="post"
                          onSubmit={ this.changePasswordSubmit }
                    >
                        <div className="form-item">
                            <InputForm name="old_password"
                                       placeholder="Пароль"
                                       type="password"
                                       value={ old_password }
                                       onChange={ this.handleChangeFormInputText }
                            />
                        </div>
                        <div className="form-item">
                            <InputForm name="password"
                                       placeholder="Новый пароль"
                                       type="password"
                                       value={ password }
                                       onChange={ this.handleChangeFormInputText }
                            />
                        </div>
                        <div className="form-item">
                            <InputForm name="password_confirmation"
                                       placeholder="Подтвердите новый пароль"
                                       type="password"
                                       value={ password_confirmation }
                                       onChange={ this.handleChangeFormInputText }
                            />
                        </div>
                        <div className="form-item mt-40 text-center">
                            <BtnLoad load={ load } type="submit" title="Отправить"/>
                        </div>
                    </form>
                </div>
            </div>
        );
    }
};

const mapStateToProps = (state) => {
    return {
        load: state.loaderReducer,
    }
};

export default connect(mapStateToProps, { profileChangePassword })(ChangePassword);