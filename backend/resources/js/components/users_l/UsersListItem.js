import React from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { } from "@fortawesome/free-brands-svg-icons/index";



const UsesListItem = (props) => {

    const { user } = props;

    return(
        user
            ?
            <div className="users-list-item" title={ user.login }>
                <div className="users-list-item-left">
                    <div className="users-list-item-avatar" style={ {backgroundImage: 'url('+ user.avatar +')'} }>

                    </div>
                </div>
                <div className="users-list-item-right">
                    <Link className="link" to={ '/user/info/' + user.id }>{ user.login }</Link>
                    <small className="mt-5">
                        { user.rang_title }
                    </small>
                    <small>
                        Сообщений: { user.user_posts }
                    </small>
                </div>
            </div>
            :
            <div>пусто</div>
    );
};

export default UsesListItem;