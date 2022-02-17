import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';

import { updateProfile } from '../../store/actions/propfileActions';
import { setLoader } from '../../store/actions/loaderActions';

import { config } from '../../config';
import store from "../../store";

import DatePicker, { registerLocale } from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.min.css';
import  ru  from 'date-fns/locale/ru';
registerLocale("ru", ru);

// components
import BtnDropdown from "../btn_dropdown/BtnDropdown";
import BtnLoad from "../btn_load/BtnLoad";
import TextBtn from "../text_btn/TextBtn";
import NotificationConfirmRegistration from './NotificationConfirmRegistration';
import { faFacebook, faSkype, faTwitter, faVk, faOdnoklassniki,
    faTelegram, faWhatsapp, faViber, faYoutube, faInstagram } from '@fortawesome/free-brands-svg-icons';

import './TabProfile.css';

class TabProfile extends Component{

    constructor(props){
        super(props);

        this.state = {
            birthday: this.props.user.birthday,
        };


        this.handleChange = date => {
            this.setState({
                birthday: date
            });
        };


        this.changeAvatar = (e) => {
            let imgAvatar = e.target.files[0],     // Берём первый файл
                fileRender = new FileReader(); // Создаём объект чтения файлов

            if(imgAvatar.size > 7340032){
                alert('Аватар не должен привышать 7 Мб');
                return true;
            }

            store.dispatch(setLoader(true));
            fileRender.onload = (e) => {
                store.dispatch(setLoader(false));
                this.setState({avatarImg: e.target.result});
                document.querySelector('.upload-avatar-block').style.backgroundImage='url(' + e.target.result + ')';
            };
            fileRender.readAsDataURL(imgAvatar); // Читаем blob выбранного файла

        };

        this.handleSubmit = (e) => {
            e.preventDefault();

            // Загружаем данные формы
            let formData = new FormData(e.target);

            this.props.updateProfile(formData, this.props.user.id);

        };
    }

    render(){
        const { user } = this.props;
        const { loading } = this.props.profile_state;
        const { sex_list, config_user_data_view_list } = this.props.page;
        const { birthday } = this.state;

        return(
            typeof user.id === "undefined"
                ?
                    <Redirect to="/" />
                :
            sex_list
                ?
            <div className="TabProfile">
                {
                    !user.email_verified_at
                        ?
                        <NotificationConfirmRegistration/>
                        :
                        ''
                }
                <form action={ config.path + 'api/user/update/' + user.id }
                      id="formProfile"
                      method="post"
                      onSubmit={ this.handleSubmit }
                      encType="multipart/form-data"
                >

                    <div className="profile-edit-block">
                        <div className="profile-edit-user-data-block">
                            <div className="header-dashed mb-10">
                                Профиль
                            </div>
                            <div className="profile-edit-user-data-block-item">
                                <div className="profile-edit-avatar">
                                    <div className="upload-avatar-block"
                                         style={ {backgroundImage: 'url('+ user.avatar +')'} }
                                         title="Загрузить аватар"
                                         onClick={ (e) => { e.currentTarget.querySelector('input[name="avatarImg"]').click() } }
                                    >
                                        <input type="file"
                                               name="avatarImg"
                                               accept="image/jpeg,image/png,image/gif"
                                               onChange={ this.changeAvatar }
                                        />
                                    </div>
                                </div>
                                <div className="profile-edit-data">

                                    <div className="mb-10">
                                        <div className="input-group">
                                            <label>email</label>
                                            <input type="text"
                                                   placeholder="email"
                                                   name="email"
                                                   defaultValue={ user.email }
                                            />
                                        </div>
                                    </div>

                                    <div className="mb-10 inline-block">
                                        <BtnDropdown title="Пол"
                                                     name="sex"
                                                     selectItem={ user.sex.id }
                                                     selectList={ sex_list }
                                        />
                                    </div>

                                    <div className="mb-10">
                                        <div className="input-group">
                                            <label>Город</label>
                                            <input type="text"
                                                   placeholder="Место жительства"
                                                   name="residence"
                                                   defaultValue={ user.residence }
                                            />
                                        </div>
                                    </div>

                                    <div>
                                        <div className="input-group">
                                            <label>Дата рождения</label>
                                            <DatePicker
                                                selected={ birthday ? new Date( birthday ) : null }
                                                dateFormat="dd.MM.yyyy"
                                                onChange={ this.handleChange }
                                                showMonthDropdown
                                                showYearDropdown
                                                dropdownMode="select"
                                                locale="ru"
                                                name="birthday"
                                                autoComplete="off"
                                            />
                                        </div>
                                    </div>

                                    <div className="mt-10">
                                        <div className="checkbox-apr">
                                            <input type="checkbox"
                                                   name="day_birthday"
                                                   defaultChecked={ user.day_birthday }
                                            />
                                            <span></span>
                                            <label htmlFor="remember">Показывать день и месяц рождения </label>
                                        </div>
                                    </div>
                                    <div className="mt-5">
                                        <div className="checkbox-apr">
                                            <input type="checkbox"
                                                   name="yar_birthday"
                                                   defaultChecked={ user.yar_birthday }
                                            />
                                            <span></span>
                                            <label htmlFor="remember">Показывать год рождения (возраст)</label>
                                        </div>
                                    </div>

                                </div>
                            </div>
                            <div className="profile-edit-user-data-block-item">
                                <div className="profile-textarea-block">
                                    <label>О себе</label>
                                    <textarea className="text-full"
                                              name="info"
                                              placeholder="О себе"
                                              defaultValue={ user.info }
                                    ></textarea>
                                </div>
                                <div className="profile-textarea-block">
                                    <label>Подпись</label>
                                    <textarea className="text-full"
                                              placeholder="Подпись. Этот текст будет отображаться под каждым вашим сообщением оставленном на форуме.
    Запрещается размещать подпись рекламного характера: куплю-продам, посетите наш сайт и т.п. без согласования с администрацией;"
                                              name="signature"
                                              defaultValue={ user.signature }
                                    ></textarea>
                                </div>
                            </div>
                        </div>

                        <div className="profile-edit-user-contact-block">
                            <div className="header-dashed mb-10">
                                Контакты
                            </div>
                            <div className="mb-40">
                                <div className="w-50">
                                    <div className="pb-5 pr-5">
                                        <BtnDropdown title="Email" name="email_view" selectItem={ user.config.email }
                                                     selectList={ config_user_data_view_list }/>
                                    </div>
                                    <div className="pt-5 pr-5">
                                        <BtnDropdown title="О себе" name="info_view" selectItem={ user.config.info }
                                                     selectList={ config_user_data_view_list }/>
                                    </div>
                                </div>
                                <div className="w-50">
                                    <div className="pb-5 pl-5">
                                        <BtnDropdown title="Место жительства" name="residence_view" selectItem={ user.config.residence }
                                                     selectList={ config_user_data_view_list }/>
                                    </div>
                                    <div className="pt-5 pl-5">
                                        <BtnDropdown title="Пол" name="sex_view" selectItem={ user.config.sex }
                                                     selectList={ config_user_data_view_list }/>
                                    </div>
                                </div>
                            </div>


                            <div className="UserProfileEdit-contacts-item">
                                <TextBtn title="fb.com/"
                                         icon={ faFacebook }
                                         type="text"
                                         placeholder="Facebook"
                                         name="facebook"
                                         defaultValue={ user.infos.facebook }
                                         selectItem={ user.config.facebook }
                                         selectList={ config_user_data_view_list }
                                />
                            </div>
                            <div className="UserProfileEdit-contacts-item">
                                <TextBtn title="ok.ru/"
                                         icon={ faOdnoklassniki }
                                         type="text"
                                         placeholder="Однокласники"
                                         name="odnoklassniki"
                                         defaultValue={ user.infos.odnoklassniki }
                                         selectItem={ user.config.odnoklassniki }
                                         selectList={ config_user_data_view_list }
                                />
                            </div>
                            <div className="UserProfileEdit-contacts-item">
                                <TextBtn title="twitter.com/"
                                         icon={ faTwitter }
                                         type="text"
                                         placeholder="Twitter"
                                         name="twitter"
                                         defaultValue={ user.infos.twitter }
                                         selectItem={ user.config.twitter }
                                         selectList={ config_user_data_view_list }
                                />
                            </div>
                            <div className="UserProfileEdit-contacts-item">
                                <TextBtn title="vk.com/"
                                         icon={ faVk }
                                         type="text"
                                         placeholder="Вконтакте"
                                         name="vk"
                                         defaultValue={ user.infos.vk }
                                         selectItem={ user.config.vk }
                                         selectList={ config_user_data_view_list }
                                />
                            </div>
                            <div className="UserProfileEdit-contacts-item">
                                <TextBtn title="youtube.com/"
                                         icon={ faYoutube }
                                         type="text"
                                         placeholder="Youtube"
                                         name="youtube"
                                         defaultValue={ user.infos.youtube }
                                         selectItem={ user.config.youtube }
                                         selectList={ config_user_data_view_list }
                                />
                            </div>



                            <div className="UserProfileEdit-contacts-item">
                                <TextBtn title="instagram.com/"
                                         icon={ faInstagram }
                                         type="text"
                                         placeholder="Instagram"
                                         name="instagram"
                                         defaultValue={ user.infos.instagram }
                                         selectItem={ user.config.instagram }
                                         selectList={ config_user_data_view_list }
                                />
                            </div>
                            <div className="UserProfileEdit-contacts-item">
                                <TextBtn title=""
                                         icon={ faSkype }
                                         type="text"
                                         placeholder="Skype"
                                         name="skype"
                                         defaultValue={ user.infos.skype }
                                         selectItem={ user.config.skype }
                                         selectList={ config_user_data_view_list }
                                />
                            </div>
                            <div className="UserProfileEdit-contacts-item">
                                <TextBtn title=""
                                         icon={ faTelegram }
                                         type="text"
                                         placeholder="Telegram"
                                         name="telegram"
                                         defaultValue={ user.infos.telegram }
                                         selectItem={ user.config.telegram }
                                         selectList={ config_user_data_view_list }
                                />
                            </div>
                            <div className="UserProfileEdit-contacts-item">
                                <TextBtn title=""
                                         icon={ faWhatsapp }
                                         type="text"
                                         placeholder="Whatsapp"
                                         name="whatsapp"
                                         defaultValue={ user.infos.whatsapp }
                                         selectItem={ user.config.whatsapp }
                                         selectList={ config_user_data_view_list }
                                />
                            </div>
                            <div className="UserProfileEdit-contacts-item">
                                <TextBtn title=""
                                         icon={ faViber }
                                         type="text"
                                         placeholder="Viber"
                                         name="viber"
                                         defaultValue={ user.infos.viber }
                                         selectItem={ user.config.viber }
                                         selectList={ config_user_data_view_list }
                                />
                            </div>




                        </div>
                    </div>

                    <div className="mt-20 text-center">
                        <BtnLoad load={ loading } type="submit" title="Сохранить"/>
                    </div>
                </form>
            </div>
                :
            <div>пусто</div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        user: state.userReducer,
        page: state.pageReducer,
        load: state.loaderReducer,
        profile_state: state.profileReducer,
    }
};

export default connect(mapStateToProps, { updateProfile, setLoader })(TabProfile);