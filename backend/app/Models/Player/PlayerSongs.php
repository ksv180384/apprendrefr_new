<?php

namespace App\Models\Player;

use App\Models\User\User;
use Database\Factories\Song\SongFactory;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class PlayerSongs extends Model
{
    use HasFactory;

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
        'created_at',
        'updated_at',
    ];

    public function artist()
    {
        return $this->belongsTo(PlayerArtistsSong::class, 'artist_id');
    }

    public function user()
    {
        return $this->belongsTo(User::class, 'user_id');
    }

    protected static function newFactory(): SongFactory
    {
        return SongFactory::new();
    }
}
