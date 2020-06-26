<?php

namespace App\Models\Forum;

use Illuminate\Database\Eloquent\Model;

class Topic extends Model
{
    //
    protected $table = 'forum_topics';

    protected $fillable = [
        'title',
        'user_id',
        'count_views',
        'last_message_id',
        'status',
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

    public function messages()
    {
        return $this->hasMany('App\Models\Forum\Message');
    }

    public function forum()
    {
        return $this->belongsTo('App\Models\Forum\Forum');
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