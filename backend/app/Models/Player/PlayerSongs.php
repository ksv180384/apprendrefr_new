<?php

namespace App\Models\Player;

use Illuminate\Database\Eloquent\Model;

class PlayerSongs extends Model
{
    //
    protected $fillable = [
        'artist_id',
        'artist_name',
        'title',
        'text_fr',
        'text_ru',
        'text_transcription',
        'user_id',
        'hidden',
        'create_at',
        'update_at',
    ];
}
