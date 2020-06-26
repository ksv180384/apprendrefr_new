import React, { Component } from 'react';
import './InputForm.css';

class InputForm extends Component{

    render(){

        const { type, name, placeholder, value, required = true, className = '', onChange } = this.props;

        return(
            <div className={ 'Input-Form ' + className }>
                <input type={ type }
                       name={ name }
                       value={ value }
                       onChange={ onChange }
                       required={ required }
                />
                <span data-placeholder={ placeholder }></span>
            </div>
        );
    }
}

export default InputForm;