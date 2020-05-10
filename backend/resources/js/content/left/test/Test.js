import React, { Component } from 'react';
import './Test.css';

import TestYourself from './test_yourself/TestYourself';
import LearningWrite from './learning_write/LearningWrite';

class Test extends Component{

    render() {

        return (
            <div className="Test-left-block">
                <LearningWrite/>
                <TestYourself/>
            </div>
        );
    }

}

export default Test;