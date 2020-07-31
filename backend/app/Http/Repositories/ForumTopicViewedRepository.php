<?php
namespace App\Repositories;

use App\Models\Forum\ForumTopicViewed as Model;
use App\Models\Forum\ForumTopicViewed;
use Carbon\Carbon;

/**
 *
 * Class ForumTopicViewedRepository
 * @package App\Repositories
 */
class ForumTopicViewedRepository extends CoreRepository
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
     * Отмечаем время в которое пользователь последний раз просматривал тему форума
     *
     * @param int $topic_id - идентификатор темы форума
     * @param string $token - токен пользователя
     */
    public function viewedTopic($topic_id, $token = ''){
        $viewed = $this->startConditions()->select(['user_id', 'token', 'topic_id', 'viewed_data'])
                                         ->where('topic_id', '=', $topic_id)
                                         ->where(function ($query) use ($token) {
                                             $query->where('user_id', '=', (\Auth::check() ? \Auth::id() : 0))
                                                 ->orWhere('token', '=', $token);
                                         })
                                         ->first();
        if($viewed){
            $viewed->update([
                // Проеряем записан ли уже идентификатор пользователя в бд, если нет,
                // то проверяем авторизован ли пользователь, если ни одно из условий
                // не валидно, пишем в БД user_id = null
                'user_id' => $viewed->user_id ?? (\Auth::check() ? \Auth::id() : null),
                'token' => $token,
                'topic_id' => $topic_id,
                'viewed_data' => Carbon::now(),
            ]);
        }else{
            ForumTopicViewed::create([
                'user_id' => \Auth::check() ? \Auth::id() : null,
                'token' => $token,
                'topic_id' => $topic_id,
                'viewed_data' => Carbon::now(),
            ]);
        }
        return true;
    }
}