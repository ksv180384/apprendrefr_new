import { STATISTIC_SET_DATA } from './index';

export const setStatistic = (data) => {
    return {
        type: STATISTIC_SET_DATA,
        payload: data,
    }
};