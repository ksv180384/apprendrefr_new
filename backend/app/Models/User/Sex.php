<?php

namespace App\Models\User;

use Illuminate\Database\Eloquent\Model;

class Sex extends Model
{
    //
    protected $table = 'sex';

    protected $fillable = ['title'];


    public $timestamps = false;
}
