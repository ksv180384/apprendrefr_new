<?php

namespace App\Models\User;

use Illuminate\Database\Eloquent\Model;

class PrivateMessages extends Model
{
    //
    protected $fillable = [
        'to',
        'from',
        'message',
        'create_at',
        'update_at',
    ];

    /**
     * The attributes that should be cast to native types.
     *
     * @var array
     */
    protected $casts = [
        'created_at' => 'datetime:d.m.Y H:i:s',
        'updated_at' => 'datetime:d.m.Y H:i:s',
    ];

    public function to()
    {
        return $this->belongsTo('App\Models\User\User');
    }

    public function from()
    {
        return $this->belongsTo('App\Models\User\User');
    }
}
