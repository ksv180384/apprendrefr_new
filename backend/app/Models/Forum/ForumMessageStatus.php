<?php

namespace App\Models\Forum;

use Illuminate\Database\Eloquent\Model;

class ForumMessageStatus extends Model
{
    protected $table = 'forum_message_status';

    protected $fillable = [
        'id',
        'title',
        'alias',
    ];
}
