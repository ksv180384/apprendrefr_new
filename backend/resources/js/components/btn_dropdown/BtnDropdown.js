import React, { Component } from 'react';
import './BtnDropdown.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSortDown } from "@fortawesome/free-solid-svg-icons/index";

class BtnDropdown extends Component{
    constructor(props){
        super(props);

        const selectI = this.props.selectItem ? this.props.selectItem : 0;

        this.state = {
            show_list: false,
            select_id: selectI,
            select_item: this.selectItem(selectI, this.props.selectList)
        };

        this.toggleList = (e) => {
            this.setState({
                show_list: !this.state.show_list
            });
        };

        this.changeItem = (e) => {
            const el = e.currentTarget;
            this.setState({
                show_list: !this.state.show_list,
                select_item: { id: el.dataset.id, title: el.innerHTML }
            });
            //this.props.onChange({name: this.props.name, value: el.dataset.id});
        };

        this.selectItem = (itemId, list) => {
            let res = {};
            for(let key in list){
                if(list[key].id === itemId){
                    res = list[key];
                    break;
                }
            }
            return res;
        };
    }

    render(){

        const { title, selectList, name } = this.props;
        const { show_list, select_item }  = this.state;

        return(
            <div className="BtnDropdown">
                <div className="BtnDropdown-title" title={ title }>
                    <span>{ title }</span>
                </div>
                <div className={ 'BtnDropdown-list-block' + (show_list ? ' active' : '') }>
                    <span data-id={ select_item.id } onClick={ this.toggleList }>
                        { select_item.title }
                        <FontAwesomeIcon icon={ faSortDown }/>
                        <input type="hidden" name={ name } defaultValue={ select_item.id } />
                    </span>
                    <ul>
                        {
                            Object.keys(selectList).map(key => {
                                return (
                                    <li key={ selectList[key].id } data-id={ selectList[key].id  } onClick={ this.changeItem }>
                                        { selectList[key].title }
                                    </li>
                                )
                            })
                        }
                    </ul>
                </div>
            </div>
        );
    }
}

export default BtnDropdown;