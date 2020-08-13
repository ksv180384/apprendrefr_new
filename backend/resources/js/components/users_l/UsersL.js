import React, { Component } from 'react';
import { connect } from 'react-redux';

// actions
import { loadUsersPaginate } from '../../store/actions/usersListActions';

// components
import UsersListItem from './UsersListItem';
import Paginate from '../paginate/Paginate';

class UsersL extends Component{

    constructor(){
        super();

        this.loadUsers = (path, params) => {
            this.props.loadUsersPaginate(path, params);
        };
    }


    render(){
        const { users, paginate } = this.props;

        return(
            users
                ?
                <React.Fragment>
                    <div className="panel p-0">
                        <div className="panel_header">
                            Пользователи
                        </div>
                        <Paginate current_page={ paginate.current_page }
                                  last_page={ paginate.last_page }
                                  per_page={ paginate.per_page }
                                  to={ paginate.to }
                                  total={ paginate.total }
                                  path={ '/users-list' }
                                  paginate_path={ '/user/list/paginate' }
                                  loadPaginate={ this.loadUsers }

                        />
                        <div className="panel_content">
                            <div className="user-list-block">
                                {
                                    Object.keys(users).map((key) => {
                                        return <UsersListItem key={users[key].id} user={ users[key] } />
                                    })
                                }
                            </div>
                        </div>
                        <Paginate current_page={ paginate.current_page }
                                  last_page={ paginate.last_page }
                                  per_page={ paginate.per_page }
                                  to={ paginate.to }
                                  total={ paginate.total }
                                  path={ '/users-list' }
                                  paginate_path={ '/user/list/paginate' }
                                  loadPaginate={ this.loadUsers }

                        />
                    </div>
                </React.Fragment>
                :
                <div>пусто</div>
        );
    }
};

const mapStateToProps = (state) => {
    return {
        users: state.usersListReducer.users,
        paginate: state.usersListReducer.paginate,
    }
};

export default connect(mapStateToProps, { loadUsersPaginate })(UsersL);