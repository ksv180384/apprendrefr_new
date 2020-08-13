import React, { Component } from 'react';
import './TabBar.css'

class TabBarNav extends Component{

    constructor(props){
        super(props);

        // Получаем активный элемент из массива дочерних элементов
        this.getActive = () => {
            let res = React.Children.map(this.props.children, (child, i) => {
                if(child.props.active){
                    return i;
                }
            })[0];
            return res;
        };

        this.props.parentInitSelectElement(this.getActive());

        this.state = {
            indexActive: this.getActive()
        };

        this.clickItem = (navItemProps) => {
            this.props.onClick(navItemProps);
            this.setState({ indexActive: navItemProps.item });
        };

        //this.props.parentInitSelectElement(this.getActive());
    }

    componentDidMount(){

    }

    render(){
        const { children } = this.props;
        const { indexActive } = this.state;

        return(
            <nav className="tab-nav">
                {
                    React.Children.map(children, (child, i) => {
                        return React.cloneElement(child, { onClick: this.clickItem, active: indexActive === i, item: i });
                    })
                }
            </nav>
        );
    }
}

export default TabBarNav;