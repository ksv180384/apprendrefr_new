<?php

namespace App\App\Models\Forum;

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
}