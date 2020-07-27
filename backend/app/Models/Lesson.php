<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Lesson extends Model
{
    //
    public $timestamps = false;

    protected $fillable = [
        'description',
        'title',
        'content',
    ];
}
