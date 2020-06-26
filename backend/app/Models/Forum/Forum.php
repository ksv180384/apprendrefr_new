<?php

namespace App\Models\Forum;

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
        'create_at',
        'update_at',
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
        return $this->hasMany('App\Models\Forum\Topic');
    }

    public function user()
    {
        return $this->belongsTo('App\Models\User');
    }

    public function statusTitle()
    {
        return $this->hasOne('App\Models\Forum\Status', 'id', 'status');
    }

    public function lastMessages()
    {
        return $this->hasOne('App\Models\Forum\Message', 'id', 'last_message_id');
    }
}
