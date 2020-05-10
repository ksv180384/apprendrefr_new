import React, { Component } from 'react';
import './LearningWrite.css';

class LearningWrite extends Component{

    constructor(props){
        super(props);

        this.state = {
            modalOpen: false,
            content: '',
        };

        this.toggleModal = () => {
            this.setState({
                modalOpen: !this.state.modalOpen,
                content: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Accusamus aliquam commodi culpa debitis exercitationem expedita fugit illo illum ipsam, nam neque quidem, repellendus, vel? Debitis dolore ducimus excepturi praesentium quaerat quod ratione sint sunt. Ad assumenda, atque debitis dicta facilis ipsam neque quo quod ratione totam! Deleniti deserunt et id nostrum officia possimus suscipit unde. Alias aliquid animi architecto aut blanditiis cupiditate dolor doloremque eligendi enim eos esse, eveniet facere fugit hic in ipsam ipsum magni maiores minima minus modi mollitia necessitatibus officiis quasi quidem quo sapiente voluptatem voluptates?',
            });
        };
    }

    render(){

        const { modalOpen, content } = this.state;

        return(
            <div className="LearningWrite-block">
                <button onClick={ this.toggleModal }>Учимся писать</button>
            </div>
        );
    }
}

export default LearningWrite;