import React, { Component } from 'react';
import BtnDropdown from "../btn_dropdown/BtnDropdown";

//import index from "../../store/store";
//import { loadPage } from "../../store/actions";

import DatePicker, { registerLocale } from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.min.css';
import  ru  from 'date-fns/locale/ru';
registerLocale("ru", ru);

import BtnLoad from "../btn_load/BtnLoad";
import { faFacebook, faSkype, faTwitter, faVk, faOdnoklassniki,
    faTelegram, faWhatsapp, faViber, faYoutube, faInstagram } from '@fortawesome/free-brands-svg-icons';
import TextBtn from "../text_btn/TextBtn";

import Axios from "axios/index";
Axios.defaults.headers.common = {
    'Authorization':localStorage.getItem('user-token'),
};

import './TabProfile.css';

class TabProfile extends Component{

    constructor(props){
        super(props);
/*
        this.state = {
            avatarImg: null,
            avatar: index.getState().page_data.user.avatar,
            email: index.getState().page_data.user.email,
            sex: index.getState().page_data.user.sex_id,
            birthday: index.getState().page_data.user.birthday, // дата рождения
            info: index.getState().page_data.user.info, // информация о себе
            signature: index.getState().page_data.user.signature, // Подпись отображается под сообщениями форума
            residence: index.getState().page_data.user.residence, // Место жительства
            day_birthday: index.getState().page_data.user.day_birthday, // Показывать число и месяц рождения
            yar_birthday: index.getState().page_data.user.yar_birthday, // Показывать год рождения (возрост)
            loadFormLoginUser: false,
        };
        */

        this.handleChange = date => {
            this.setState({
                birthday: date
            });
        };

        this.handleChangeCheckbox = (e) => {
            this.setState({[e.target.name]: !this.state[e.target.name]});
        };

        this.handleChangeInputText = (e) => {
            this.setState({[e.target.name]: e.target.value});
        };

        this.handleChangeBtnDropdown = (e) => {
            this.setState({[e.name]: e.value === 0 ? null : e.value});
            console.log(e);
        };

        this.changeAvatar = (e) => {
            let imgAvatar = e.target.files[0],     // Берём первый файл
                fileRender = new FileReader(); // Создаём объект чтения файлов

            if(imgAvatar.size > 7340032){
                alert('Аватар не должен привышать 7 Мб');
                return true;
            }
            /*
            index.dispatch(loadPage({ load: true }));
            fileRender.onload = (e) => {
                index.dispatch(loadPage({ load: false }));
                this.setState({avatarImg: e.target.result});
                document.querySelector('.upload-avatar-block').style.backgroundImage='url(' + e.target.result + ')';
            };
            fileRender.readAsDataURL(imgAvatar); // Читаем blob выбранного файла
            */
        };

        this.handleSubmit = (e) => {
            e.preventDefault();
/*
            this.setState({ loadFormLoginUser: true });

            // Получаем url для отправки формы
            const url = event.target.attributes.getNamedItem('action').value;

            // Загружаем данные формы
            let formData = new FormData(document.querySelector('#formProfile'));

            index.dispatch(loadPage({ load: true }));
            Axios.post(url, formData)
                .then((response) => {

                    index.dispatch(loadPage({ load: false }));
                    this.setState({ loadFormLoginUser: false });
                })
                .catch((error) => {
                    index.dispatch(loadPage({ load: false }));
                    this.setState({ loadFormLoginUser: false });
                });
                */
        };
    }

    render(){

        const { avatar, sex, birthday, info, signature, residence, day_birthday, yar_birthday, email, loadFormLoginUser } = this.state;
        //const { api_path } = index.getState();
        //const { sex_list, user, config_user_data_view_list } = index.getState().page_data;
        const api_path = '';
        const sex_list = {};
        const user = {};
        const config_user_data_view_list = {};

        return(
            <div className="TabProfile">
                <form action={ api_path + '/api/user/update/' + user.id }
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
                                         style={ {backgroundImage: 'url('+ avatar +')'} }
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
                                                   onChange={ this.handleChangeInputText }
                                                   defaultValue={ email }
                                            />
                                        </div>
                                    </div>

                                    <div className="mb-10 inline-block">
                                        <BtnDropdown title="Пол"
                                                     name="sex"
                                                     selectItem={ sex }
                                                     selectList={ sex_list }
                                                     onChange={ this.handleChangeBtnDropdown }/>
                                    </div>

                                    <div className="mb-10">
                                        <div className="input-group">
                                            <label>Город</label>
                                            <input type="text"
                                                   placeholder="Место жительства"
                                                   name="residence"
                                                   onChange={ this.handleChangeInputText }
                                                   defaultValue={ residence }
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
                                                   defaultChecked={ day_birthday }
                                                   onChange={ this.handleChangeCheckbox }
                                            />
                                            <span></span>
                                            <label htmlFor="remember">Показывать день и месяц рождения </label>
                                        </div>
                                    </div>
                                    <div className="mt-5">
                                        <div className="checkbox-apr">
                                            <input type="checkbox"
                                                   name="yar_birthday"
                                                   defaultChecked={ yar_birthday }
                                                   onChange={ this.handleChangeCheckbox }
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
                                              defaultValue={ info }
                                              onChange={ this.handleChangeInputText }
                                    ></textarea>
                                </div>
                                <div className="profile-textarea-block">
                                    <label>Подпись</label>
                                    <textarea className="text-full"
                                              placeholder="Подпись. Этот текст будет отображаться под каждым вашим сообщением оставленном на форуме.
    Запрещается размещать подпись рекламного характера: куплю-продам, посетите наш сайт и т.п. без согласования с администрацией;"
                                              name="signature"
                                              defaultValue={ signature }
                                              onChange={ this.handleChangeInputText }
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
                                        <BtnDropdown title="Email" name="email_view" selectItem={ user.email_view_id }
                                                     selectList={ config_user_data_view_list }/>
                                    </div>
                                    <div className="pt-5 pr-5">
                                        <BtnDropdown title="О себе" name="info_view" selectItem={ user.info_view_id }
                                                     selectList={ config_user_data_view_list }/>
                                    </div>
                                </div>
                                <div className="w-50">
                                    <div className="pb-5 pl-5">
                                        <BtnDropdown title="Место жительства" name="residence_view" selectItem={ user.residence_view_id }
                                                     selectList={ config_user_data_view_list }/>
                                    </div>
                                    <div className="pt-5 pl-5">
                                        <BtnDropdown title="Пол" name="sex_view" selectItem={ user.sex_view_id }
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
                                         defaultValue={ user.facebook }
                                         selectItem={ user.facebook_view_id }
                                         selectList={ config_user_data_view_list }
                                />
                            </div>
                            <div className="UserProfileEdit-contacts-item">
                                <TextBtn title="ok.ru/"
                                         icon={ faOdnoklassniki }
                                         type="text"
                                         placeholder="Однокласники"
                                         name="odnoklassniki"
                                         defaultValue={ user.odnoklassniki }
                                         selectItem={ user.odnoklassniki_view_id }
                                         selectList={ config_user_data_view_list }
                                />
                            </div>
                            <div className="UserProfileEdit-contacts-item">
                                <TextBtn title="twitter.com/"
                                         icon={ faTwitter }
                                         type="text"
                                         placeholder="Twitter"
                                         name="twitter"
                                         defaultValue={ user.twitter }
                                         selectItem={ user.twitter_view_id }
                                         selectList={ config_user_data_view_list }
                                />
                            </div>
                            <div className="UserProfileEdit-contacts-item">
                                <TextBtn title="vk.com/"
                                         icon={ faVk }
                                         type="text"
                                         placeholder="Вконтакте"
                                         name="vk"
                                         defaultValue={ user.vk }
                                         selectItem={ user.vk_view_id }
                                         selectList={ config_user_data_view_list }
                                />
                            </div>
                            <div className="UserProfileEdit-contacts-item">
                                <TextBtn title="youtube.com/channel/"
                                         icon={ faYoutube }
                                         type="text"
                                         placeholder="Youtube"
                                         name="youtube"
                                         defaultValue={ user.youtube }
                                         selectItem={ user.youtube_view_id }
                                         selectList={ config_user_data_view_list }
                                />
                            </div>



                            <div className="UserProfileEdit-contacts-item">
                                <TextBtn title="instagram.com/"
                                         icon={ faInstagram }
                                         type="text"
                                         placeholder="Instagram"
                                         name="instagram"
                                         defaultValue={ user.instagram }
                                         selectItem={ user.instagram_view_id }
                                         selectList={ config_user_data_view_list }
                                />
                            </div>
                            <div className="UserProfileEdit-contacts-item">
                                <TextBtn title=""
                                         icon={ faSkype }
                                         type="text"
                                         placeholder="Skype"
                                         name="skype"
                                         defaultValue={ user.skype }
                                         selectItem={ user.skype_view_id }
                                         selectList={ config_user_data_view_list }
                                />
                            </div>
                            <div className="UserProfileEdit-contacts-item">
                                <TextBtn title=""
                                         icon={ faTelegram }
                                         type="text"
                                         placeholder="Telegram"
                                         name="telegram"
                                         defaultValue={ user.telegram }
                                         selectItem={ user.telegram_view_id }
                                         selectList={ config_user_data_view_list }
                                />
                            </div>
                            <div className="UserProfileEdit-contacts-item">
                                <TextBtn title=""
                                         icon={ faWhatsapp }
                                         type="text"
                                         placeholder="Whatsapp"
                                         name="whatsapp"
                                         defaultValue={ user.whatsapp }
                                         selectItem={ user.whatsapp_view_id }
                                         selectList={ config_user_data_view_list }
                                />
                            </div>
                            <div className="UserProfileEdit-contacts-item">
                                <TextBtn title=""
                                         icon={ faViber }
                                         type="text"
                                         placeholder="Viber"
                                         name="viber"
                                         defaultValue={ user.viber }
                                         selectItem={ user.viber_view_id }
                                         selectList={ config_user_data_view_list }
                                />
                            </div>




                        </div>
                    </div>



                    <div className="mt-20 text-center">
                        <BtnLoad load={ loadFormLoginUser } type="submit" title="Сохранить"/>
                    </div>
                </form>
            </div>
        );
    }
}

export default TabProfile;