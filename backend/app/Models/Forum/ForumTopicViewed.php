<?php

namespace App\Models\Forum;

use Illuminate\Database\Eloquent\Model;

class ForumTopicViewed extends Model
{
    //
    protected $primaryKey = 'user_id';

    protected $fillable = [
        'user_id',
        'topic_id',
        'viewed_data',
    ];

    public $timestamps = false;
}
