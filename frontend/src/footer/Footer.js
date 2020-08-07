import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './Footer.css';

class Footer extends Component{
    render(){
        return(
            <footer className="Footer">
                <div className="Footer-block">
                    <div className="Footer-content">
                        <ul className="text-center">
                            <li>© 2010 - 2020 гг ApprendereFr.ru</li>
                            <li>e-mail: admin@apprendrefr.ru</li>
                            <li>
                                <Link to="/info/terms-user" className="link m-10">Правила пользовательского соглашения</Link>
                                <Link to="/info/privacy-policy" className="link m-10">Политика по защите персональных данных</Link>
                            </li>
                        </ul>
                    </div>
                </div>
            </footer>
        )
    }
}
export default Footer;