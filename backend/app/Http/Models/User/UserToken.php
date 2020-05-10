<?php

namespace App\Models\User;

use Illuminate\Database\Eloquent\Model;

class UserToken extends Model
{
    //
    protected $table = 'user_tokens';

    protected $primaryKey = 'token';

    //public $timestamps = false;

    protected $fillable = [
        'id_user',
        'token',
    ];
}
