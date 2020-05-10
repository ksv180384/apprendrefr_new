import React, { Component } from 'react';
import './Joke.css';

class Joke extends Component{

    render(){

        return(
            <div className="Joke-block">
                <div className="panel">
                    <div className="panel_header">
                        Анекдот
                    </div>
                    <div className="panel_content">

                        Le petit gars <span className="translation">(маленький мальчик)</span> demande à son père <span
                        className="translation">(спрашивает у своего отца)</span>: "Papa, quand je suis venu au
                        monde <span className="translation">(когда я появился на свет)</span>, qui m'a donné mon
                        intelligence <span className="translation">(кто мне дал мой ум /мою сообразительность/)</span>?"
                        "C'est sûrement ta mère<span className="translation">(конечно, твоя мама)</span>, car moi, j'ai
                        encore la mienne <span className="translations">(так как мой еще при мне: «я имею еще мою»)</span>."
                        <div className="joke-source">
                            Отрывок из<br/>
                            Французский с улыбкой<br/>
                            Автор: Ольга Розенкова
                        </div>

                    </div>
                </div>
            </div>
        );
    }
}

export default Joke;