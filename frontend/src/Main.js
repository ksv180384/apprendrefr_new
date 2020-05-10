import React, { Component } from 'react';
//import logo from './logo.svg';
import './Main.css';

import Header from './header/Header';
import Footer from './footer/Footer';
import Content from './content/Content';
import Preloader from './components/preloader/Preloader';
import ModalWindow from './components/modal_window/ModalWindow';

class Main extends Component {

    render() {

        const menu = this.props.menu;

        return (
            <section className="Main-block">
                <Header menu={menu}/>
                <Content/>
                <Footer/>
                <Preloader/>
                <ModalWindow
                    display={ false }
                    content={ 'content' }
                    header={'Учимся писать'}
                />
            </section>
        );
    }
}

export default Main;
