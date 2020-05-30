import React,  { Component } from 'react';
import { connect } from 'react-redux';

import App from "../../layouts/app/App";

import './Index.css';
import { getPage } from '../../store/actions/pageActions';

class Index extends Component {

    componentDidMount(){
        this.props.getPage('api/index');
    }

    render(){

        const page = this.props.page;

        return(
            <App/>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        page: state.pageReducer.page,
    };
};

export default connect(mapStateToProps, { getPage })(Index);