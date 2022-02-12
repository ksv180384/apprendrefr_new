<?php

namespace App\Models\Forum;

use App\Models\User;
use Illuminate\Database\Eloquent\Model;

class Message extends Model
{
    //
    protected $table = 'forum_messages';

    protected $fillable = [
        'message',
        'topic_id',
        'user_id',
        'status',
        'create_at',
        'update_at',
    ];

    public function topic()
    {
        return $this->belongsTo(Topic::class);
    }

    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function statusTitle()
    {
        return $this->hasOne(MessageStatus::class,'id', 'status');
    }

    public function userMessages(){
        return $this->hasManyThrough(Message::class, User::class, 'id', 'user_id', 'user_id', 'id');
    }
}
