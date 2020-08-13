import React from 'react';

// components
import Statistics from '../../components/statistics/Statistics';
import OnlineList from "../../components/online_list/OnlineList";

import './StatisticBlock.css';

const StatisticBlock = (props) => {

    return(
        <div className="StatisticBlock">
            <div className="StatisticBlock-content">
                <div className="StatisticBlock-online-list">
                    <OnlineList/>
                </div>
                <div className="StatisticBlock-statistic">
                    <Statistics/>
                </div>
            </div>
        </div>
    );
};

export default StatisticBlock;