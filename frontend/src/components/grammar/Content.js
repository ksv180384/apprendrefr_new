import React from 'react';
import { connect } from 'react-redux';

const Content = (props) => {

    const { content_page } = props;

    return(
        <div className="Grammar-content-block">
            {
                content_page
                    ?
                        <React.Fragment>
                            <div className="panel_header"><h1>{ content_page.title }</h1></div>
                            <div className="p-10" dangerouslySetInnerHTML={ {__html: content_page.content } }/>
                        </React.Fragment>
                    :
                        <div></div>
            }
        </div>
    );
};

const mapStateToProps = (state) => {
    return {
        content_page: state.grammarReducer.item,
    }
};

export default connect(mapStateToProps, { })(Content);