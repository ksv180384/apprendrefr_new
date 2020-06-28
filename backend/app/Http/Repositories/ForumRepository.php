<?php
namespace App\Repositories;

use App\Models\Forum\Forum as Model;

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

    public function getList(){/*
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
                'forum_messages.created_at AS message_created_at'
                //\DB::raw('(SELECT COUNT(*) FROM forum_messages WHERE topic_id = forum_topics.id) AS count_messages'),
            ])
            ->join('forum_forums', 'forum_topics.forum_id', '=', 'forum_forums.id')
            ->leftJoin('forum_messages', 'forum_forums.last_message_id', '=', 'forum_messages.id')
            ->join('users', 'forum_messages.user_id', '=', 'users.id')
            ->join('forum_statuses', 'forum_forums.status', '=', 'forum_statuses.id')
            ->leftJoin('forum_messages AS m', 'forum_topics.id', '=', 'm.topic_id')
            ->orderBy('forum_forums.sort', 'ASC')
            ->get();

        foreach ($forums as $k=>$item){
            if(!empty($forums[$k]->message_created_at)){
                $forums[$k]->message_created_at = Carbon::createFromFormat('Y-m-d H:i:s', $item->message_created_at)->format('H:i d.m.Y');
            }
        }*/
        $forums = ['q' => 'sa'];
        return $forums;
    }
}