<?php

namespace App\Models\User;

use App\Models\Forum\Message;
use App\Models\Player\PlayerSongs;
use Carbon\Carbon;
use Database\Factories\User\UserFactory;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Illuminate\Support\Str;

class User extends Authenticatable//, MustVerifyEmail
{
    use Notifiable;
    use HasFactory;

    const NO_AVATAR = '/img/none_avatar.png';

    public $preventAttrGet = false;

    protected $fillable = [
        'login',
        'email',
        'email_verified_at',
        'send_verified_email_at',
        'password',
        'avatar',
        'gender_id',
        'birthday',
        'info',
        'signature',
        'residence',
        'rang_id',
        'admin',
        'confirm_token',
        'created_at',
        'updated_at',
    ];

    protected $hidden = [
        'password', 'remember_token',
    ];


    protected $casts = [
        'email_verified_at' => 'datetime:d.m.Y H:i:s',
        'birthday' => 'datetime:Y-m-d',
    ];

    public function rang(){
        return $this->belongsTo(Rang::class, 'rang_id', 'id');
    }

    public function songs()
    {
        return $this->hasMany(PlayerSongs::class, 'user_id');

    }

    /**
     * Пол пользователя
     * @return \Illuminate\Database\Eloquent\Relations\BelongsTo
     */
    public function gender(){
        return $this->belongsTo(Gender::class, 'gender_id');
    }

    public function infos(){
        return $this->hasOne(UserInfo::class);
    }

    public function messages(){
        return $this->hasMany(Message::class, 'user_id', 'id');
    }

    public function messagesActive(){
        return $this->hasMany(Message::class, 'user_id', 'id')->where('status', 1);
    }

    /**
     * Get the identifier that will be stored in the subject claim of the JWT.
     *
     * @return mixed
     */
    public function getJWTIdentifier()
    {
        return $this->getKey();
    }

    public function config(){
        return $this->hasOne(UserConfig::class, 'user_id', 'id');
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
        return true; /*$this->admin == 1 || */$this->rang->alias == 'administrator';
    }

    public function isModerator(){
        return $this->rang->alias == 'moderator';
    }

    /**
     * Установить аватар пользователя.
     *
     * @param $avatar
     * @return string
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
     * @param $birthday
     * @return string
     */
    public function setBirthdayAttribute($birthday)
    {
        $birthday = Carbon::parse($birthday)->format('Y-m-d H:i:s');
        return $birthday;
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

    protected static function newFactory(): UserFactory
    {
        return UserFactory::new();
    }
}
