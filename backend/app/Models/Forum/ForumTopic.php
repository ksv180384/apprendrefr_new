<?php

namespace App\Models\Forum;

use App\Models\User\User;
use Illuminate\Database\Eloquent\Model;

class ForumTopic extends Model
{
    //
    protected $table = 'forum_topics';

    protected $fillable = [
        'title',
        'forum_id',
        'user_id',
        'count_views',
        'last_message_id',
        'status',
        'create_at',
        'update_at',
    ];

    public function messages()
    {
        return $this->hasMany(ForumMessage::class, 'topic_id')->where('forum_messages.status_id', '=', 1);
    }

    public function messagesAll()
    {
        return $this->hasMany(ForumMessage::class);
    }

    public function forum()
    {
        return $this->belongsTo(Forum::class);
    }

    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function status()
    {
        return $this->hasOne(Status::class, 'status_id');
    }

    public function lastMessages()
    {
        return $this->hasOne(ForumMessage::class, 'id', 'last_message_id');
    }

    /**
     * Дата последнего сообщения посмотренного пользователем в топике
     * @return \Illuminate\Database\Eloquent\Relations\HasOne
     */
    public function userViewLastMessage()
    {
        $userId = \Auth::check() ? \Auth::id() : 0;
        return $this->hasOne(ForumTopicViewed::class, 'id', 'topic_id')
            ->where('user_id', '=', $userId);
    }
}
