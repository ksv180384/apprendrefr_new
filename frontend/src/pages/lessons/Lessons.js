import React, { Component } from 'react';
import { connect } from 'react-redux';

// actions
import { getPage } from '../../store/actions/lessonsActions';

// components
import Header from "../../header/Header";
import Footer from "../../footer/Footer";
import LayoutTwo from "../../layouts/app/LayoutTwo";
import Left from "../../layouts/app/left/Left";
import CenterTwoBlock from "../../layouts/app/center/CenterTwoBlock";
import LoaderPage from "../../components/loader_page/LoaderPage";
import LessonsMenu from '../../components/lessons/Menu';
import LessonsContent from '../../components/lessons/Content';

class Lessons extends Component {

    constructor(){
        super();

    }

    componentDidMount(){
        if(this.props.match.params.id){
            this.props.getPage('api/lessons/item-page/' + this.props.match.params.id);
        }else{
            this.props.getPage('api/lessons');
        }
    }

    render(){

        const { loader_page, meta_data } = this.props;

        document.title = meta_data.title;
        document.querySelector('meta[name="description"]').content = meta_data.description;
        document.querySelector('meta[name="keywords"]').content = meta_data.keywords;

        return(
            loader_page
                ?
                <React.Fragment>
                    <LoaderPage/>
                </React.Fragment>
                :
                <React.Fragment>
                    <Header/>
                    <LayoutTwo>
                        <Left>
                            <LessonsMenu/>
                        </Left>

                        <CenterTwoBlock>
                            <LessonsContent/>
                        </CenterTwoBlock>

                    </LayoutTwo>

                    <Footer/>
                </React.Fragment>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        loader_page: state.loaderPageReducer,
        meta_data: state.metaReducer,
    };
};

export default connect(mapStateToProps, { getPage })(Lessons);