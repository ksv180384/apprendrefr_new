<?php

namespace App\Models\User;

use Illuminate\Database\Eloquent\Model;

class UserConfig extends Model
{
    //
    protected $primaryKey = 'user_id';

    public $timestamps = false;

    protected $fillable = [
        'user_id',
        'day_birthday',
        'yar_birthday',
        'email',
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
        'info',
        'residence',
        'sex',
    ];
}
