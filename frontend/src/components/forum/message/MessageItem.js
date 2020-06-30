import React, { Component } from 'react';
import { connect } from 'react-redux';

class MessagesList extends Component{

    render(){

        const { message, topic } = this.props;

        return(

            <div className="MessageItem">
                <div className="MessageItem-user-info">
                    <div className="MessageItem-user-avatar">
                        <div className="MessageItem-user-avatar-block"
                             style={ {backgroundImage: 'url('+ message.user_avatar +')'} }>

                        </div>
                    </div>
                    <div className="MessageItem-user-login">
                        { message.user_login }
                    </div>
                    <div className="MessageItem-user-group">
                        { message.user_rang_title }
                    </div>
                    <div className="MessageItem-user-user-posts">
                        Сообщений: { message.user_posts }
                    </div>
                </div>
                <div className="MessageItem-content">
                    <div className="MessageItem-content-header">
                        <div className="MessageItem-content-date-post">
                            { message.created_at }
                        </div>
                        <div className="MessageItem-content-topic-title">
                            #{ message.id } { topic.title }
                        </div>
                    </div>
                    <div className="MessageItem-message" dangerouslySetInnerHTML={{__html: message.message }}/>
                </div>

            </div>

        );
    }
}

export default MessagesList;