import React,  { Component } from 'react';
import './Registration.css';

import index from '../../../store/store';
import { modalRegistration } from '../../../store/actions';

import BtnLoad from "../../btn_load/BtnLoad";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';

class Registration extends Component{

    constructor(props){
        super(props);

        this.modalToggle = (e) =>{
            e.stopPropagation();
            index.dispatch(modalRegistration({ modal_registration: !index.getState().modal_registration }));
        };

    }

    render(){

        const { modal_registration } = index.getState();


        let classModalState = '';
        if(modal_registration) {
            classModalState = ' show';
        }


        return(
            <div className={'ModalWindow-block' + classModalState}>
                <div
                    className="bg-modal"
                    onClick={ this.modalToggle }
                >
                </div>
                <div className="modal-block">
                    <div className="modal-header">
                        Регистрация
                        <div className="modal-close" onClick={ this.modalToggle }>
                            <FontAwesomeIcon icon={ faTimes }/>
                        </div>
                    </div>
                    <div className="modal-content">
                        <div>
                            <div>
                                <label htmlFor="emailRegistration">email</label>
                                <input type="text" name="email" id="emailRegistration" placeholder="email"/>
                            </div>
                            <div>
                                <label htmlFor="passwordRegistration">email</label>
                                <input type="password" name="password" id="passwordRegistration" placeholder="пароль"/>
                            </div>
                            <div>
                                <label htmlFor="passwordConfirmRegistration">email</label>
                                <input type="password" name="password_confirm" id="passwordConfirmRegistration" placeholder="подтвердите пароль"/>
                            </div>
                            <BtnLoad load={false} type="submit" title="Зарегистрироваться"/>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default Registration;