import React , { Component } from 'react';
import { Redirect } from 'react-router-dom';
import BtnLoad from "../../components/btn_load/BtnLoad";
import InputForm from '../../components/input_form/InputForm';
import { Link } from 'react-router-dom';
import LoaderPage from "../../components/loader_page/LoaderPage";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronCircleLeft, faTimes } from '@fortawesome/free-solid-svg-icons';

import { config } from '../../config';

import { connect } from 'react-redux';
import { registrationUser, registrationResetData } from "../../store/actions/registrationActions";
import { getPage } from "../../store/actions/pageActions";

import './Registration.css';

class Registration extends Component{

    constructor(props){
        super(props);

        this.state = {
            email: '',
            login: '',
            password: '',
            password_confirmation: '',
            checkbox_personal_data_protection_policy: false,
            show_privacy_policy: false,
            show_terms_user: false,
        };

        this.handleChangeFormInputText = (e) => {
            this.setState({ [e.target.name]: e.target.value });
            e.target.parentNode.classList.remove('error');
        };

        this.handleChangeCheckbox = (e) =>{
            this.setState({ checkbox_personal_data_protection_policy: e.target.checked });
            e.target.parentNode.nextSibling.classList.remove('error');
        };

        this.registrationSubmit = (e) => {
            e.preventDefault();

            if(!document.getElementById('labelPersonalDataProtectionPolicy').checked){
                document.querySelector('.label-personal-data-protection-policy').classList.add('error');
                return true;
            }

            // Загружаем данные формы
            //let formData = new FormData(document.querySelector('#formRegistration'));
            let formData = new FormData(e.target);

            this.props.registrationUser(formData);
        };

        this.toggleInfoTermsUser = (e) => {
            e.preventDefault();
            this.setState({ ...this.state, show_terms_user: !this.state.show_terms_user });
        };

        this.toggleInfoPrivacyPolicy = (e) => {
            e.preventDefault();
            this.setState({ ...this.state, show_privacy_policy: !this.state.show_privacy_policy });
        };
    }

    componentDidMount(){
        this.props.getPage('api/auth/register-page');
    }

    render(){

        const {
            email,
            login,
            password,
            password_confirmation,
            checkbox_personal_data_protection_policy,
            show_privacy_policy,
            show_terms_user
        } = this.state;
        const { load_page, meta_data, auth, page_data } = this.props;
        const { loading, registration } = this.props.registration_state;
        if(registration){
            this.props.registrationResetData();
        }

        let class_show_info_privacy_policy = '';
        let class_show_info_show_terms_user = '';
        if(show_privacy_policy){
            class_show_info_privacy_policy = ' show';
        }
        if(show_terms_user){
            class_show_info_show_terms_user = ' show';
        }


        document.title = meta_data.title;
        document.querySelector('meta[name="description"]').content = meta_data.description;
        document.querySelector('meta[name="keywords"]').content = meta_data.keywords;

        return  (
            auth ? <Redirect to="/" /> :
                registration
                    ?
                    <Redirect to="/" />
                    :
                    load_page
                        ?
                     <LoaderPage/>
                        :
                    <div className="Registration">
                        <div className="panel-registration">
                            <div className="panel-registration-header">
                                <Link to="/" className="btn-go-home-page" title="На главную">
                                    <FontAwesomeIcon icon={faChevronCircleLeft}/>
                                </Link>
                                Регистрация
                            </div>
                            <div className="panel-registration-content">
                                <form id="formRegistration"
                                      action={ config.path + 'api/auth/registration' }
                                      method="post"
                                      onSubmit={ (e) => this.registrationSubmit(e) }
                                >

                                    <div className="form-item">
                                        <InputForm name="email" placeholder="Email" type="text" value={ email }
                                                   onChange={ this.handleChangeFormInputText } />
                                    </div>
                                    <div className="form-item">
                                        <InputForm name="login" placeholder="Имя/логин" type="text" value={ login }
                                                   onChange={ this.handleChangeFormInputText } />
                                    </div>
                                    <div className="form-item">
                                        <InputForm name="password" placeholder="Пароль" type="password" value={ password }
                                                   onChange={ this.handleChangeFormInputText } />
                                    </div>
                                    <div className="form-item">
                                        <InputForm name="password_confirmation" placeholder="Подтвердите пароль" type="password"
                                                   value={ password_confirmation } onChange={ this.handleChangeFormInputText } />
                                    </div>
                                    <div>
                                        <div className="checkbox-apr">
                                            <input id="labelPersonalDataProtectionPolicy"
                                                   type="checkbox"
                                                   name="remember"
                                                   checked={ checkbox_personal_data_protection_policy }
                                                   onChange={ this.handleChangeCheckbox }
                                            />
                                            <span></span>
                                        </div>
                                        <label className="label-personal-data-protection-policy" htmlFor="labelPersonalDataProtectionPolicy">
                                            Подтверждаю, что ознакомился и принимаю <a href="#" onClick={ this.toggleInfoTermsUser } className="link">правила
                                            пользовательского соглашения</a> и <a href="#" onClick={ this.toggleInfoPrivacyPolicy } className="link">Политику по защите
                                            персональных данных</a>.
                                        </label>
                                    </div>
                                    <div className="form-item mt-40 text-center">
                                        <BtnLoad load={ loading } type="submit" title="Зарегистрироваться"/>
                                    </div>
                                </form>
                            </div>
                        </div>
                        <div className={ 'info-terms-user-block' + class_show_info_privacy_policy }>
                            <div className="panel_header">
                                Политика по защите персональных данных
                                <div className="modal-close" onClick={ this.toggleInfoPrivacyPolicy }><FontAwesomeIcon icon={ faTimes }/></div>
                            </div>
                            <div className="content" dangerouslySetInnerHTML={{__html: page_data.privacy_policy }}/>
                        </div>
                        <div className={ 'info-terms-user-block' + class_show_info_show_terms_user }>
                            <div className="panel_header">
                                Правила пользовательского соглашения
                                <div className="modal-close" onClick={ this.toggleInfoTermsUser }><FontAwesomeIcon icon={ faTimes }/></div>
                            </div>
                            <div className="content" dangerouslySetInnerHTML={{__html: page_data.terms_user }}/>
                        </div>
                    </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        load_page: state.loaderPageReducer,
        load: state.loaderReducer,
        page_data: state.pageReducer,
        registration_state: state.registrationReducer,
        meta_data: state.metaReducer,
        auth: state.loginReducer.login,
    }
};

export default connect(mapStateToProps, { getPage, registrationUser, registrationResetData })(Registration);