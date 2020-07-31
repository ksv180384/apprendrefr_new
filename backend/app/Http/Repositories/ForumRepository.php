<?php
namespace App\Repositories;

use App\Models\Forum\Forum as Model;
use Carbon\Carbon;

/**
 * Хранилище запросов к таблице forum_forums
 * Class ForumRepository
 * @package App\Repositories
 */
class ForumRepository extends CoreRepository
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
     * Получает данные форума
     * @param int $id - идентификатоор форума
     * @return mixed
     */
    public function getById(int $id){
        $forum = $this->startConditions()
            ->select([
                'forum_forums.id',
                'forum_forums.title',
                'forum_topics.id AS topic_id',
                'forum_topics.title AS topic_title',
                'forum_statuses.title AS status_forum_title',
                'forum_statuses.alias AS status_forum_alias',
                'users.id AS message_create_user_id',
                'users.login AS message_create_user_login',
                'users.rang AS message_create_user_rang',
                'forum_messages.created_at AS message_created_at',
                \DB::raw('(SELECT COUNT(*) FROM forum_messages WHERE topic_id IN (
                                        SELECT `id` FROM `forum_topics` WHERE `forum_id` = forum_forums.`id` AND status <> 3
                                 ) AND forum_messages.`status` = 1) AS count_messages'),
                \DB::raw('(SELECT COUNT(*) FROM forum_topics WHERE forum_id = forum_forums.id AND status <> 3) AS count_topics'),
            ])
            ->leftJoin('forum_messages', 'forum_forums.last_message_id', '=', 'forum_messages.id')
            ->leftJoin('forum_topics', 'forum_topics.id', '=', 'forum_messages.topic_id')
            ->leftJoin('users', 'forum_messages.user_id', '=', 'users.id')
            ->join('forum_statuses', 'forum_forums.status', '=', 'forum_statuses.id')
            ->orderBy('forum_forums.sort', 'ASC')
            ->where('forum_forums.id', '=', $id)
            ->first();

        return $forum;
    }

    public function getList(){
        $forums = $this->startConditions()
            ->select([
                'forum_forums.id',
                'forum_forums.title',
                'forum_topics.id AS topic_id',
                'forum_topics.title AS topic_title',
                'forum_statuses.title AS status_forum_title',
                'forum_statuses.alias AS status_forum_alias',
                'users.id AS message_create_user_id',
                'users.login AS message_create_user_login',
                'users.rang AS message_create_user_rang',
                'forum_messages.created_at AS message_created_at',
                \DB::raw('(SELECT COUNT(*) FROM forum_messages WHERE topic_id IN (
                                        SELECT `id` FROM `forum_topics` WHERE `forum_id` = forum_forums.`id` AND status <> 3
                                 ) AND forum_messages.`status` = 1) AS count_messages'),
                \DB::raw('(SELECT COUNT(*) FROM forum_topics WHERE forum_id = forum_forums.id AND status <> 3) AS count_topics'),
            ])
            ->leftJoin('forum_messages', 'forum_forums.last_message_id', '=', 'forum_messages.id')
            ->leftJoin('forum_topics', 'forum_topics.id', '=', 'forum_messages.topic_id')
            ->leftJoin('users', 'forum_messages.user_id', '=', 'users.id')
            ->join('forum_statuses', 'forum_forums.status', '=', 'forum_statuses.id')
            ->orderBy('forum_forums.sort', 'ASC')
            ->get();

        foreach ($forums as $k=>$item){
            if(!empty($forums[$k]->message_created_at)){
                $forums[$k]->created_message = [
                    'day' => $this->formatDay(Carbon::parse($forums[$k]->message_created_at)),
                    'time' => Carbon::parse($forums[$k]->message_created_at)->format('H:i'),
                ];
            }
        }

        return $forums;
    }
}