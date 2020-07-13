import React , { Component } from 'react';
import { Redirect } from 'react-router-dom';
import BtnLoad from "../../components/btn_load/BtnLoad";
import InputForm from '../../components/input_form/InputForm';
import { Link } from 'react-router-dom';
import LoaderPage from "../../components/loader_page/LoaderPage";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronCircleLeft } from '@fortawesome/free-solid-svg-icons';

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
        };

        this.handleChangeFormInpitText = (e) => {
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
            let formData = new FormData(document.querySelector('#formRegistration'));

            this.props.registrationUser(formData);
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
            checkbox_personal_data_protection_policy
        } = this.state;
        const { load_page, meta_data } = this.props;
        const { loading, registration } = this.props.registration_state;
        if(registration){
            this.props.registrationResetData();
        }


        document.title = meta_data.title;
        document.querySelector('meta[name="description"]').content = meta_data.description;
        document.querySelector('meta[name="keywords"]').content = meta_data.keywords;

        return  (
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
                                               onChange={ this.handleChangeFormInpitText } />
                                </div>
                                <div className="form-item">
                                    <InputForm name="login" placeholder="Имя/логин" type="text" value={ login }
                                               onChange={ this.handleChangeFormInpitText } />
                                </div>
                                <div className="form-item">
                                    <InputForm name="password" placeholder="Пароль" type="password" value={ password }
                                               onChange={ this.handleChangeFormInpitText } />
                                </div>
                                <div className="form-item">
                                    <InputForm name="password_confirmation" placeholder="Подтвердите пароль" type="password"
                                               value={ password_confirmation } onChange={ this.handleChangeFormInpitText } />
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
                                        Подтверждаю, что ознакомился и принимаю <a href="#" className="link">правила
                                        пользовательского соглашения</a> и <a href="#" className="link"> Политику по защите
                                        персональных данных</a>.
                                    </label>
                                </div>
                                <div className="form-item mt-40 text-center">
                                    <BtnLoad load={ loading } type="submit" title="Зарегистрироваться"/>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        load_page: state.loaderPageReducer,
        load: state.loaderReducer,
        page: state.pageReducer,
        registration_state: state.registrationReducer,
        meta_data: state.metaReducer,
    }
};

export default connect(mapStateToProps, { getPage, registrationUser, registrationResetData })(Registration);