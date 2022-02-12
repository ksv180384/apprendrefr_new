<?php

namespace App\Services;

use App\Models\Forum\Message;
use App\Models\Forum\MessageStatus;
use App\Models\User\UserConfigsView;
use Illuminate\Pagination\Paginator;

class ForumMessageService {

    const SHOW_PAGES = 10;

    /**
     * Получаем количество всех сообщений форума
     * @return int
     */
    public function countMessagesAll(){
        $countMessages = Message::join('forum_message_status', 'forum_message_status.id', '=', 'forum_messages.status')
            ->where('forum_message_status.alias', '=', 'visible_everyone')
            ->count();

        return $countMessages;
    }

    /**
     * Получаем сообщения темы
     * @param int $topic_id
     * @param boolean $hidden_message - получать ли скрытые сообщения
     * @return mixed
     */
    public function getByTopicId(int $topic_id, $hidden_message = false){

        $messages = Message::select(['forum_messages.*', 'forum_message_status.alias'])
            ->with([
                'topic:id,title',
                'topic.forum:id,title',
                'user:id,login,avatar,sex,signature,residence,rang,admin,created_at',
                'user.sex',
                'user.rang:id,title,alias',
                'user.info',
                'user.config',
                'statusTitle',
                ])
            ->withCount(['userMessages'])
            ->join('forum_message_status', 'forum_messages.status', '=', 'forum_message_status.id')
            ->where('forum_messages.topic_id', '=', $topic_id)
            ->when(!$hidden_message, function($q){
                return $q->where('forum_message_status.alias', '<>', 'hidden');
            })
            ->orderBy('forum_messages.created_at', 'ASC')
            ->paginate(self::SHOW_PAGES);

        $configView = $this->userConfigsView();

        // Задаем настройкам пользователя вместо идентификаторов, объекты
        foreach ($messages as $k=>$item){
            $messages[$k] = $this->initAliasInfoView($messages[$k], $configView);
        }

        return $messages;
    }

    public function getByTopicIdLastPage(int $topic_id, $show_hide_mess = false){
        // Получаем номер последней страницы
        $p = Message::join('forum_message_status', 'forum_messages.status', '=', 'forum_message_status.id')
            ->where('forum_messages.topic_id', '=', $topic_id)
            ->when(!$show_hide_mess, function($q){
                return $q->where('forum_message_status.alias', '<>', 'hidden');
            })
            ->paginate(self::SHOW_PAGES);

        $lastPage = $p->lastPage();

        Paginator::currentPageResolver(function() use ($lastPage) {
            return $lastPage;
        });

        $messages = Message::select(['forum_messages.*', 'forum_message_status.alias'])
            ->with([
                'topic:id,title',
                'topic.forum:id,title',
                'user:id,login,avatar,sex,signature,residence,rang,admin,created_at',
                'user.sex',
                'user.rang:id,title,alias',
                'user.info',
                'user.config',
                'statusTitle',
            ])
            ->withCount(['userMessages'])
            ->join('forum_message_status', 'forum_messages.status', '=', 'forum_message_status.id')
            ->where('forum_messages.topic_id', '=', $topic_id)
            ->when(!$show_hide_mess, function($q){
                return $q->where('forum_message_status.alias', '<>', 'hidden');
            })
            ->orderBy('forum_messages.created_at', 'ASC')
            ->paginate(self::SHOW_PAGES);

        $configView = $this->userConfigsView();

        // Задаем настройкам пользователя вместо идентификаторов, объекты
        foreach ($messages as $k=>$item){
            $messages[$k] = $this->initAliasInfoView($messages[$k], $configView);
        }

        return $messages;
    }

    /**
     * @return MessageStatus[]|\Illuminate\Database\Eloquent\Collection
     */
    public function getStatusList(){
        $statuses = MessageStatus::all(['id', 'title', 'alias']);

        return $statuses;
    }

    /**
     * Получаем все права просмотра
     * @return UserConfigsView[]|\Illuminate\Database\Eloquent\Collection
     */
    private function userConfigsView(){
        $configView = UserConfigsView::all(['id', 'title', 'alias'])->keyBy('id');
        return $configView;
    }

    /**
     * добавляеи объекты прав просмотра личной информации
     * @param Message $message
     * @param UserConfigsView[] $configView
     * @return mixed
     */
    private function initAliasInfoView($message, $configView){
        // Поля коллекци, которые отвечают за доступ к данным пользователя
        $arrayFields = [
            'email', 'facebook',  'skype', 'twitter', 'vk', 'odnoklassniki', 'telegram', 'whatsapp', 'viber',
            'instagram', 'youtube', 'info',  'residence', 'sex'
        ];

        // Перечисляем поля настроек доступа к данным пользователя
        foreach ($message->user->config->getAttributes()  as $key => $value){

            // Проверяем соответствует ли текущее поле, полям заданным в массиве, значение должно быть числом
            if(
                in_array($key, $arrayFields) &&
                is_numeric($value)
            ){
                $message->user->config->setAttribute($key, $configView[$value]);
            }

        }
        return $message;
    }
}
