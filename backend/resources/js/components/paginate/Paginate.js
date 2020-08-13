import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class Paginate extends Component{

    constructor(props){
        super(props);

        this.loadContent = (e) => {
            const el = e.currentTarget;
            const page = el.getAttribute('data-page');
            this.props.loadPaginate( 'api' + (this.props.paginate_path ? this.props.paginate_path : this.props.path), { page: page ? page : 1 } );
        };

        this.getLinks = (current_page, last_page, path) => {
            let items = [];
            for(let i = 1; last_page >= i; i++){
                if(last_page > 5 && i === 2 && current_page > 4){
                    items.push(<span key={ i } className="p-item">...</span>);
                }
                if((current_page - 2 <= i && current_page + 2 >= i) || ( i === 1 || last_page === i)){
                    items.push(
                        <span key={ i }
                              className={ 'p-item' + (current_page === i ? ' active' : '') }
                              data-page={ i }
                            onClick={ this.loadContent }
                        >
                        <Link className="link" key={ i } to={ path + '/page/' + i }>{ i }</Link>
                    </span>
                    );
                }
                if(last_page > 5 && i === (last_page - 1) &&  current_page < (last_page - 3)){
                    items.push(<span key={ i } className="p-item">...</span>);
                }
            }

            return items;
        }
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
        let items = '';

        if(typeof current_page !== 'undefined'){
            items = this.getLinks(current_page, last_page, path);
        }

        return(
            <div className="paginator">
                { items }
            </div>
        );
    }
}

export default Paginate;