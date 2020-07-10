import React from 'react';
import { connect } from 'react-redux';

import { store as storeNotification } from 'react-notifications-component';


const ErrorNotification = (props) => {

    const { error } = props;

    if(error.is_error){
        storeNotification.addNotification({
            title: 'Ошибка',
            message: error.error_text,
            type: "danger",
            insert: "top",
            container: "top-right",
            animationIn: ["animated", "fadeIn"],
            animationOut: ["animated", "fadeOut"],
            dismiss: {
                duration: 10000,
                showIcon: true,
                onScreen: true
            }
        });
    }

    return (<React.Fragment></React.Fragment>);

};

const mapStateToProps = (state) => {
    return {
        error: state.errorNotificationReducer,
    };
};

export default connect(mapStateToProps, { })(ErrorNotification);