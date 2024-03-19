<?php

namespace App\Models\Forum;

use App\Models\User\User;
use Illuminate\Database\Eloquent\Model;

class Forum extends Model
{
    //
    protected $table = 'forum_forums';

    protected $fillable = [
        'title',
        'user_id',
        'last_message_id',
        'status',
        'sort',
        'created_at',
        'updated_at',
    ];

    /**
     * The attributes that should be cast to native types.
     *
     * @var array
     */
    protected $casts = [
        'created_at' => 'datetime:d.m.Y H:i:s',
        'updated_at' => 'datetime:d.m.Y H:i:s',
    ];

    public function topics()
    {
        return $this->hasMany(ForumTopic::class);
    }

    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function status()
    {
        return $this->hasOne(Status::class, 'id', 'status');
    }

    public function messages()
    {
        return $this->hasManyThrough(ForumMessage::class, ForumTopic::class, 'forum_id', 'topic_id', 'id', 'id')->where('forum_messages.status', 1);
    }

    public function lastMessages()
    {
        return $this->hasOne(ForumMessage::class, 'id', 'last_message_id');
    }
}
