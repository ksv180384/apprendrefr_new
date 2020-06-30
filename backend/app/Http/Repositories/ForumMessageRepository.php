<?php
namespace App\Repositories;

use App\Models\Forum\Message as Model;
use Carbon\Carbon;

/**
 * Хранилище запросов к таблице forum_messages
 * Class ForumMessageRepository
 * @package App\Repositories
 */
class ForumMessageRepository extends CoreRepository
{

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

    public function getByTopicId(int $topic_id){
        $messages = $this->startConditions()
            ->select([
                'forum_messages.id',
                'forum_messages.message',
                'forum_messages.created_at',
                'forum_messages.user_id',
                'users.login AS user_login',
                'users.avatar AS user_avatar',
                'users.sex AS user_sex_id',
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
                'user_configs.facebook AS config_day_birthday',
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
            ->where('forum_messages.topic_id', '=', $topic_id)
            ->where('forum_message_status.alias', '<>', 'hidden')
            ->orderBy('forum_messages.created_at', 'ASC')
            ->paginate(2);

        foreach ($messages as $k=>$item){
            if(!empty($messages[$k]->user_avatar)){
                $messages[$k]->user_avatar = asset('/storage/' . $messages[$k]->user_avatar);
            }else{
                $messages[$k]->user_avatar = asset('/img/none_avatar.png');
            }

            if(!empty($messages[$k]->created_at)){
                $messages[$k]->created_at = Carbon::createFromFormat('Y-m-d H:i:s', $item->created_at)->format('H:i d.m.Y');
            }
        }

        return $messages;
    }
}