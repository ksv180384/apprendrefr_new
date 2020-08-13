import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

// actions
import { getPageItem } from '../../store/actions/grammarActions';

const Menu = (props) => {

    const loadContent = (e) => {
        const el = e.target.parentNode;
        const page_id = parseInt(el.getAttribute('data-id-page'));
        let path = 'api/grammar';
        if(page_id > 0){
            path = 'api/grammar/item/' + page_id;
        }
        props.getPageItem(path, () => {});
    };

    const { menu, page_id } = props;

    return(
        <div className="Grammar-menu-block">
            <ul>
                <li className={ !page_id ? 'active' : '' }
                    data-id-page={ 0 }
                    onClick={ loadContent }
                >
                    <Link to={ '/grammar/' } className="link">Грамматика</Link>
                </li>
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

export default connect(mapStateToProps, { getPageItem })(Menu);