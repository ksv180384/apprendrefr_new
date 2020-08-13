import { FORUM_QUOTE_ADD, FORUM_QUOTS_REMOVE } from './index';
import store from '../index';

export const addQuote = (quote) => {
    const q = store.getState().quotesReducer.quotes;
    for (let k in q){
        if(q[k].id === quote.id){
            return { type: false };
        }
    }
    return { type: FORUM_QUOTE_ADD, payload: quote };
};

export const removeQuotes = () => {
    return { type: FORUM_QUOTS_REMOVE };
};