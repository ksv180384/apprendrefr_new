<?php
namespace App\Services;


use App\Models\Forum\ForumTopicViewed;
use Carbon\Carbon;

class ForumTopicViewedService {

    /**
     * Отмечаем время в которое пользователь последний раз просматривал тему форума
     *
     * @param int $topic_id - идентификатор темы форума
     */
    public function viewedTopic($topic_id){
        $viewed = ForumTopicViewed::where('topic_id', '=', $topic_id)
            ->where('user_id', '=', (\Auth::check() ? \Auth::id() : 0))
            ->first(['user_id', 'topic_id', 'viewed_data']);

        if(!\Auth::check()){
            return true;
        }

        if($viewed){
            $viewed->update([
                // Проеряем записан ли уже идентификатор пользователя в бд, если нет,
                // то проверяем авторизован ли пользователь, если ни одно из условий
                // не валидно, пишем в БД user_id = null
                'user_id' => $viewed->user_id,
                'topic_id' => $topic_id,
                'viewed_data' => Carbon::now(),
            ]);
        }else{
            ForumTopicViewed::create([
                'user_id' => \Auth::check() ? \Auth::id() : null,
                'topic_id' => $topic_id,
                'viewed_data' => Carbon::now(),
            ]);
        }
        return true;
    }
}
