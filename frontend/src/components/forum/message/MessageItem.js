import React, { Component }  from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faVenus, faMars, faCommentDots, faEdit, faTimesCircle, faTimes, faEye } from '@fortawesome/free-solid-svg-icons';
import { faFacebookF, faSkype, faTwitter, faVk, faOdnoklassniki,
    faTelegram, faWhatsapp, faViber, faYoutube, faInstagram } from '@fortawesome/free-brands-svg-icons';

// components
import TextEditor from '../../../components/forum/text_editor/TextEditor';

//actions
import { addQuote } from '../../../store/actions/quotesActions';
import { updateMessage, hideMessage } from '../../../store/actions/forumActions';
import Moment from "moment";

class MessagesList extends Component{

    constructor(){
        super();

        this.state = {
            text_editor: '',
            show_message: true,
        };

        this.updateMessage = (mess, callback) => {
            const message_id = this.props.message.id;
            this.props.updateMessage(message_id, mess, (res) => {
                if(res){
                    this.showEditor();
                }
            });
        };

        // Добавить сообщение в цитируемое
        this.setQuote = (e) => {
            const el =  e.target;
            const el_message = el.closest('.MessageItem');
            const quote_content = el_message.querySelector('.MessageItem-message').innerHTML;
            const quote_id = el_message.getAttribute('id');
            this.props.addQuote({ id: quote_id, content: quote_content });
        };

        this.showEditor = () => {
            if(!this.state.text_editor){
                this.setState({
                    text_editor: <div className="MessageEditorBlock">
                                    <div className="editor-close" title="Закрыть редактирование" onClick={ this.showEditor }>
                                        <FontAwesomeIcon icon={ faTimes }/>
                                    </div>
                        MessagesList.js                   <TextEditor defaultText={ this.props.message.message } s
                                                send={ this.updateMessage }
                                    />
                                </div>,
                    show_message: false,
                });
            }else{
                this.setState({ text_editor: '', show_message: true });
            }

        };

        // Срываем сообщение
        this.hideMessage = () => {
            this.props.hideMessage(this.props.message.id, (res) => {

            });
        }
    }

    render(){
        const { message, topic, auth, user_auth } = this.props;
        const { text_editor, show_message } = this.state;

        let class_hide_message = '';
        if(!show_message){
            class_hide_message = ' hide-message';
        }

        return(

            <div className={ 'MessageItem' } id={ 'post-id-' + message.id }>
                <div className="MessageItem-user-info">
                    <div className="MessageItem-user-avatar">
                        <div className="MessageItem-user-avatar-block"
                             style={ {backgroundImage: 'url('+ message.user.avatar +')'} }>

                        </div>
                    </div>
                    <div className="MessageItem-user-login">
                        <Link to={ '/user/info/' + message.user.id } className="link">{ message.user.login }</Link>
                        {
                            message.user.sex
                                ?
                                <span className="user-gender" title={ message.user.sex.title }>
                                <FontAwesomeIcon icon={ message.user.sex.title === 'Мужской' ? faMars : faVenus }/>
                            </span>
                                :
                                ''
                        }
                    </div>
                    <div className="MessageItem-user-group">
                        { message.user.rang.title }
                    </div>
                    <div className="MessageItem-user-user-posts">
                        Сообщений: { message.user_messages_count }
                    </div>
                    <div className="MessageItem-social-block">
                        {
                            message.user.infos.facebook
                                ?
                                <a  href={ message.user.infos.facebook_link } title="Facebook" target="_blank"
                                    className="MessageItem-social-item">
                                    <FontAwesomeIcon icon={ faFacebookF } />
                                </a>
                                :
                                ''
                        }
                        {
                            message.user.infos.instagram
                                ?
                                <a  href={ message.user.infos.instagram_link } title="Instagram" target="_blank"
                                    className="MessageItem-social-item">
                                    <FontAwesomeIcon icon={ faInstagram } />
                                </a>
                                :
                                ''
                        }
                        {
                            message.user.infos.odnoklassniki
                                ?
                                <a  href={ message.user.infos.odnoklassniki_link } title="Odnoklassniki" target="_blank"
                                    className="MessageItem-social-item">
                                    <FontAwesomeIcon icon={ faOdnoklassniki } />
                                </a>
                                :
                                ''
                        }
                        {
                            message.user.infos.vk
                                ?
                                <a  href={ message.user.infos.vk_link } title="Vk" target="_blank"
                                    className="MessageItem-social-item">
                                    <FontAwesomeIcon icon={ faVk } />
                                </a>
                                :
                                ''
                        }
                        {
                            message.user.infos.youtube
                                ?
                                <a  href={ message.user.infos.youtube_link } title="Youtube" target="_blank"
                                    className="MessageItem-social-item">
                                    <FontAwesomeIcon icon={ faYoutube } />
                                </a>
                                :
                                ''
                        }
                        {
                            message.user.infos.twitter
                                ?
                                <a  href={ message.user.infos.twitter_link } title="Twitter" target="_blank"
                                    className="MessageItem-social-item">
                                    <FontAwesomeIcon icon={ faTwitter } />
                                </a>
                                :
                                ''
                        }
                    </div>
                    <div className="MessageItem-messengers-block">
                        {
                            message.user.infos.skype
                                ?
                                <span data-info={ message.user.infos.skype } title="Skype"
                                      className="MessageItem-social-item">
                                <FontAwesomeIcon icon={ faSkype } />
                            </span>
                                :
                                ''
                        }
                        {
                            message.user.infos.telegram
                                ?
                                <span data-info={ message.user.infos.telegram } title="Telegram"
                                      className="MessageItem-social-item">
                                <FontAwesomeIcon icon={ faTelegram } />
                            </span>
                                :
                                ''
                        }
                        {
                            message.user.infos.whatsapp
                                ?
                                <span data-info={ message.user.infos.whatsapp } title="Whatsapp"
                                      className="MessageItem-social-item">
                                <FontAwesomeIcon icon={ faWhatsapp } />
                            </span>
                                :
                                ''
                        }
                        {
                            message.user.infos.viber
                                ?
                                <span data-info={ message.user.infos.viber } title="Viber" className="MessageItem-social-item">
                                <FontAwesomeIcon icon={ faViber } />
                            </span>
                                :
                                ''
                        }
                    </div>
                </div>
                <div className={'MessageItem-content' + (message.status_title.alias === 'hidden' ? ' hide-message' : '') }>
                    <div className="MessageItem-content-header">
                        <div className="MessageItem-content-login-mobile">
                            <Link to={ '/user/info/' + message.user.id } className="link">{ message.user.login }</Link>
                        </div>
                        <div className="MessageItem-content-date-post">
                            { Moment(message.created_at, 'YYYY-MM-DDTHH:mm:ss.SSSSZ').format('HH:mm') }
                            <strong> { Moment(message.created_at, 'YYYY-MM-DDTHH:mm:ss.SSSSZ').format('DD MMM YYYY') }</strong>
                        </div>
                        <div className="MessageItem-content-topic-title">
                            #{ message.id } { topic.title }
                        </div>
                    </div>
                    <div className={ 'MessageItem-message' + class_hide_message }
                         dangerouslySetInnerHTML={
                             {__html: message.message }
                         }/>
                    { message.user.signature ? <div className="signature">{ message.user.signature }</div> : '' }
                    <div className="message-control">
                        <ul>
                            {
                                auth &&
                                (
                                    user_auth.admin === 1 ||
                                    user_auth.rang.alias === 'administrator' ||
                                    user_auth.rang.alias === 'moderator'
                                )
                                    ?
                                    <li onClick={ this.hideMessage }>
                                        {
                                            message.status_title.alias === 'hidden'
                                                ?
                                                <FontAwesomeIcon icon={ faEye } title="Показать"/>
                                                :
                                                <FontAwesomeIcon icon={ faTimesCircle } title="Скрыть"/>
                                        }
                                    </li>
                                    :
                                    ''
                            }
                            {
                                auth && user_auth.rang.alias !== 'zabanen'
                                    ?
                                    <li title="Цитировать" onClick={ this.setQuote }>
                                        <FontAwesomeIcon icon={ faCommentDots }/>
                                    </li>
                                    :
                                    ''
                            }
                            {
                                auth && user_auth.id === message.user.id
                                    ?
                                    <li title="Редактировать" onClick={ this.showEditor }>
                                        <FontAwesomeIcon icon={ faEdit }/>
                                    </li>
                                    :
                                    ''
                            }
                        </ul>
                    </div>
                    { text_editor }
                </div>

            </div>

        );
    }

};

const mapStateToProps = (state) => {
    return {
        auth: state.loginReducer.login,
        user_auth: state.userReducer,
        message_request: state.forumSendMessageReducer.loading,
    }
};

export default connect(mapStateToProps, { addQuote, updateMessage, hideMessage })(MessagesList);