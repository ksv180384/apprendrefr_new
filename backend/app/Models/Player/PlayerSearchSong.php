<?php

namespace App\Models\Player;

use Illuminate\Database\Eloquent\Model;

class PlayerSearchSong extends Model
{
    //
    protected $fillable = [
        'artist',
        'title',
        'title_file',
    ];
}
