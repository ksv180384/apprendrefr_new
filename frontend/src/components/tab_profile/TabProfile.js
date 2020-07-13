import React, { Component } from 'react';
import { connect } from 'react-redux';

import { store as storeNotification } from 'react-notifications-component';
import { updateProfile } from '../../store/actions/propfileActions';
import { setLoader } from '../../store/actions/loaderActions';
//import { getPage } from '../../store/actions/pageActions';
import { config } from '../../config';
import store from "../../store";

import DatePicker, { registerLocale } from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.min.css';
import  ru  from 'date-fns/locale/ru';
registerLocale("ru", ru);

import BtnDropdown from "../btn_dropdown/BtnDropdown";
import BtnLoad from "../btn_load/BtnLoad";
import TextBtn from "../text_btn/TextBtn";
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

        this.showErrorMessage = (arr_error_message) => {
            // формируем текст ошибки
            let error_message = '';
            if(typeof arr_error_message === 'object'){
                for (let key in arr_error_message){
                    for (let k in arr_error_message[key]){
                        // Помечам поля с ошибками
                        document.querySelector('input[name="' + key + '"]').parentNode.classList.add('error');
                        error_message += '* ' + arr_error_message[key][k] + "\n";
                    }
                }
            }else{
                error_message = arr_error_message;
            }

            storeNotification.addNotification({
                title: "Ошибка",
                message: error_message,
                type: "danger",
                insert: "top",
                container: "top-right",
                animationIn: ["animated", "fadeIn"],
                animationOut: ["animated", "fadeOut"],
                dismiss: {
                    duration: 10000,
                    showIcon: true,
                    onScreen: true
                }
            });
        };

        this.showSuccessMessage= (success_message) => {

            storeNotification.addNotification({
                title: "Оповещение",
                message: success_message,
                type: 'success',
                insert: 'top',
                container: 'top-right',
                animationIn: ['animated', 'fadeIn'],
                animationOut: ['animated', 'fadeOut'],
                dismiss: {
                    duration: 10000,
                    showIcon: true,
                    onScreen: true
                }
            });
        };
    }

    /*
    componentWillReceiveProps(nextProps){
        // Если при отправке формы регистрации произошла ошибка, то ловим ее тут
        // Формируем текст ошибки и показываем оповещение
        if(nextProps.profile_state.error){
            this.showErrorMessage(nextProps.profile_state.error_message);
        }
        if(nextProps.profile_state.success){
            this.showSuccessMessage(nextProps.profile_state.message);
        }
    }
    */

    render(){
        const { user } = this.props;
        const { loading } = this.props.profile_state;
        const { sex_list, config_user_data_view_list } = this.props.page;
        const { birthday } = this.state;

        return(
            sex_list
                ?
            <div className="TabProfile">
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
                                                     selectItem={ user.sex_id }
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
                                <TextBtn title="youtube.com/"
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
        page: state.pageDataReducer,
        load: state.loaderReducer,
        profile_state: state.profileReducer,
    }
};

export default connect(mapStateToProps, { updateProfile, setLoader })(TabProfile);