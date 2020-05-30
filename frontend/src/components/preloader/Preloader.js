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
            loader: this.props.getLoader(),
        };

        store.subscribe(() => {
            this.setState({ loader: store.getState().loaderReducer });
        });

    }

    componentDidMount(){

    }


    render(){

        const { loader } = this.state;

        let classShow = '';
        if(loader){
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
        loader: state.loaderReducer
    }
};

export default connect(mapStateToProps, { setLoader, getLoader })(Preloader);