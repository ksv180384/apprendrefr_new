<?php

namespace App\Models\User;

use Illuminate\Database\Eloquent\Model;

class UserConfigsView extends Model
{
    //
    protected $table = 'user_configs_view';

    protected $fillable = [
        'title',
        'alias',
    ];

    public $timestamps = false;
}
