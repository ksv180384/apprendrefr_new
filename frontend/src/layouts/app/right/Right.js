import React, { Component } from 'react';
import { connect } from 'react-redux';
import store from '../../../store';
import { checkAuth } from '../../../store/actions/authActions';

//import index from "../../../store/store";
import AuthPanel from "../../../components/auth_panel/AuthPanel";
import UserPanel from "../../../components/user_panel/UserPanel";
import Statistics from "../../../components/statistics/Statistics";
import OnlineList from "../../../components/online_list/OnlineList";

import './Right.css';

class Right extends Component{

    constructor(props){
        super(props);

        this.state = {
            auth: this.props.checkAuth(),
        };


        store.subscribe(() => {
            this.setState({
                auth: store.getState().authReducer
            });
        });

        this.renderUserPanel = (auth) => {
            let user_panel = <AuthPanel/>;
            if(auth){
                user_panel = <UserPanel/>;
            }
            return user_panel;
        }
    }

    render(){

        const { auth } = this.state;

        return(
            <div className="Right-block">
                { this.renderUserPanel(auth) }
                <Statistics/>
                <OnlineList/>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        auth: state.authReducer
    }
};

export default connect(mapStateToProps, { checkAuth })(Right);