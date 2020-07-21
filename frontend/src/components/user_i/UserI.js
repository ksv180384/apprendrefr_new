import React from 'react';
import Moment from 'moment';
import 'moment/locale/pt-br';
import { connect } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faInstagram,
    faOdnoklassniki,
    faSkype,
    faTelegram,
    faTwitter,
    faViber, faVk, faWhatsapp,
    faYoutube, faFacebookF
} from "@fortawesome/free-brands-svg-icons/index";

Moment.locale('ru');

const UserI = (props) => {

    const { user_info } = props;
    const age = Moment().diff(user_info.birthday, 'years', false);

    return(
        user_info
            ?
            <React.Fragment>
                <div className="panel">
                    <div className="panel_header">
                        Пользователь <span className="user-name">{ user_info.login }</span>
                    </div>
                    <div className="panel_content">


                        <div className="profile-edit-user-data-block-item">
                            <div className="profile-edit-avatar">
                                <div className="user-name">
                                    { user_info.login }
                                </div>
                                <div className="upload-avatar-block mt-10 mb-10"
                                     style={ { backgroundImage: 'url("' + user_info.avatar + '")' } }>

                                </div>
                                <div className="user-rang">
                                    { user_info.rang_title }
                                </div>



                                <div className="user-info-social-block">
                                    {
                                        user_info.facebook
                                            ?
                                            <a  href={ user_info.info_facebook_link } title="Facebook" target="_blank"
                                                className="MessageItem-social-item">
                                                <FontAwesomeIcon icon={ faFacebookF } />
                                            </a>
                                            :
                                            ''
                                    }
                                    {
                                        user_info.instagram
                                            ?
                                            <a  href={ user_info.info_instagram_link } title="Instagram" target="_blank"
                                                className="MessageItem-social-item">
                                                <FontAwesomeIcon icon={ faInstagram } />
                                            </a>
                                            :
                                            ''
                                    }
                                    {
                                        user_info.odnoklassniki
                                            ?
                                            <a  href={ user_info.info_odnoklassniki_link } title="Odnoklassniki" target="_blank"
                                                className="MessageItem-social-item">
                                                <FontAwesomeIcon icon={ faOdnoklassniki } />
                                            </a>
                                            :
                                            ''
                                    }
                                    {
                                        user_info.vk
                                            ?
                                            <a  href={ user_info.info_vk_link } title="Vk" target="_blank"
                                                className="MessageItem-social-item">
                                                <FontAwesomeIcon icon={ faVk } />
                                            </a>
                                            :
                                            ''
                                    }
                                    {
                                        user_info.youtube
                                            ?
                                            <a  href={ user_info.info_youtube_link } title="Youtube" target="_blank"
                                                className="MessageItem-social-item">
                                                <FontAwesomeIcon icon={ faYoutube } />
                                            </a>
                                            :
                                            ''
                                    }
                                    {
                                        user_info.twitter
                                            ?
                                            <a  href={ user_info.info_twitter_link } title="Twitter" target="_blank"
                                                className="MessageItem-social-item">
                                                <FontAwesomeIcon icon={ faTwitter } />
                                            </a>
                                            :
                                            ''
                                    }
                                </div>
                                <div className="user-info-messengers-block">
                                    {
                                        user_info.skype
                                            ?
                                            <span data-info={ user_info.info_skype } title="Skype"
                                                  className="MessageItem-social-item">
                                <FontAwesomeIcon icon={ faSkype } />
                            </span>
                                            :
                                            ''
                                    }
                                    {
                                        user_info.telegram
                                            ?
                                            <span data-info={ user_info.info_telegram } title="Telegram"
                                                  className="MessageItem-social-item">
                                <FontAwesomeIcon icon={ faTelegram } />
                            </span>
                                            :
                                            ''
                                    }
                                    {
                                        user_info.whatsapp
                                            ?
                                            <span data-info={ user_info.info_whatsapp } title="Whatsapp"
                                                  className="MessageItem-social-item">
                                <FontAwesomeIcon icon={ faWhatsapp } />
                            </span>
                                            :
                                            ''
                                    }
                                    {
                                        user_info.viber
                                            ?
                                            <span data-info={ user_info.info_viber } title="Viber" className="MessageItem-social-item">
                                <FontAwesomeIcon icon={ faViber } />
                            </span>
                                            :
                                            ''
                                    }
                                </div>




                            </div>
                            <div className="user-info-data">
                                <ul className="user-info-data-list">
                                    { user_info.email ? <li>Эл. почта: <span className="strong">{ user_info.email }</span></li> : '' }
                                    { user_info.sex_title ? <li>Пол: <span className="strong">{ user_info.sex_title }</span></li> : '' }
                                    { user_info.residence ? <li>Место жительства: <span className="strong">{ user_info.residence }</span></li> : '' }
                                    {
                                        user_info.birthday && (user_info.day_birthday === 1 || user_info.yar_birthday === 1)
                                            ?
                                            <li>
                                                Дата рождения:&nbsp;
                                                <span className="strong">
                                                    { user_info.day_birthday === 1 ? Moment(user_info.birthday).format('DD MMM') : '' }
                                                    { user_info.day_birthday === 1 && user_info.yar_birthday === 1 ? ' ' : '' }
                                                    { user_info.yar_birthday === 1 ? Moment(user_info.birthday).format('YYYY') : '' }
                                                    &nbsp;
                                                    { user_info.yar_birthday === 1 ? '(' + age + ')' : '' }
                                                </span>
                                            </li>
                                            :
                                            ''
                                    }
                                    <li>Отправил(а) сообщений: <span className="strong">{ user_info.user_posts }</span></li>
                                    { user_info.created_at ? <li>Дата регистрации: <span className="strong">{ Moment(user_info.created_at, 'DD.MM.YYYY').format('DD MMM YYYY') }</span></li> : '' }
                                </ul>
                                {
                                    user_info.info
                                        ?
                                        <div className="user-info">
                                            <label> О себе</label>
                                            <div>
                                                { user_info.info }
                                            </div>
                                        </div>
                                        :
                                        ''
                                }
                            </div>
                        </div>



                    </div>
                </div>
            </React.Fragment>
            :
            <div>пусто</div>
    );
};

const mapStateToProps = (state) => {
    return {
        user_info: state.userInfoReducer.user_info,
    }
};

export default connect(mapStateToProps, {  })(UserI);