import React, { Component } from 'react';
import './UserProfileEdit.css';

// components
import TabProfile from '../tab_profile/TabProfile';
import ChangePassword from '../tab_profile/ChangePassword';
import { TabBar, TabBarNav, TabNavItem, TabItem } from "../tab_bar";


class UserProfileEdit extends Component{

    render(){

        return(
            <div className="UserProfileEdit">
                <div className="panel">
                    <div className="panel_content p-2">

                        <TabBar>
                            <TabBarNav>
                                <TabNavItem active={ true }>Профиль</TabNavItem>
                                <TabNavItem>Сменить пароль</TabNavItem>
                            </TabBarNav>
                            <TabItem>
                                <TabProfile/>
                            </TabItem>
                            <TabItem>
                                <ChangePassword/>
                            </TabItem>
                        </TabBar>

                    </div>
                </div>
            </div>
        );
    }
}

export default UserProfileEdit