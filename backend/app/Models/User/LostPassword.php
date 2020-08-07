<?php

namespace App\Models\User;

use App\Models\User;
use Illuminate\Database\Eloquent\Model;

class LostPassword extends Model
{
    //

    protected $fillable = [
        'id',
        'user_id',
        'token',
        'used',
        'date',
    ];

    public $timestamps = false;

    protected $dates = [
        'date'
    ];

    public function user()
    {
        return $this->belongsTo(User::class);
    }
}
