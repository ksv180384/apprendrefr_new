<?php

namespace App\Models\Forum;

use Illuminate\Database\Eloquent\Model;

class ForumTopicViewed extends Model
{
    //
    protected $primaryKey = 'token';

    protected $keyType = 'string';

    protected $fillable = [
        'user_id',
        'token',
        'topic_id',
        'viewed_data',
    ];

    public $timestamps = false;
}
