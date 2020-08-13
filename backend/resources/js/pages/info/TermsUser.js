import React,  { Component } from 'react';
import { connect } from 'react-redux';

import { getPage } from '../../store/actions/termsUserActions';

// components
import Header from "../../header/Header";
import Footer from "../../footer/Footer";
import LayoutFull from "../../layouts/app/LayoutFull";

import LoaderPage from "../../components/loader_page/LoaderPage";

class TermsUser extends Component {

    componentDidMount(){
        this.props.getPage();
    }

    render(){

        const { loader_page, meta_data, page } = this.props;

        document.title = meta_data.title;
        document.querySelector('meta[name="description"]').content = meta_data.description;
        document.querySelector('meta[name="keywords"]').content = meta_data.keywords;

        return(

            loader_page
                ?
                <LoaderPage/>
                :
                <React.Fragment>
                    <Header/>
                    <LayoutFull>
                        <div className="panel_header">
                            Правила пользовательского соглашения
                        </div>
                        <div className="info-page-block" dangerouslySetInnerHTML={{__html: page }}/>
                    </LayoutFull>
                    <Footer/>
                </React.Fragment>


        );
    }
}

const mapStateToPage = (state) => {
    return {
        loader_page: state.loaderPageReducer,
        meta_data: state.metaReducer,
        page: state.termsUserReducer,
    }
};

export default connect(mapStateToPage, { getPage })(TermsUser);