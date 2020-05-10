import React, { Component } from 'react';
import './Right.css';


import store from "../../../store";
import AuthPanel from "../../../components/auth_panel/AuthPanel";
import UserPanel from "../../../components/user_panel/UserPanel";
import Statistics from "../../../components/statistics/Statistics";
import OnlineList from "../../../components/online_list/OnlineList";

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