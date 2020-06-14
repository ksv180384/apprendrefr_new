import React, { Component } from 'react';
import { connect } from 'react-redux';
import { loadTestYourselfData } from '../../../store/actions/testYourselfActions';

class TestYourSelfContent extends Component{

    constructor(props){
        super(props);

        this.showQuestion = () => {
            //console.log(this.props.data.questions_list);
            const answer_options = this.props.data.questions_list[0].answer_options;
            const answer = this.props.data.questions_list[0].answer;
            console.log(answer);
            console.log(answer_options);

        }
    }



    render(){

        const { data } = this.props;

        return(
            <div className="TestYourSelfContent">
                { this.showQuestion() }
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        data: state.testYourselfReducer,
    }
}

export default connect(mapStateToProps, { loadTestYourselfData })(TestYourSelfContent);