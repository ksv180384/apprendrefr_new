import React, { Component } from 'react';
import { connect } from 'react-redux';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars, faTimes } from '@fortawesome/free-solid-svg-icons';

// actions
import { getPageItem } from '../../store/actions/grammarActions';
import { setLoaderPage } from '../../store/actions/loaderPageActions';

import { Link } from 'react-router-dom';

import store from "../../store";

class Content extends Component {

    constructor(){
        super();

        this.state = {
            show_menu_block: false
        };

        this.toggleMenuContent = (e) => {
            this.setState({ ...this.state, show_menu_block: !this.state.show_menu_block });
        };

        this.loadContent = (e) => {
            const el = e.target.parentNode;
            this.toggleMenuContent();
            store.dispatch(setLoaderPage(true));
            const page_id = parseInt(el.getAttribute('data-id-page'));
            let path = 'api/grammar';
            if(page_id > 0){
                path = 'api/grammar/item/' + page_id;
            }
            this.props.getPageItem(path, () => {
                store.dispatch(setLoaderPage(false));
            });
        };
    }

    render(){
        const { content_page, menu } = this.props;
        const { show_menu_block } = this.state;

        let class_show_menu_block = '';
        if(show_menu_block){
            class_show_menu_block = ' show-menu-block';
        }

        return(
            <div className={ 'Grammar-content-block' + class_show_menu_block }>
                {
                    content_page
                        ?
                        <React.Fragment>
                            <div className="show-menu-content-block-btn" onClick={ this.toggleMenuContent }>
                                <FontAwesomeIcon icon={ faBars }/>
                            </div>
                            <div className="panel_header"><h1>{ content_page.title }</h1></div>
                            <div className="g-content-block p-10" dangerouslySetInnerHTML={ {__html: content_page.content } }/>
                        </React.Fragment>
                        :
                        <div className="Grammar-menu-block">
                            <ul>
                                <li className={ !content_page ? 'active' : '' }
                                    data-id-page={ 0 }
                                    onClick={ this.loadContent }
                                >
                                    <Link to={ '/grammar/' } className="link">Грамматика</Link>
                                </li>
                                {
                                    menu.length > 0
                                        ?
                                        menu.map((item) => {
                                            return <li key={ item.id }
                                                       className={ content_page.id === item.id ? 'active' : '' }
                                                       data-id-page={ item.id }
                                                       onClick={ this.loadContent }
                                            >
                                                <Link to={ '/grammar/item/' + item.id } className="link">{ item.title }</Link>
                                            </li>
                                        })
                                        :
                                        <div></div>
                                }
                            </ul>
                        </div>
                }

                <div className="menu-content-block">
                    <div className="Grammar-menu-block">
                        <div className="close-content-menu" onClick={ this.toggleMenuContent }>
                            <FontAwesomeIcon icon={ faTimes }/>
                        </div>
                        <ul>
                            <li className={ !content_page ? 'active' : '' }
                                data-id-page={ 0 }
                                onClick={ this.loadContent }
                            >
                                <Link to={ '/grammar/' } className="link">Грамматика</Link>
                            </li>
                            {
                                menu.length > 0
                                    ?
                                    menu.map((item) => {
                                        return <li key={ item.id }
                                                   className={ content_page.id === item.id ? 'active' : '' }
                                                   data-id-page={ item.id }
                                                   onClick={ this.loadContent }
                                        >
                                            <Link to={ '/grammar/item/' + item.id } className="link">{ item.title }</Link>
                                        </li>
                                    })
                                    :
                                    <div></div>
                            }
                        </ul>
                    </div>
                </div>
            </div>
        );
    }
};

const mapStateToProps = (state) => {
    return {
        content_page: state.grammarReducer.item,
        menu: state.grammarReducer.list,
    }
};

export default connect(mapStateToProps, { getPageItem, setLoaderPage })(Content);