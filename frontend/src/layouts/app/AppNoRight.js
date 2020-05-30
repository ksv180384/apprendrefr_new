import React, { Component } from 'react';
import './AppNoRight.css';
import Left from "./left/Left";
import UserProfileEdit from "../../components/user_profile_edit/UserProfileEdit";

class AppNoRight extends Component{

    render(){

        return(
            <div className="AppNoRight">
                <div className="AppNoRight-left-block">
                    <Left/>
                </div>
                <div className="AppNoRight-center-block">
                    <UserProfileEdit/>
                </div>
            </div>
        );
    }
}

export default AppNoRight;