import React, { Component } from 'react';
import { connect } from 'react-redux';

import AuthPanel from "../auth_panel/AuthPanel";
import UserPanel from "../user_panel/UserPanel";

class Authentification extends Component{

    render() {

        const { login } = this.props.login_state;

        return (
            <React.Fragment>
                { login ? <UserPanel/> : <AuthPanel/> }
            </React.Fragment>
        );
    }

}
const mapStateToProps = (state) => {
    return {
        login_state: state.loginReducer,
    }
};

export default connect(mapStateToProps, {  })(Authentification);