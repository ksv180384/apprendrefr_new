<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Grammar extends Model
{
    //
    protected $fillable = [
        'title',
        'description',
        'content',
        'source', // Источни (окуда была взята информация)
    ];

    public $timestamps = false;
}
