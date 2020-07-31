<?php
namespace App\Repositories;

use App\Models\Forum\Message as Model;
use App\Models\Forum\MessageStatus;
use App\Models\User\UserConfigsView;
use Illuminate\Pagination\Paginator;

/**
 * Хранилище запросов к таблице forum_messages
 * Class ForumMessageRepository
 * @package App\Repositories
 */
class ForumMessageRepository extends CoreRepository
{

    const SHOW_PAGES = 10;

    /**
     * Отдает управляемый класс
     * @return string
     */
    public function getModelClass()
    {
        return Model::class;
    }

    public function countAll(){
        $status = \DB::table('forum_message_status')->where('alias', '=', 'visible_everyone')->first();
        $count_messages = $this->startConditions()
            ->select(\DB::raw('COUNT(*) as count'))
            ->where('status', '=', $status->id)
            ->first();

        return $count_messages->count;
    }

    /**
     * @param int $topic_id - идентификатор темы сообщений
     * @param bool $hidden_message - получать ли скрытые сообщения
     * @return mixed
     */
    public function getByTopicId(int $topic_id, $hidden_message = false){
        $messages = $this->startConditions()
            ->select([
                'forum_messages.id',
                'forum_messages.message',
                'forum_messages.created_at',
                'forum_messages.user_id',
                'users.login AS user_login',
                'users.email AS user_email',
                'users.avatar AS user_avatar',
                'users.sex AS user_sex_id',
                //'users.info AS user_info',
                'users.signature AS user_signature',
                'users.residence AS user_residence',
                'users.created_at AS user_created_at',
                'users.admin AS user_is_admin',
                'sex.title AS user_sex_title',
                'users.rang AS user_rang_id',
                'rangs.title AS user_rang_title',
                'rangs.alias AS user_rang_alias',
                'forum_message_status.title AS status_message_title',
                'forum_message_status.alias AS status_message_alias',
                'user_configs.day_birthday AS config_day_birthday',
                'user_configs.yar_birthday AS config_yar_birthday',
                'user_configs.email AS config_email',
                'user_configs.facebook AS config_facebook',
                'user_configs.skype AS config_skype',
                'user_configs.twitter AS config_twitter',
                'user_configs.vk AS config_vk',
                'user_configs.odnoklassniki AS config_odnoklassniki',
                'user_configs.telegram AS config_telegram',
                'user_configs.whatsapp AS config_whatsapp',
                'user_configs.viber AS config_viber',
                'user_configs.instagram AS config_instagram',
                'user_configs.youtube AS config_youtube',
                'user_configs.info AS config_info',
                'user_configs.residence AS config_residence',
                'user_configs.sex AS config_sex',
                'user_infos.facebook AS info_facebook',
                'user_infos.skype AS info_skype',
                'user_infos.twitter AS info_twitter',
                'user_infos.vk AS info_vk',
                'user_infos.odnoklassniki AS info_odnoklassniki',
                'user_infos.telegram AS info_telegram',
                'user_infos.whatsapp AS info_whatsapp',
                'user_infos.viber AS info_viber',
                'user_infos.instagram AS info_instagram',
                'user_infos.youtube AS info_youtube',
                \DB::raw('(SELECT COUNT(*) FROM forum_messages AS m WHERE m.user_id = forum_messages.user_id) AS user_posts'),
            ])
            ->join('users', 'users.id', '=', 'forum_messages.user_id')
            ->leftJoin('sex', 'sex.id', '=', 'users.sex')
            ->leftJoin('rangs', 'rangs.id', '=', 'users.rang')
            ->leftJoin('user_configs', 'user_configs.user_id', '=', 'users.id')
            ->leftJoin('user_infos', 'user_infos.user_id', '=', 'users.id')
            ->join('forum_message_status', 'forum_messages.status', '=', 'forum_message_status.id')
            ->where('forum_messages.topic_id', '=', $topic_id);
        if(!$hidden_message){
            $messages = $messages->where('forum_message_status.alias', '<>', 'hidden');
        }
        $messages = $messages->orderBy('forum_messages.created_at', 'ASC')
                              ->paginate(self::SHOW_PAGES);

        $config_view = $this->userConfigsView();

        foreach ($messages as $k=>$item){
            if(!empty($messages[$k]->user_avatar)){
                $messages[$k]->user_avatar = asset('/storage/' . $messages[$k]->user_avatar);
            }else{
                $messages[$k]->user_avatar = asset('/img/none_avatar.png');
            }

            if(!empty($messages[$k]->created_at)){
                $messages[$k]->created_message = [
                    'day' => $this->formatDay($messages[$k]->created_at),
                    'time' => $messages[$k]->created_at->format('H:i'),
                ];
            }

            $messages[$k] = $this->initAliasInfoView($messages[$k], $config_view);
        }

        return $messages;
    }

    public function getByTopicIdLastPage(int $topic_id, $show_hide_mess = false){
        // Получаем номер последней страницы
        $p = $this->startConditions()
            ->join('forum_message_status', 'forum_messages.status', '=', 'forum_message_status.id')
            ->where('forum_messages.topic_id', '=', $topic_id);
            if(!$show_hide_mess){
                $p = $p->where('forum_message_status.alias', '<>', 'hidden');
            }
        $p = $p->paginate(self::SHOW_PAGES);
        $lastPage = $p->lastPage();

        Paginator::currentPageResolver(function() use ($lastPage) {
            return $lastPage;
        });

        $messages = $this->startConditions()
            ->select([
                'forum_messages.id',
                'forum_messages.message',
                'forum_messages.created_at',
                'forum_messages.user_id',
                'users.login AS user_login',
                'users.email AS user_email',
                'users.avatar AS user_avatar',
                'users.sex AS user_sex_id',
                //'users.info AS user_info',
                'users.signature AS user_signature',
                'users.residence AS user_residence',
                'users.created_at AS user_created_at',
                'users.admin AS user_is_admin',
                'sex.title AS user_sex_title',
                'users.rang AS user_rang_id',
                'rangs.title AS user_rang_title',
                'rangs.alias AS user_rang_alias',
                'forum_message_status.title AS status_message_title',
                'forum_message_status.alias AS status_message_alias',
                'user_configs.day_birthday AS config_day_birthday',
                'user_configs.yar_birthday AS config_yar_birthday',
                'user_configs.email AS config_email',
                'user_configs.facebook AS config_facebook',
                'user_configs.skype AS config_skype',
                'user_configs.twitter AS config_twitter',
                'user_configs.vk AS config_vk',
                'user_configs.odnoklassniki AS config_odnoklassniki',
                'user_configs.telegram AS config_telegram',
                'user_configs.whatsapp AS config_whatsapp',
                'user_configs.viber AS config_viber',
                'user_configs.instagram AS config_instagram',
                'user_configs.youtube AS config_youtube',
                'user_configs.info AS config_info',
                'user_configs.residence AS config_residence',
                'user_configs.sex AS config_sex',
                'user_infos.facebook AS info_facebook',
                'user_infos.skype AS info_skype',
                'user_infos.twitter AS info_twitter',
                'user_infos.vk AS info_vk',
                'user_infos.odnoklassniki AS info_odnoklassniki',
                'user_infos.telegram AS info_telegram',
                'user_infos.whatsapp AS info_whatsapp',
                'user_infos.viber AS info_viber',
                'user_infos.instagram AS info_instagram',
                'user_infos.youtube AS info_youtube',
                \DB::raw('(SELECT COUNT(*) FROM forum_messages AS m WHERE m.user_id = forum_messages.user_id) AS user_posts'),
            ])
            ->join('users', 'users.id', '=', 'forum_messages.user_id')
            ->leftJoin('sex', 'sex.id', '=', 'users.sex')
            ->leftJoin('rangs', 'rangs.id', '=', 'users.rang')
            ->leftJoin('user_configs', 'user_configs.user_id', '=', 'users.id')
            ->leftJoin('user_infos', 'user_infos.user_id', '=', 'users.id')
            ->join('forum_message_status', 'forum_messages.status', '=', 'forum_message_status.id')
            ->where('forum_messages.topic_id', '=', $topic_id);
        if(!$show_hide_mess){
            $messages = $messages->where('forum_message_status.alias', '<>', 'hidden');
        }
        $messages = $messages->orderBy('forum_messages.created_at', 'ASC')
            ->paginate(self::SHOW_PAGES);

        $config_view = $this->userConfigsView();

        foreach ($messages as $k=>$item){
            if(!empty($messages[$k]->user_avatar)){
                $messages[$k]->user_avatar = asset('/storage/' . $messages[$k]->user_avatar);
            }else{
                $messages[$k]->user_avatar = asset('/img/none_avatar.png');
            }

            if(!empty($messages[$k]->created_at)){
                $messages[$k]->created_message = [
                    'day' => $this->formatDay($messages[$k]->created_at),
                    'time' => $messages[$k]->created_at->format('H:i'),
                ];
            }

            $messages[$k] = $this->initAliasInfoView($messages[$k], $config_view);
        }

        return $messages;
    }

    public function getStatusList(){
        $statuses = MessageStatus::all(['id', 'title', 'alias']);//->toArray();
        //$statuses = array_column($statuses, null, 'id');

        return $statuses;
    }

    private function userConfigsView(){
        $res = [];
        $config_view = UserConfigsView::select(['id', 'title', 'alias'])->get();

        $config_view = $config_view->toArray();
        foreach ($config_view as $item){
            $res[$item['id']] = $item;
        }
        return $res;
    }

    // добавляеи алиасы прав просмотра личной информации
    private function initAliasInfoView($message, $config_view){

        $message->config_email_alias = $config_view[$message->config_email]['alias'];
        $message->config_facebook_alias = $config_view[$message->config_facebook]['alias'];
        $message->config_skype_alias = $config_view[$message->config_skype]['alias'];
        $message->config_twitter_alias = $config_view[$message->config_twitter]['alias'];
        $message->config_vk_alias = $config_view[$message->config_vk]['alias'];
        $message->config_odnoklassniki_alias = $config_view[$message->config_odnoklassniki]['alias'];
        $message->config_telegram_alias = $config_view[$message->config_telegram]['alias'];
        $message->config_whatsapp_alias = $config_view[$message->config_whatsapp]['alias'];
        $message->config_instagram_alias = $config_view[$message->config_instagram]['alias'];
        $message->config_youtube_alias = $config_view[$message->config_youtube]['alias'];
        $message->config_viber_alias = $config_view[$message->config_viber]['alias'];
        $message->config_info_alias = $config_view[$message->config_info]['alias'];
        $message->config_residence_alias = $config_view[$message->config_residence]['alias'];
        $message->config_sex_alias = $config_view[$message->config_sex]['alias'];

        return $message;
    }
}
