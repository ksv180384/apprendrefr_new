<?php

namespace App\Services;

use App\Models\Forum\ForumTopic;

class ForumTopicService {

    public function getById($topic_id){
        $topic = ForumTopic::select('forum_topics.*')
            ->with([
                'user:id,login',
                'forum:id,title',
                'lastMessages:id,user_id,created_at',
                'lastMessages.user:id,login',
                'statusTitle'
            ])
            ->join('forum_statuses', 'forum_statuses.id', '=', 'forum_topics.status')
            ->leftJoin('forum_messages', 'forum_messages.id', '=', 'forum_topics.last_message_id')
            ->where('forum_topics.id', '=', $topic_id)
            ->where('forum_statuses.alias', '<>', 'hidden')
            ->orderByDesc('forum_messages.created_at')
            ->first();


        return $topic;
    }

    /**
     * Получаем темы форума
     * @param int $forum_id - идентификатор форума
     * @return mixed
     */
    public function getTopicByForumId(int $forum_id, $show_hidden = false){

        $topics = ForumTopic::select('forum_topics.*')
            ->with([
                'user:id,login',
                'forum:id,title',
                'lastMessages:id,user_id,created_at',
                'lastMessages.user:id,login',
                'userViewLastMessage',
                'statusTitle'
            ])
            ->withCount(['messages' => function($q){
                $q->join('forum_message_status', 'forum_message_status.id', 'forum_messages.status')
                    ->where('forum_message_status.alias', '=', 'visible_everyone');
            }])
            ->join('forum_statuses', 'forum_statuses.id', '=', 'forum_topics.status')
            ->leftJoin('forum_messages', 'forum_messages.id', '=', 'forum_topics.last_message_id')
            ->where('forum_topics.forum_id', '=', $forum_id)
            ->when(!$show_hidden, function($q){
                return $q->where('forum_statuses.alias', '<>', 'hidden');
            })
            ->orderByDesc('forum_messages.created_at')
            ->get();

        return $topics;
    }


    /**
     * Получаем последние активные темы форума
     * @return mixed
     */
    public function topicsLastActive(){
        $topics = ForumTopic::select('forum_topics.*')
            ->with(['user:id,login', 'forum:id,title', 'lastMessages.user:id,login'])
            ->withCount(['messages' => function($q){
                $q->join('forum_message_status', 'forum_message_status.id', 'forum_messages.status_id')
                    ->where('forum_message_status.alias', '=', 'visible_everyone');
            }])
            ->join('forum_statuses', 'forum_statuses.id', '=', 'forum_topics.status')
            ->join('forum_forums', 'forum_forums.id', '=', 'forum_topics.forum_id')
            ->join('forum_statuses AS fs', 'fs.id', '=', 'forum_forums.status')
            ->leftJoin('forum_messages', 'forum_messages.id', '=', 'forum_topics.last_message_id')
            ->where('forum_statuses.alias', '<>', 'hidden')
            ->where('fs.alias', '<>', 'hidden')
            ->orderByDesc('forum_messages.created_at')
            ->limit(20)
            ->get();

        return $topics;
    }

}
