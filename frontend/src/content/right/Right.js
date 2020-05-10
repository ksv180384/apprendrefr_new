import React, { Component } from 'react';
import './Right.css';

import AuthPanel from './auth_panel/AuthPanel';
import UserPanel from './user_panel/UserPanel';
import Statistics from './statistics/Statistics';
import OnlineList from './online_list/OnlineList';
import store from "../../store";

class Right extends Component{

    render(){

        const { auth } = store.getState().page_data;

        let user_panel = <AuthPanel/>;
        if(auth){
            user_panel = <UserPanel/>;
        }

        return(
            <div className="Right-block">
                { user_panel }
                <Statistics/>
                <OnlineList/>
            </div>
        );
    }
}

export default Right;