<?php

namespace App\App\Models\Forum;

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
}
