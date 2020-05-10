import React, { Component } from 'react';
import './Search.css';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';

class Search extends Component{

    render(){

        return(
            <form action="/" method="POST">
                <div className="search">
                    <div className="label">найти</div>
                    <div className="select">
                        <span>слово</span>
                        <ul>
                            <li>слово</li>
                            <li>песню</li>
                        </ul>
                    </div>
                    <div className="input-search">
                        <input type="text" name="search" placeholder="Поиск..."/>
                        <input type="hidden" name="type"/>
                    </div>
                    <div className="btn-block">
                        <button type="submit">
                            <FontAwesomeIcon icon={faSearch} />
                        </button>
                    </div>
                </div>
            </form>
        );
    }
}

export default Search