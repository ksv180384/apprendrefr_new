import React, { Component } from 'react';
import './TabBar.css'

class TabBar extends Component{

    constructor(props){
        super(props);

        this.state = {
            indexActive: 0
        };

        this.handleSelected = (navItemProps) => {
            this.setState({ indexActive: navItemProps.item });
        };

        this.initSelectElement = (activeTabBarNav) => {
            this.setState({ indexActive: activeTabBarNav });
        };

        this.getChildren = () => {
            let cTabItem = 0; // Счетчик TabItem компонентов в children элементах
            return React.Children.map(this.props.children, (child) => {
                if(child.type.name === 'TabBarNav'){
                    // Клонируем дочерний элемент и добовляем в него дополнительные пропсы
                    return React.cloneElement(child, { onClick: this.handleSelected, parentInitSelectElement: this.initSelectElement });
                }else{
                    // Клонируем дочерний элемент и добовляем в него дополнительные пропсы
                    return React.cloneElement(child, { active: this.state.indexActive === cTabItem ++ });
                }
            })
        }
    }

    render(){

        return(
            <div className="TabBar">

                {
                    this.getChildren()
                }
            </div>
        );
    }
}

export default TabBar;