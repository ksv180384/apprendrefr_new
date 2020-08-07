import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';

import BtnLoad from "../../components/btn_load/BtnLoad";
import { Link } from 'react-router-dom';
import LoaderPage from "../../components/loader_page/LoaderPage";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import InputForm from "../../components/input_form/InputForm";

import { getPage } from '../../store/actions/pageActions';
import { lostPassword } from '../../store/actions/userActions';
import { config } from '../../config';

import './LostPassword.css';
import {faChevronCircleLeft} from "@fortawesome/free-solid-svg-icons/index";

class LostPassword extends Component{
    constructor(){
        super();

        this.state = {
            email: '',
        };

        this.handleChangeFormInputText = (e) => {
            this.setState({ [e.target.name]: e.target.value });
        };

        this.confirmPasswordSubmit = (e) => {
            e.preventDefault();

            this.props.lostPassword(this.state.email, (res) => {
                if(res){
                    this.props.history.push('/');
                }
            });

        };

    }

    componentDidMount(){
        this.props.getPage('api/auth/lost-password-page');
    }

    render(){

        const { email } = this.state;
        const { load, load_page, meta_data, auth } = this.props;

        document.title = meta_data.title;
        document.querySelector('meta[name="description"]').content = meta_data.description;
        document.querySelector('meta[name="keywords"]').content = meta_data.keywords;

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
                            <FontAwesomeIcon icon={faChevronCircleLeft}/>
                        </Link>
                        Восстановление пароля
                    </div>
                    <div className="panel-registration-content">
                        <form action={ config.path + 'api/auth/lost-password' }
                              method="post"
                              onSubmit={ (e) => this.confirmPasswordSubmit(e) }
                        >
                            <div className="form-item">
                                <InputForm name="email"
                                           type="email"
                                           placeholder="Email"
                                           onChange={ this.handleChangeFormInputText }
                                           defaultValue={ email }/>
                            </div>
                            <div className="form-item text-center mt-40">
                                <BtnLoad load={ load } type="submit" title="Отправить"/>
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
        load: state.loaderReducer,
        load_page: state.loaderPageReducer,
        meta_data: state.metaReducer,
        auth: state.loginReducer.login,
    }
};

export default connect(mapStateToProps, { getPage, lostPassword })(LostPassword);