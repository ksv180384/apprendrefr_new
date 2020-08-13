import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

// actions
import { getPageItem } from '../../store/actions/lessonsActions';

const Menu = (props) => {

    const loadContent = (e) => {
        const el = e.target.parentNode;
        const id = el.getAttribute('data-id-page');
        props.getPageItem('api/lessons/item/' + (id ? id : 0), () => {});
    };

    const { menu, page_id } = props;

    return(
        <div className="Grammar-menu-block">
            {
                menu
                    ?
                    <ul>
                        <li className={page_id === undefined ? 'active' : ''}>
                            <Link to={'/lessons'}
                                  className="link"
                                  onClick={ loadContent }
                                  data-id-page={ 0 }
                            >0. Вступление</Link>
                        </li>
                        {
                            menu.map((item) => {
                                return <li key={item.id}
                                           className={page_id === item.id ? 'active' : ''}
                                           onClick={ loadContent }
                                           data-id-page={item.id}>
                                    <Link to={'/lessons/item/' + item.id}
                                          className="link">{item.title}</Link>
                                </li>
                            })
                        }
                    </ul>
                    :
                    <div>пусто</div>
            }
        </div>
    );
};

const mapStateToProps = (state) => {
    return {
        menu: state.lessonsReducer.list,
        page_id: state.lessonsReducer.page_id,
    }
};

export default connect(mapStateToProps, { getPageItem })(Menu);