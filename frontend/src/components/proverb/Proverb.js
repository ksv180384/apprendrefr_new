import React, { Component } from 'react';
import { connect } from 'react-redux';
import { loadProverb }  from '../../store/actions/proverbActions';

import './Proverb.css';

class Proverb extends Component{

    componentDidMount(){
        this.props.loadProverb();
    }

    render(){

        const { proverb } = this.props;

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

const mapStateToProps = (state) => {
    return {
        proverb: state.proverbReducer
    }
};

export default connect(mapStateToProps, { loadProverb })(Proverb);