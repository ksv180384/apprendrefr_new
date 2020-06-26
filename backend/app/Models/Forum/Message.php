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
        'user_id',
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

    public function topic()
    {
        return $this->belongsTo('App\Models\Forum\Topic');
    }

    public function user()
    {
        return $this->belongsTo('App\Models\User');
    }

    public function statusTitle()
    {
        return $this->hasOne('App\Models\Forum\Status','id', 'status');
    }
}
