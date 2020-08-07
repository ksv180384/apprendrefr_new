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

    public function getById($topic_id){
        $topic = $this->startConditions()
            ->select([
                'forum_forums.id AS forum_id',
                'forum_forums.title AS forum_title',
                'forum_topics.id',
                'forum_topics.title',
                'forum_topics.count_views',
                'forum_topics.status',
                'forum_topics.created_at',
                'users.id AS message_create_user_id',
                'users.login AS message_create_user_login',
                'users.rang AS message_create_user_rang',
                'forum_statuses.title AS status_topic_title',
                'forum_statuses.alias AS status_topic_alias',
                'topic_author.id AS topic_create_user_id',
                'topic_author.login AS topic_create_user_login',
                'topic_author.rang AS topic_create_user_rang',
                'forum_messages.created_at AS message_created_at'
            ])
            ->join('forum_forums', 'forum_topics.forum_id', '=', 'forum_forums.id')
            ->join('users AS topic_author', 'topic_author.id', '=', 'forum_topics.user_id')
            ->leftJoin('forum_messages', 'forum_topics.last_message_id', '=', 'forum_messages.id')
            ->join('forum_statuses', 'forum_topics.status', '=', 'forum_statuses.id')
            ->leftJoin('users', 'forum_messages.user_id', '=', 'users.id')
            ->where('forum_topics.id', '=', $topic_id)
            ->first();


        if(!empty($topic->message_created_at)){
            $topic->created_message = [
                'day' => $this->formatDay(Carbon::parse($topic->message_created_at)),
                'time' => Carbon::parse($topic->message_created_at)->format('H:i'),
            ];
        }


        return $topic;
    }

    /**
     * Получаем последние активные темы форума
     * @return mixed
     */
    public function getLastActiveTopics(){
        $user_id = \Auth::check() ? \Auth::id() : 0;
        $topics = $this->startConditions()
             ->select([
                 'forum_forums.id AS forum_id',
                 'forum_forums.title AS forum_title',
                 'forum_topics.id',
                 'forum_topics.title',
                 'forum_topics.count_views',
                 'forum_topics.status',
                 'forum_topics.created_at',
                 'users.id AS message_create_user_id',
                 'users.login AS message_create_user_login',
                 'users.rang AS message_create_user_rang',
                 'forum_statuses.title AS status_topic_title',
                 'forum_statuses.alias AS status_topic_alias',
                 'topic_author.id AS topic_create_user_id',
                 'topic_author.login AS topic_create_user_login',
                 'topic_author.rang AS topic_create_user_rang',
                 'forum_messages.created_at AS message_created_at',
                 'forum_topic_vieweds.viewed_data AS user_last_viewed_data',
                 \DB::raw('(SELECT COUNT(*) FROM forum_messages WHERE topic_id = forum_topics.id AND `status` = 1) AS count_messages'),
             ])
             ->join('forum_forums', 'forum_topics.forum_id', '=', 'forum_forums.id')
             ->join('users AS topic_author', 'topic_author.id', '=', 'forum_topics.user_id')
             ->leftJoin('forum_messages', 'forum_topics.last_message_id', '=', 'forum_messages.id')
             ->join('forum_statuses', 'forum_topics.status', '=', 'forum_statuses.id')
             ->join('users', 'forum_messages.user_id', '=', 'users.id')
            ->leftJoin('forum_topic_vieweds', function ($join) use ($user_id) {
                $join->on('forum_topic_vieweds.topic_id', '=', 'forum_topics.id')
                    ->where('forum_topic_vieweds.user_id', '=', $user_id);
                })
             ->where('forum_statuses.alias', '<>', 'hidden')
             ->orderBy('message_created_at', 'DESC')
             ->limit(20)
             ->get();

        foreach ($topics as $k=>$item){
            if(!empty($topics[$k]->message_created_at)){
                $topics[$k]->created_message = [
                    'day' => $this->formatDay(Carbon::parse($topics[$k]->message_created_at)),
                    'time' => Carbon::parse($topics[$k]->message_created_at)->format('H:i'),
                ];
            }
            // Сравнение дат создания последнего сообщения и даты последнего
            // просмотра пользвателем темы
            $topics[$k] = $this->compareCreateAndViewDate($topics[$k]);
        }

        return $topics;
    }

    /**
     * Получаем темы форума
     * @param int $forum_id - идентификатор форума
     * @return mixed
     */
    public function getTopicByForumId(int $forum_id, $show_hidden = false){
        $user_id = \Auth::check() ? \Auth::id() : 0;
        $topics = $this->startConditions()
            ->select([
                'forum_forums.id AS forum_id',
                'forum_forums.title AS forum_title',
                'forum_topics.id',
                'forum_topics.title',
                'forum_topics.count_views',
                'forum_topics.status',
                'forum_topics.created_at',
                'users.id AS message_create_user_id',
                'users.login AS message_create_user_login',
                'users.rang AS message_create_user_rang',
                'forum_statuses.title AS status_topic_title',
                'forum_statuses.alias AS status_topic_alias',
                'topic_author.id AS topic_create_user_id',
                'topic_author.login AS topic_create_user_login',
                'topic_author.rang AS topic_create_user_rang',
                'forum_messages.created_at AS message_created_at',
                'forum_messages.updated_at AS message_updated_at',
                'forum_topic_vieweds.viewed_data AS user_last_viewed_data',
                \DB::raw('(SELECT COUNT(*) FROM forum_messages WHERE topic_id = forum_topics.id AND `status` = 1) AS count_messages'),
            ])
            ->join('forum_forums', 'forum_topics.forum_id', '=', 'forum_forums.id')
            ->join('users AS topic_author', 'topic_author.id', '=', 'forum_topics.user_id')
            ->leftJoin('forum_messages', 'forum_topics.last_message_id', '=', 'forum_messages.id')
            ->join('forum_statuses', 'forum_topics.status', '=', 'forum_statuses.id')
            ->leftJoin('users', 'forum_messages.user_id', '=', 'users.id')

            ->leftJoin('forum_topic_vieweds', function ($join) use ($user_id) {
                    $join->on('forum_topic_vieweds.topic_id', '=', 'forum_topics.id')
                        ->where('forum_topic_vieweds.user_id', '=', $user_id);
                })
            ->where('forum_id', '=', $forum_id);
            if(!$show_hidden){
                $topics = $topics->where('forum_statuses.alias', '<>', 'hidden');
            }
        $topics = $topics->orderBy('message_created_at', 'DESC')
            ->get();

        foreach ($topics as $k=>$item){
            if(!empty($topics[$k]->message_created_at)){
                $topics[$k]->created_message = [
                    'day' => $this->formatDay(Carbon::parse($topics[$k]->message_created_at)),
                    'time' => Carbon::parse($topics[$k]->message_created_at)->format('H:i'),
                ];
            }
            // Сравнение дат создания последнего сообщения и даты последнего
            // просмотра пользвателем темы
            $topics[$k] = $this->compareCreateAndViewDate($topics[$k]);
        }

        return $topics;
    }

    /**
     * Сравнение дат создания последнего сообщения и даты последнего
     * просмотра пользвателем темы
     */
    private function compareCreateAndViewDate($topic){
        $topic->user_view_topic = false;
        if(!\Auth::check()){
            $topic->user_view_topic = true;
            return $topic;
        }
        if(!empty($topic->user_last_viewed_data)){
            $date_mess = !empty($topic->message_updated_at) ? $topic->message_updated_at : $topic->message_created_at;

            $from = Carbon::parse($date_mess);
            $to = Carbon::parse($topic->user_last_viewed_data);
            $diff_in_seconds = $to->diffInSeconds($from);
            if($diff_in_seconds > 0){
                $topic->user_view_topic = true;
            }
        }
        return $topic;
    }
}