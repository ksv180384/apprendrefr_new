<?php

namespace App\Services;

use App\Models\Forum\Forum;
use Carbon\Carbon;

class ForumService
{
    /**
     * Получает данные форума
     * @param int $id - идентификатоор форума
     * @return mixed
     */
    public function getById(int $id){
        $forum = Forum::withCount(['messages', 'topics'])
            ->with([
                'lastMessages:id,topic_id,user_id,created_at',
                'lastMessages.topic:id,title',
                'lastMessages.user:id,login,rang',
                'status'
            ])
            ->where('forum_forums.id', '=', $id)
            ->orderBy('forum_forums.sort', 'ASC')
            ->first();

        return $forum;
    }

    /**
     * Получает список форумов
     * @return mixed
     */
    public function getList(){
        $forums = Forum::withCount(['messages', 'topics'])
            ->with([
                'lastMessages:id,topic_id,user_id,created_at',
                'lastMessages.topic:id,title',
                'lastMessages.user:id,login,rang',
                'status'
            ])
            ->orderBy('forum_forums.sort', 'ASC')
            ->get();

        return $forums;
    }
}
