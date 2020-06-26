import React, { Component } from 'react';
import { connect } from 'react-redux';
import store from '../../store';
import { setLoader, getLoader } from '../../store/actions/loaderActions';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSpinner } from '@fortawesome/free-solid-svg-icons';


import './Preloader.css';

class Preloader extends Component{

    constructor(props){
        super(props);

        this.state = {
            load: this.props.load,
        };


        store.subscribe(() => {
            this.setState({ load: store.getState().loaderReducer });
        });

    }

    componentDidMount(){

    }


    render(){

        const { load } = this.state;

        let classShow = '';
        if(load){
            classShow = ' show';
        }

        return(
            <div className={'Preloader-block' + classShow }>
                Télécharger <FontAwesomeIcon icon={faSpinner} spin/>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        load: state.loaderReducer
    }
};

export default connect(mapStateToProps, { setLoader, getLoader })(Preloader);