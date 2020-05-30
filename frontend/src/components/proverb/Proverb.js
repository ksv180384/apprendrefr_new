import React, { Component } from 'react';
import './Proverb.css';

//import index from "../../store/store";

class Proverb extends Component{


    render(){

        //const { proverb } = index.getState().page_data;
        const proverb = {};

        return(
            <div className="Proverb-block">
                <div className="panel">
                    <div className="panel_header">
                        Пословица
                    </div>
                    <div className="panel_content">
                        <div className="Proverb-content">
                            <div>
                                { proverb.text }
                            </div>
                            <div className="translation mt-10">
                                { proverb.translation }
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default Proverb;