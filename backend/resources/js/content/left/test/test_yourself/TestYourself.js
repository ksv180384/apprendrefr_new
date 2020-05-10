import React, { Component } from 'react';
import './TestYourself.css';

class TestYourself extends Component{

    constructor(props){
        super(props);

        this.state = {
            modalOpen: false,
            content: '',
        };

        this.toggleModal = () => {
            this.setState({
                modalOpen: !this.state.modalOpen,
                content: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Blanditiis commodi consectetur cumque eaque est inventore quasi tempora. Ad at deserunt eius, ipsam iusto laborum natus nobis quas, quo rerum sequi soluta vel veritatis voluptates.'
            });
        };
    }

    render(){

        const { modalOpen, content } = this.state;

        return(
            <div className="TestYourself-block">
                <button onClick={ this.toggleModal }>Проверь себя</button>
            </div>
        );
    }
}

export default TestYourself;