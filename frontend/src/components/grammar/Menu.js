import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

// actions
import { getPageItem } from '../../store/actions/grammarActions';

const Grammar = (props) => {

    const loadContent = (e) => {
        const el = e.target.parentNode;
        props.getPageItem('api/grammar/item/' + el.getAttribute('data-id-page'));
    };

    const { menu, page_id } = props;

    return(
        <div className="Grammar-menu-block">
            <ul>
                {
                    menu.length > 0
                        ?
                            Object.keys(menu).map((key) => {
                                return <li key={ menu[key].id }
                                           className={ page_id === menu[key].id ? 'active' : '' }
                                           onClick={ loadContent }
                                           data-id-page={ menu[key].id }>
                                           <Link to={ '/grammar/item/' + menu[key].id } className="link">{ menu[key].title }</Link>
                                       </li>
                            })
                        :
                            <div>пусто</div>
                }
            </ul>
        </div>
    );
};

const mapStateToProps = (state) => {
    return {
        menu: state.grammarReducer.list,
        page_id: state.grammarReducer.page_id,
    }
};

export default connect(mapStateToProps, { getPageItem })(Grammar);