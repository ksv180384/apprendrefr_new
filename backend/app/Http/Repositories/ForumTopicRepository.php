<?php
namespace App\Repositories;

use App\Models\Forum\Topic as Model;
use Carbon\Carbon;

/**
 * Хранилище запросов к таблице forum_topics
 * Class ForumTopicRepository
 * @package App\Repositories
 */
class ForumTopicRepository extends CoreRepository
{

    /**
     * Отдает управляемый класс
     * @return string
     */
    public function getModelClass()
    {
        return Model::class;
    }

    /**
     * Получаем последние активные темы форума
     * @return mixed
     */
    public function getLastActiveTopics(){
        $topics = $this->startConditions()
             ->select([
                 'forum_forums.id AS forum_id',
                 'forum_forums.title AS forum_title',
                 'forum_topics.id',
                 'forum_topics.title',
                 'forum_topics.count_views',
                 'forum_topics.status',
                 'forum_topics.created_at',
                 'users.id AS topic_create_user_id',
                 'users.login AS topic_create_user_login',
                 'users.rang AS topic_create_user_rang',
                 'forum_statuses.title AS status_topic_title',
                 'forum_statuses.alias AS status_topic_alias',
                 'users.id AS message_create_user_id',
                 'users.login AS message_create_user_login',
                 'users.rang AS message_create_user_rang',
                 'forum_messages.created_at AS message_created_at',
                 \DB::raw('(SELECT COUNT(*) FROM forum_messages WHERE topic_id = forum_topics.id) AS count_messages'),
             ])
             ->join('forum_forums', 'forum_topics.forum_id', '=', 'forum_forums.id')
             ->join('users', 'forum_topics.user_id', '=', 'users.id')
             ->leftJoin('forum_messages', 'forum_topics.last_message_id', '=', 'forum_messages.id')
             ->join('forum_statuses', 'forum_topics.status', '=', 'forum_statuses.id')
             //->join('forum_messages AS m', 'users.id', '=', 'm.user_id')
             ->orderBy('message_created_at', 'DESC')
             ->limit(20)
             ->get();

        foreach ($topics as $k=>$item){
            if(!empty($topics[$k]->message_created_at)){
                $topics[$k]->message_created_at = Carbon::createFromFormat('Y-m-d H:i:s', $item->message_created_at)->format('H:i d.m.Y');
            }
        }

        return $topics;
    }
}