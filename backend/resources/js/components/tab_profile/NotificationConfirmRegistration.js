import React from 'react';
import { connect } from 'react-redux';

// actions
import { sendConfirmEmail } from '../../store/actions/propfileActions';

// components
import BtnLoad from '../btn_load/BtnLoad';

const NotificationConfirmRegistration = (props) => {

    const sendConfirmEmail = () => {
        //console.log('sendConfirmEmail');
        props.sendConfirmEmail();
    };

    const { loading } = props;

    return(
        <div className="NotificationConfirmRegistration-block">
            <h4>Подтвердите регистрацию</h4>
            Ваша учетная запись не активирована. Для активации пройдите по ссылке в письме отправленном вам
            при регистрации на сайте. Если по каким то причинам вы не получили письмо, нажмите кнопку "отправить email повторно".
            Пока ваша учетная запись не активирована вы можете изменить только email.
            <div className="mt-20 mb-10">
                <BtnLoad load={ loading } type="button" title="Отправить email повторно" onClick={ sendConfirmEmail }/>
            </div>
        </div>
    );
};

const mapStateToProps  = (state) => {
    return {
        loading: state.loaderReducer
    }
};

export default connect( mapStateToProps, { sendConfirmEmail })(NotificationConfirmRegistration);