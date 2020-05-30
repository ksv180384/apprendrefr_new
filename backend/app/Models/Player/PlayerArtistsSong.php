<?php

namespace App\Models\Player;

use Illuminate\Database\Eloquent\Model;

class PlayerArtistsSong extends Model
{
    //
    public $timestamps = false;

    protected $fillable = [
        'name',
    ];
}
