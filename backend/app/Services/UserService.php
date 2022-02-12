<?php

namespace App\Services;

use App\Models\User;

class UserService {

    /**
     * Получает заданное количество случайных слов
     * @param int $id - идентификатор пользователя
     * @return mixed
     */
    public function getById(int $id){
        $user = User::select([
                'users.id',
                'users.login',
                'users.email',
                'users.email_verified_at',
                'users.send_verified_email_at',
                'users.avatar',
                'users.birthday',
                'users.info',
                'users.signature',
                'users.residence',
                'users.admin',
                'users.confirm_token',
                'users.created_at',
                'users.updated_at',
                'user_configs.day_birthday',
                'user_configs.yar_birthday',
                'email_view.id AS email_view_id',
                'email_view.title AS email_view_title',
                'email_view.alias AS email_view_alias',
                'facebook_view.id AS facebook_view_id',
                'facebook_view.title AS facebook_view_title',
                'facebook_view.alias AS facebook_view_alias',
                'skype_view.id AS skype_view_id',
                'skype_view.title AS skype_view_title',
                'skype_view.alias AS skype_view_alias',
                'twitter_view.id AS twitter_view_id',
                'twitter_view.title AS twitter_view_title',
                'twitter_view.alias AS twitter_view_alias',
                'vk_view.id AS vk_view_id',
                'vk_view.title AS vk_view_title',
                'vk_view.alias AS vk_view_alias',
                'odnoklassniki_view.id AS odnoklassniki_view_id',
                'odnoklassniki_view.title AS odnoklassniki_view_title',
                'odnoklassniki_view.alias AS odnoklassniki_view_alias',
                'telegram_view.id AS telegram_view_id',
                'telegram_view.title AS telegram_view_title',
                'telegram_view.alias AS telegram_view_alias',
                'whatsapp_view.id AS whatsapp_view_id',
                'whatsapp_view.title AS whatsapp_view_title',
                'whatsapp_view.alias AS whatsapp_view_alias',
                'viber_view.id AS viber_view_id',
                'viber_view.title AS viber_view_title',
                'viber_view.alias AS viber_view_alias',
                'instagram_view.id AS instagram_view_id',
                'instagram_view.title AS instagram_view_title',
                'instagram_view.alias AS instagram_view_alias',
                'youtube_view.id AS youtube_view_id',
                'youtube_view.title AS youtube_view_title',
                'youtube_view.alias AS youtube_view_alias',
                'info_view.id AS info_view_id',
                'info_view.title AS info_view_title',
                'info_view.alias AS info_view_alias',
                'residence_view.id AS residence_view_id',
                'residence_view.title AS residence_view_title',
                'residence_view.alias AS residence_view_alias',
                'sex_view.id AS sex_view_id',
                'sex_view.title AS sex_view_title',
                'sex_view.alias AS sex_view_alias',
                'i.facebook AS facebook',
                'i.skype AS skype',
                'i.twitter AS twitter',
                'i.vk AS vk',
                'i.odnoklassniki AS odnoklassniki',
                'i.telegram AS telegram',
                'i.whatsapp AS whatsapp',
                'i.viber AS viber',
                'i.instagram AS instagram',
                'i.youtube AS youtube',
                'sex.id AS sex_id',
                'sex.title AS sex_title',
                'rangs.id AS rang_id',
                'rangs.title AS rang_title',
                'rangs.alias AS rang_alias',
                \DB::raw('(SELECT COUNT(*) FROM forum_messages AS m WHERE m.user_id = users.id) AS user_posts'),
            ])
            ->join('user_configs', 'user_configs.user_id', '=', 'users.id')
            ->join('user_configs_view AS email_view', 'email_view.id', '=', 'user_configs.email')
            ->join('user_configs_view AS facebook_view', 'facebook_view.id', '=', 'user_configs.facebook')
            ->join('user_configs_view AS skype_view', 'skype_view.id', '=', 'user_configs.skype')
            ->join('user_configs_view AS twitter_view', 'twitter_view.id', '=', 'user_configs.twitter')
            ->join('user_configs_view AS vk_view', 'vk_view.id', '=', 'user_configs.vk')
            ->join('user_configs_view AS odnoklassniki_view', 'odnoklassniki_view.id', '=', 'user_configs.odnoklassniki')
            ->join('user_configs_view AS telegram_view', 'telegram_view.id', '=', 'user_configs.telegram')
            ->join('user_configs_view AS whatsapp_view', 'whatsapp_view.id', '=', 'user_configs.whatsapp')
            ->join('user_configs_view AS viber_view', 'viber_view.id', '=', 'user_configs.viber')
            ->join('user_configs_view AS instagram_view', 'instagram_view.id', '=', 'user_configs.instagram')
            ->join('user_configs_view AS youtube_view', 'youtube_view.id', '=', 'user_configs.youtube')
            ->join('user_configs_view AS info_view', 'info_view.id', '=', 'user_configs.info')
            ->join('user_configs_view AS residence_view', 'residence_view.id', '=', 'user_configs.residence')
            ->join('user_configs_view AS sex_view', 'sex_view.id', '=', 'user_configs.sex')
            ->join('user_infos AS i', 'i.user_id', '=', 'users.id')
            ->leftJoin('sex', 'sex.id', '=', 'users.sex')
            ->join('rangs', 'rangs.id', '=', 'users.rang')
            ->where('users.id', '=', $id)
            ->first();

        $config_view = self::userConfigsView();
        $user = self::initAliasInfoView($user, $config_view);
        $user = $this->filterInfo($this->formatSocialLinks($user));

        return $user;
    }

    /**
     * Получаем количество зарегистрированных пользователей
     * @return int
     */
    public function countUsersRegister(){
        $usersCount = User::whereNotNull('email_verified_at')->count();

        return $usersCount;
    }
}
