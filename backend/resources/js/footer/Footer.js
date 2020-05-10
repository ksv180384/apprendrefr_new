import React, { Component } from 'react';
import './Footer.css';

class Footer extends Component{
    render(){
        return(
            <footer className="Footer">
                <div className="Footer-block">
                    <div className="Footer-content">
                        <ul className="text-center">
                            <li>© 2010 - 2020 гг ApprendereFr.ru</li>
                            <li>e-mail: admin@apprendrefr.ru </li>
                        </ul>
                    </div>
                </div>
            </footer>
        )
    }
}
export default Footer;