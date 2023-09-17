import React from 'react';
import Header from '@/components/header/Header.jsx';

import '@/layouts/LayoutTwo.css';

function LayoutTwo({ children }) {
    return (
        <>
            <Header/>
            <h1>LayoutTwo</h1>
            <div>
                {children}
            </div>
        </>

    )
}

export default LayoutTwo;
