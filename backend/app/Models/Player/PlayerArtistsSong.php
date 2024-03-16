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

    public function songs()
    {
        return $this->hasMany(PlayerSongs::class, 'artist_id');
    }
}
