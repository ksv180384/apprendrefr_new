import React, { Component } from 'react';
import { connect } from 'react-redux';

import axios from 'axios';
import BtnLoad from "../../components/btn_load/BtnLoad";
import { Link } from 'react-router-dom';
import LoaderPage from "../../components/loader_page/LoaderPage";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import InputForm from "../../components/input_form/InputForm";

import { setLoader } from '../../store/actions/loaderActions';
import { setLoaderPage } from '../../store/actions/loaderPageActions';
import store from "../../store";
import { config } from '../../config';

import './LostPassword.css';
import {faChevronCircleLeft} from "@fortawesome/free-solid-svg-icons/index";

class LostPassword extends Component{
    constructor(){
        super();

        this.state = {
            confirm_email: '',
        };

        this.handleChangeFormInputText = (e) => {
            this.setState({ [e.target.name]: e.target.value });
        };

    }

    componentDidMount(){
        this.props.setLoaderPage(false);

        this.confirmPasswordSubmit = (e) => {
            e.preventDefault();

            //*
            const url = event.target.attributes.getNamedItem('action').value;

            store.dispatch(setLoader(true));
            axios.post(url, {
                confirm_email: this.state.confirm_email
            })
                .then((response) => {
                    store.dispatch(setLoader(false));
                })
                .catch((error) => {
                    store.dispatch(setLoader(false));
                });
            //*/

        };
    }

    render(){

        const { confirm_email } = this.state;
        const { load, load_page, meta_data } = this.props;

        document.title = meta_data.title;
        document.querySelector('meta[name="description"]').content = meta_data.description;
        document.querySelector('meta[name="keywords"]').content = meta_data.keywords;

        return(
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
                        <form action={ config.path + '/api/auth/lost_password' }
                              method="post"
                              onSubmit={ (e) => this.confirmPasswordSubmit(e) }
                        >
                            <div className="form-item">
                                <InputForm name="confirm_email"
                                           type="email"
                                           placeholder="Email"
                                           onChange={ this.handleChangeFormInputText }
                                           defaultValue={ confirm_email }/>
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
    }
};

export default connect(mapStateToProps, { setLoader, setLoaderPage })(LostPassword);