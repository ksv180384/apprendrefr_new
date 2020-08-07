import React from 'react';
import { connect } from 'react-redux';

// components
import SearchWordItem from './SearchWordItem';


const SearchWord = (props) => {

    const { words } = props;

    console.log(words);

    return(
        <div>
            {
                words.length > 0
                    ?
                        words.map((item) => {
                            return <SearchWordItem key={ item.id } { ...item } />
                        })
                    :
                    <div className="non-words-block">
                        Подходящих слов не нейдено
                    </div>
            }
        </div>
    );
};

const mapStateToProps = (state) => {
    return {
        words: state.searchWordPageReducer,
    }
};

export default connect(mapStateToProps, {})(SearchWord);