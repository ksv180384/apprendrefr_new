import React, { Component } from 'react';
import { connect } from 'react-redux';

import AuthPanel from "../../../components/auth_panel/AuthPanel";
import UserPanel from "../../../components/user_panel/UserPanel";
import Statistics from "../../../components/statistics/Statistics";
import OnlineList from "../../../components/online_list/OnlineList";

import './Right.css';
//import store from "../../../store";

class Right extends Component{

    constructor(props){
        super(props);

        this.renderUserPanel = (login) => {
            let user_panel = <AuthPanel/>;
            if(login){
                user_panel = <UserPanel/>;
            }
            return user_panel;
        }
    }

    render(){

        const { login } = this.props.login_state;

        return(
            <div className="Right-block">
                { this.renderUserPanel(login) }
                <Statistics/>
                <OnlineList/>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        login_state: state.loginReducer,
    }
};

export default connect(mapStateToProps, {  })(Right);