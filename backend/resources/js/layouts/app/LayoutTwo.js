import React from 'react';

import './LayoutTwo.css';

const LayoutTwo = (props) => {

    const { children } = props;

    return(
        <div className="LayoutTwo">
            { children }
        </div>
    );
}

export default LayoutTwo;