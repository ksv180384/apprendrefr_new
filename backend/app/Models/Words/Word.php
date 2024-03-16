<?php

namespace App\Models\Words;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Word extends Model
{
    use HasFactory;

    protected $fillable = [
        'id_part_of_speech', // Ссылка на часть речи
        'word', // Слово
        'translation', // Превод
        'transcription', // Транскрипция
        'example', // Пример
        'pronunciation', // Произношение
    ];

    public $timestamps = false;

    public function partOfSpeech()
    {
        return $this->belongsTo(WordsPartOfSpeech::class, 'id_part_of_speech');
    }
}
