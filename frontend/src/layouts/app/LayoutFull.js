import React from 'react';

import './LayoutFull.css';

const LayoutFull = (props) => {



    const { children } = props;

    return(
        <div className="LayoutFull">
            { children }
        </div>
    );

}

export default LayoutFull;