<?php

namespace App\Models\User;

use Illuminate\Database\Eloquent\Model;

/**
 * Список пользователе, которые были на сайте 10 мин назад
 * Class Online
 * @package App\Models\User
 */
class Online extends Model
{
    //
    protected $table = 'online';

    public $timestamps = false;

    public $incrementing = false;

    protected $primaryKey = 'token';

    protected $fillable = [
        'user_id',
        'token',
        'ip',
        'is_bot',
        'bot_name',
        'date',
    ];

    /**
     * The attributes that should be cast to native types.
     *
     * @var array
     */
    protected $casts = [
        'date' => 'datetime:d.m.Y H:i:s',
    ];

    public function user(){
        return $this->hasOne(User::class, 'id', 'user_id');
    }

    /**
     * Генерирует токен
     * @return string|void
     */
    public static function generateToken(){
        return bin2hex(random_bytes(16));
    }
}
