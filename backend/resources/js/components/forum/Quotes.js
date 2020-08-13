import React from 'react';
import { connect } from 'react-redux';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCommentDots, faTimes } from '@fortawesome/free-solid-svg-icons';

// actions
import { removeQuotes } from '../../store/actions/quotesActions';

const Quotes = (props) => {

    //console.log(props);
    const { quotes } = props;
    let class_show_quotes = '';
    if(quotes.length > 0){
        class_show_quotes = ' quote-show';
    }

    return(
        <div className={ 'quote-block' + class_show_quotes } title="Сохранено цитат">
            <FontAwesomeIcon icon={ faCommentDots }/>
            <span className="strong">{ quotes.length }</span>
            <span className="quote-remove" onClick={ props.removeQuotes } title="Очистить"><FontAwesomeIcon icon={ faTimes }/></span>
        </div>
    )
};

const mapStateToProps = (state) => {
    return {
        quotes: state.quotesReducer.quotes,
    }
};

export default connect(mapStateToProps, { removeQuotes })(Quotes);
