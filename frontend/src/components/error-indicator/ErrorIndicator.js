import React  from 'react';
import { connect } from "react-redux";

import './ErrorIndicator.css';

const ErrorIndicator = () => {

    document.title = 'Ошибка 404 ApprendreFr.ru';
    document.querySelector('meta[name="description"]').content = 'Ошибка 404 ApprendreFr.ru';
    document.querySelector('meta[name="keywords"]').content = 'Ошибка 404 ApprendreFr.ru';

    return(
        <div className="ErrorIndicator" >
            <div className="ErrorIndicator-content">
                <div className="ErrorIndicator-header">
                    Oups, une erreur 404...
                    <small>
                        Упс, ошибка 404...
                    </small>
                </div>
                <div className="ErrorIndicator-text">
                    L'adresse que vous cherchez à afficher n'est malheureusement pas disponible sur le site.
                    <small>
                        Адрес, который вы хотите отобразить, к сожалению, не доступен на сайте.
                    </small>
                </div>
                <div className="ErrorIndicator-text">
                    Veuillez vérifier votre url.
                    <small>
                        Пожалуйста, проверьте ваш URL.
                    </small>
                </div>
                <div className="ErrorIndicator-text">
                    <a href="/" className="link">Прейти на главную страницу</a>
                </div>
            </div>
        </div>
    );

};

export default connect(null, { })(ErrorIndicator);