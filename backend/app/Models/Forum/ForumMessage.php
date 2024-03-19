<?php

namespace App\Models\Forum;

use App\Models\User\User;
use Illuminate\Database\Eloquent\Model;

class ForumMessage extends Model
{
    //
    protected $table = 'forum_messages';

    protected $fillable = [
        'message',
        'topic_id',
        'user_id',
        'status_id',
        'create_at',
        'update_at',
    ];

    public function topic()
    {
        return $this->belongsTo(ForumTopic::class, 'topic_id');
    }

    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function status()
    {
        return $this->belongsTo(ForumMessageStatus::class,'status_id');
    }

    public function userMessages(){
        return $this->hasManyThrough(ForumMessage::class, User::class, 'id', 'user_id', 'user_id', 'id');
    }
}
