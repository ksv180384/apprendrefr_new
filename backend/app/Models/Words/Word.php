<?php

namespace App\Models\Words;

use Illuminate\Database\Eloquent\Model;

class Word extends Model
{
    protected $fillable = [
        'id_part_of_speech',
        'word', // Слово
        'translation', // Превод
        'transcription', // Транскрипция
        'example', // Пример
        'pronunciation', // Произношение
    ];

    public $timestamps = false;
}
