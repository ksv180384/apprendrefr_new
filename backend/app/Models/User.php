<?php

namespace App\Models;

use App\Models\User\Rang;
use Carbon\Carbon;
use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Illuminate\Support\Str;
use Tymon\JWTAuth\Contracts\JWTSubject;

class User extends Authenticatable implements JWTSubject//, MustVerifyEmail
{
    use Notifiable;

    const NO_AVATAR = '/img/none_avatar.png';

    public $preventAttrGet = false;

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'login',
        'email',
        'email_verified_at',
        'send_verified_email_at',
        'password',
        'avatar',
        'sex',
        'birthday',
        'info',
        'signature',
        'residence',
        'rang',
        'admin',
        'confirm_token',
        'created_at',
        'updated_at',
    ];

    /**
     * The attributes that should be hidden for arrays.
     *
     * @var array
     */
    protected $hidden = [
        'password', 'remember_token',
    ];

    /**
     * The attributes that should be cast to native types.
     *
     * @var array
     */
    protected $casts = [
        'email_verified_at' => 'datetime:d.m.Y H:i:s',
        'birthday' => 'datetime:Y-m-d',
        'created_at' => 'datetime:d.m.Y H:i:s',
        'updated_at' => 'datetime:d.m.Y H:i:s',
    ];

    //protected $dateFormat = 'c';

    /*
    protected $dates = [
        'birthday',
    ];
    */

    /**
     * Get the identifier that will be stored in the subject claim of the JWT.
     *
     * @return mixed
     */
    public function getJWTIdentifier()
    {
        return $this->getKey();
    }

    /**
     * Return a key value array, containing any custom claims to be added to the JWT.
     *
     * @return array
     */
    public function getJWTCustomClaims()
    {
        return [];
    }

    public function isAdmin(){
        return /*$this->admin == 1 || */$this->rangTitle->alias == 'administrator';
    }

    public function isModerator(){
        return $this->rangTitle->alias == 'moderator';
    }

    /**
     * Установить аватар пользователя.
     *
     * @return void
     */
    public function getAvatarAttribute($avatar)
    {
        if(empty($avatar)){
            $avatar = asset(self::NO_AVATAR);
        }else{
            // Если не нужен мутатор
            if ($this->preventAttrGet) {
                $avatar = '/storage/' . $avatar;
            }else{
                $avatar = asset('/storage/' . $avatar);
            }
        }

        return $avatar;
    }

    /**
     * Меняем формат даты
     *
     * @return void
     */

    public function setBirthdayAttribute($birthday)
    {
        $birthday = Carbon::parse($birthday)->format('Y-m-d H:i:s');
        return $birthday;
    }

    public function rangTitle()
    {
        //return $this->hasOne(Rang::class, 'rang', 'id');
        return $this->belongsTo(Rang::class, 'rang', 'id');

    }

    /**
     * Формируем токен подтверждения емаил
     */
    public static function generateConfirmedToken(){
        return Str::random(90);
    }


    /**
     * Проверяем подтвердил ли пользователь емаил
     * @return bool
     */
    public function isConfirmed(){
        return !empty($this->email_verified_at);
    }
}
