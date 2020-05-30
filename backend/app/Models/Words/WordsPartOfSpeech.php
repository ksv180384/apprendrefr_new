<?php

namespace App\Models\Words;

use Illuminate\Database\Eloquent\Model;

class WordsPartOfSpeech extends Model
{
    //
    protected $fillable = [
        'title',
    ];

    protected $table = 'words_part_of_speech';

    public $timestamps = false;
}
