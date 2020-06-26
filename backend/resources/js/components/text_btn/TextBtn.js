import React, { Component } from 'react';
import './TextBtn.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSortDown } from "@fortawesome/free-solid-svg-icons/index";

class TextBtn extends Component{
    constructor(props){
        super(props);

        //console.log(this.props.selectList);
        const selectI = this.props.selectItem ? this.props.selectItem : 0;

        this.state = {
            show_list: false,
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
        };

    }

    selectItem(itemId, list) {
        let res = {}
        for(let key in list){
            if(list[key].id === itemId){
                res = list[key];
                break;
            }
        }
        return res;
    };

    render(){

        const { title, type, placeholder, selectList, icon, name, defaultValue } = this.props;
        const { show_list, select_item }  = this.state;

        return(
            <div className="TextBtn">
                <div className="TextBtn-title">
                    <FontAwesomeIcon icon={icon}/> { title }
                </div>
                <div className="TextBtn-input-block">
                    <input type={ type } name={ name } placeholder={ placeholder } defaultValue={ defaultValue }/>
                </div>
                <div className={ 'TextBtn-list-block' + (show_list ? ' active' : '') }>
                    <span data-id={ select_item.id } onClick={ this.toggleList }>
                        { select_item.title }
                        <FontAwesomeIcon icon={ faSortDown }/>
                        <input type="hidden" name={ name + '_view' } defaultValue={ select_item.id }/>
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

export default TextBtn;