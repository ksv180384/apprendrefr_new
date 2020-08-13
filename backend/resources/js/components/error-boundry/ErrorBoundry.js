import React, { Component } from 'react';
import { connect } from 'react-redux';

import ErrorIndicator from '../error-indicator/ErrorIndicator'

import './ErrorBoundry.css';

class ErrorBoundry extends Component{

    constructor(props){
        super(props);

        this.state = {
            hasError: false,
        };
    }

    // Перехватывает ошибки при отрисовке эелемнтов
    componentDidCatch(){
        this.setState({
            hasError: true,
        });
    }

    render(){

        const { hasError } = this.state;
        const { error } = this.props;

        if(error){
            return(<ErrorIndicator/>);
        }
        if(hasError){
            alert('Произошла какая то хрень');
            return(<React.Fragment></React.Fragment>);
        }

        return this.props.children;
    }
}

const mapStateToProps = (state) => {
    return {
        error: state.errorReducer.error,
    };
};

export default connect(mapStateToProps, {  })(ErrorBoundry);