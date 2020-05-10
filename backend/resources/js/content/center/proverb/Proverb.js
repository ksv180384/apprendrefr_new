import React, { Component } from 'react';
import './Proverb.css';

class Proverb extends Component{


    render(){

        return(
            <div className="Proverb-block">
                <div className="panel">
                    <div className="panel_header">
                        Пословица
                    </div>
                    <div className="panel_content">
                        <div className="Proverb-content">
                            <div>
                                L'appétit vient en mangeant
                            </div>
                            <div className="translation mt-10">
                                Аппетит приходит во время еды
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default Proverb;