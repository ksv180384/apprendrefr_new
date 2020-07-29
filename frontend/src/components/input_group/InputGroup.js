import React from 'react';

import './InputGroup.css';

const InputGroup = (props) => {

    const { vertical = 'off', type, placeholder, name, label } = props;
    let class_vertical = '';
    if(vertical === 'on'){
        class_vertical = ' vertical';
    }

    return(
        <div className={ 'input-group' + class_vertical }>
            <label>{ label }</label>
            <input type={ type }
                   placeholder={ placeholder }
                   name={ name }
                   { ...props }
            />
        </div>
    );

};

export default InputGroup;