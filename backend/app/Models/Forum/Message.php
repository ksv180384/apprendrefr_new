<?php

namespace App\App\Models\Forum;

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
}
