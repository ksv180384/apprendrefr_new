import React, { Component } from 'react';
import { connect } from 'react-redux';

// components


class ForumsList extends Component {

    render(){



        return(
            <div>List</div>
        );
    }
}

const mapStateToProps = (state) => {
    return {

    };
};

export default connect(mapStateToProps, {  })(ForumsList);