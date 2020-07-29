import React  from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faVenus, faMars, faCommentDots, faEdit, faTimesCircle } from '@fortawesome/free-solid-svg-icons';
import { faFacebookF, faSkype, faTwitter, faVk, faOdnoklassniki,
    faTelegram, faWhatsapp, faViber, faYoutube, faInstagram } from '@fortawesome/free-brands-svg-icons';

//actions
import { addQuote } from '../../../store/actions/quotesActions';

const MessagesList = (props) => {

    const setQuote = (e) => {
        const el =  e.target;
        const el_message = el.closest('.MessageItem');
        const quote_content = el_message.querySelector('.MessageItem-message').innerHTML;
        const quote_id = el_message.getAttribute('id');
        props.addQuote({ id: quote_id, content: quote_content });
    };
    
    const { message, topic, auth, user_auth } = props;

    return(

        <div className="MessageItem" id={ 'post-id-' + message.id }>
            <div className="MessageItem-user-info">
                <div className="MessageItem-user-avatar">
                    <div className="MessageItem-user-avatar-block"
                         style={ {backgroundImage: 'url('+ message.user_avatar +')'} }>

                    </div>
                </div>
                <div className="MessageItem-user-login">
                    <Link to={ '/user/info/' + message.user_id } className="link">{ message.user_login }</Link>
                    {
                        message.user_sex_id
                            ?
                            <span className="user-gender" title={ message.user_sex_title }>
                                <FontAwesomeIcon icon={ message.user_sex_title === 'Мужской' ? faMars : faVenus }/>
                            </span>
                            :
                            ''
                    }
                </div>
                <div className="MessageItem-user-group">
                    { message.user_rang_title }
                </div>
                <div className="MessageItem-user-user-posts">
                    Сообщений: { message.user_posts }
                </div>
                <div className="MessageItem-social-block">
                    {
                        message.info_facebook
                            ?
                            <a  href={ message.info_facebook_link } title="Facebook" target="_blank"
                                className="MessageItem-social-item">
                                <FontAwesomeIcon icon={ faFacebookF } />
                            </a>
                            :
                            ''
                    }
                    {
                        message.info_instagram
                            ?
                            <a  href={ message.info_instagram_link } title="Instagram" target="_blank"
                                className="MessageItem-social-item">
                                <FontAwesomeIcon icon={ faInstagram } />
                            </a>
                            :
                            ''
                    }
                    {
                        message.info_odnoklassniki
                            ?
                            <a  href={ message.info_odnoklassniki_link } title="Odnoklassniki" target="_blank"
                                className="MessageItem-social-item">
                                <FontAwesomeIcon icon={ faOdnoklassniki } />
                            </a>
                            :
                            ''
                    }
                    {
                        message.info_vk
                            ?
                            <a  href={ message.info_vk_link } title="Vk" target="_blank"
                                className="MessageItem-social-item">
                                <FontAwesomeIcon icon={ faVk } />
                            </a>
                            :
                            ''
                    }
                    {
                        message.info_youtube
                            ?
                            <a  href={ message.info_youtube_link } title="Youtube" target="_blank"
                                className="MessageItem-social-item">
                                <FontAwesomeIcon icon={ faYoutube } />
                            </a>
                            :
                            ''
                    }
                    {
                        message.info_twitter
                            ?
                            <a  href={ message.info_twitter_link } title="Twitter" target="_blank"
                                className="MessageItem-social-item">
                                <FontAwesomeIcon icon={ faTwitter } />
                            </a>
                            :
                            ''
                    }
                </div>
                <div className="MessageItem-messengers-block">
                    {
                        message.info_skype
                            ?
                            <span data-info={ message.info_skype } title="Skype"
                                  className="MessageItem-social-item">
                                <FontAwesomeIcon icon={ faSkype } />
                            </span>
                            :
                            ''
                    }
                    {
                        message.info_telegram
                            ?
                            <span data-info={ message.info_telegram } title="Telegram"
                                  className="MessageItem-social-item">
                                <FontAwesomeIcon icon={ faTelegram } />
                            </span>
                            :
                            ''
                    }
                    {
                        message.info_whatsapp
                            ?
                            <span data-info={ message.info_whatsapp } title="Whatsapp"
                                  className="MessageItem-social-item">
                                <FontAwesomeIcon icon={ faWhatsapp } />
                            </span>
                            :
                            ''
                    }
                    {
                        message.info_viber
                            ?
                            <span data-info={ message.info_viber } title="Viber" className="MessageItem-social-item">
                                <FontAwesomeIcon icon={ faViber } />
                            </span>
                            :
                            ''
                    }
                </div>
            </div>
            <div className="MessageItem-content">
                <div className="MessageItem-content-header">
                    <div className="MessageItem-content-date-post">
                        { message.created_message.time } <strong>{ message.created_message.day }</strong>
                    </div>
                    <div className="MessageItem-content-topic-title">
                        #{ message.id } { topic.title }
                    </div>
                </div>
                <div className="MessageItem-message"
                     dangerouslySetInnerHTML={
                         {__html: message.message }
                     }/>
                { message.user_signature ? <div className="signature">{ message.user_signature }</div> : '' }
                <div className="message-control">
                    <ul>
                        {
                            auth && (user_auth.admin === 1 || user_auth.rang_alias === 'administrator' || user_auth.rang_alias === 'moderator')
                                ?
                                <li title="Скрыть">
                                    <FontAwesomeIcon icon={ faTimesCircle }/>
                                </li>
                                :
                                ''
                        }
                        {
                            auth && user_auth.rang_alias !== 'zabanen'
                                ?
                                <li title="Цитировать" onClick={ setQuote }>
                                    <FontAwesomeIcon icon={ faCommentDots }/>
                                </li>
                                :
                                ''
                        }
                        {
                            auth && user_auth.id === message.user_id
                                ?
                                <li title="Редактировать">
                                    <FontAwesomeIcon icon={ faEdit }/>
                                </li>
                                :
                                ''
                        }
                    </ul>
                </div>
            </div>

        </div>

    );

};

const mapStateToProps = (state) => {
    return {
        auth: state.loginReducer.login,
        user_auth: state.userReducer,
    }
};

export default connect(mapStateToProps, { addQuote })(MessagesList);