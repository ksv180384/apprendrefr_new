<?php

namespace App\Models\User;

use Illuminate\Database\Eloquent\Model;

class Rang extends Model
{
    //
    protected $fillable = [
        'title',
        'alias',
    ];
    public $timestamps = false;
}
