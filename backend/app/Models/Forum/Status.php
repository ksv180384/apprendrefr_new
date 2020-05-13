<?php

namespace App\Models\Forum;

use Illuminate\Database\Eloquent\Model;

class Status extends Model
{
    //
    protected $table = 'forum_statuses';

    protected $fillable = [
        'title'
    ];

    public $timestamps = false;
}
