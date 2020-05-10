import React, { Component } from 'react';
import './ErrorBoundry.css';

import ErrorIndicator from '../error-indicator/ErrorIndicator'

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
        if(hasError){
            return(<ErrorIndicator/>);
        }

        return this.props.children;
    }
}

export default ErrorBoundry;