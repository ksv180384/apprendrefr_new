import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class Paginate extends Component{

    constructor(){
        super();

        this.loadPage = (e) => {
            const el = e.currentTarget;
            this.props.getContent(el.getAttribute('data-page'));
        };
    }

    render(){

        /**
         * current_page - текущая страница
         * last_page - последняя страница
         * per_page
         * to - элементов на странице
         * total - сего элементов
         */
        const { current_page, last_page, per_page, to, total, path } = this.props;
        let items = [];
        for(let i = 1; last_page >= i; i++){
            if(last_page > 5 && i === 2 && current_page > 4){
                items.push(<span key={ i } className="p-item">...</span>);
            }
            if(current_page - 2 <= i && current_page + 2 >= i || ( i === 1 || last_page === i)){
                items.push(
                    <span key={ i }
                          className={ 'p-item' + (current_page === i ? ' active' : '') }
                          data-page={ i }
                          onClick={ this.loadPage }
                    >
                        <Link className="link" key={ i } to={ path + '/page/' + i }>{ i }</Link>
                    </span>
                );
            }
            if(last_page > 5 && i === (last_page - 1) &&  current_page < (last_page - 3)){
                items.push(<span key={ i } className="p-item">...</span>);
            }
        }

        return(
            <div className="paginator">
                { items }
            </div>
        );
    }
}

export default Paginate;