import React from 'react';

import './LayoutOne.css';

const LayoutOne = (props) => {



    const { children } = props;

    return(
        <div className="LayoutOne">
            { children }
        </div>
    );

}

export default LayoutOne;