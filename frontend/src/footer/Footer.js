import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './Footer.css';
import {connect} from "react-redux";

class Footer extends Component{

    constructor(){
        super();

    }

    render(){

        const { footer } = this.props;

        return(
            <footer className="Footer">
                <div className="Footer-block">
                    <div className="Footer-content">
                        <ul className="text-center">
                            <li>© { footer[0] }</li>
                            <li>e-mail: { footer[1] }</li>
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
//export default Footer;
const mapStateToPage = (state) => {
    return {
        footer: state.footerReducer,
    }
};

export default connect(mapStateToPage, {  })(Footer);