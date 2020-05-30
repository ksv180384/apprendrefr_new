<?php

namespace App\Models\User;

use Illuminate\Database\Eloquent\Model;

class UserInfo extends Model
{
    //
    protected $primaryKey = 'user_id';

    public $timestamps = false;

    protected $fillable = [
        'facebook',
        'skype',
        'twitter',
        'vk',
        'mail',
        'odnoklassniki',
        'telegram',
        'whatsapp',
        'viber',
        'instagram',
        'youtube',
    ];
}
