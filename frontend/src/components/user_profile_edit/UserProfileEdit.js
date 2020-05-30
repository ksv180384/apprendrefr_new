import React, { Component } from 'react';
import './UserProfileEdit.css';

import TabProfile from '../tab_profile/TabProfile';
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
                                <TabNavItem>Изменить пароль</TabNavItem>
                            </TabBarNav>
                            <TabItem>
                                <TabProfile/>
                            </TabItem>
                            <TabItem>3333</TabItem>
                        </TabBar>

                    </div>
                </div>
            </div>
        );
    }
}

export default UserProfileEdit