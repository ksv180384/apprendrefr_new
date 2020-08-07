import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link, Redirect } from 'react-router-dom';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronCircleLeft } from "@fortawesome/free-solid-svg-icons/index";

// actions
import { confirmEmail } from '../../store/actions/userActions';

// components
import LoaderPage from '../../components/loader_page/LoaderPage';

import '../lost_password/LostPassword.css';

class ConfirmEmail extends Component{

    constructor(){
        super();
    }

    componentDidMount(){
        this.props.confirmEmail(this.props.match.params.token);
    }

    render(){
        const { meta_data, loader_page, page_data, auth } = this.props;

        document.title = meta_data.title;
        document.querySelector('meta[name="description"]').content = meta_data.description;
        document.querySelector('meta[name="keywords"]').content = meta_data.keywords;

        return(
            auth ? <Redirect to="/"/> :
            loader_page
                ?
                    <LoaderPage/>
                :
                    <div className="ConfirmPassword">
                        <div className="panel-registration">
                            <div className="panel-registration-header">
                                <Link to="/" className="btn-go-home-page" title="На главную">
                                    <FontAwesomeIcon icon={ faChevronCircleLeft }/>
                                </Link>
                                Подтверждение email
                            </div>
                            <div className="panel-registration-content">

                                <div className="p-10 mt-10 mb-10 text-color">{ page_data }</div>
                                <div className="text-center">
                                    <Link to={ '/' } className="link">На главную</Link>
                                </div>

                            </div>
                        </div>
                    </div>
        );
    }
};

const mapStateToProps = (state) => {
    return {
        loader_page: state.loaderPageReducer,
        meta_data: state.metaReducer,
        page_data: state.pageDataReducer,
        auth: state.loginReducer.login,
    }
};

export default connect(mapStateToProps, { confirmEmail })(ConfirmEmail);