<?php

namespace App\Services;

use App\Models\Words\Word;
use App\Models\Words\WordsPartOfSpeech;

class WordService {

    const PGINATE = 90;

    /**
     * Получает заданное количество случайных слов
     * @param int $count
     * @return mixed
     */
    public function wordsRandom($count = 10){
        $words = Word::select(['id', 'word', 'translation', 'transcription', 'example', 'pronunciation'])
            ->inRandomOrder()
            ->limit($count)
            ->get();

        return $words;
    }

    /**
     * Поиск слова ru
     * @param string $search_text
     * @return mixed
     */
    public function searchRu(string $search_text){
        $wordsList = Word::select(['id', 'word', 'translation'])
            ->where('translation', 'LIKE', '%' . $search_text . '%')
            ->limit(10)
            ->get();

        return $wordsList;
    }

    /**
     * Поиск слова fr
     * @param string $search_text
     * @return mixed
     */
    public function searchFr(string $search_text){
        $search_text = preg_replace("#\b(la |le |les |un |une |se )#", "", $search_text);
        $wordsList = Word::select(['id', 'word', 'translation'])
            ->where('word', 'LIKE', '%' . $search_text . '%')
            ->limit(10)
            ->get();

        return $wordsList;
    }

    public function searchFrNoLimit(string $search_text){
        $search_text = preg_replace("#\b(la |le |les |un |une |se )#", "", $search_text);
        $wordsList = Word::select(['id', 'word', 'translation', 'example'])
            ->where('word', 'LIKE', '%' . $search_text . '%')
            ->get();

        return $wordsList;
    }

    public function searchRuPage(string $search_text){
        $wordsList = Word::select(['id', 'word', 'translation', 'example'])
            ->where('translation', 'LIKE', '%' . $search_text . '%')
            ->limit(10)
            ->get();

        return $wordsList;
    }

    public function searchFrPage(string $search_text){
        $search_text = preg_replace("#\b(la |le |les |un |une |se )#", "", $search_text);
        $wordsList = Word::select(['id', 'word', 'translation', 'example'])
            ->where('word', 'LIKE', '%' . $search_text . '%')
            ->limit(10)
            ->get();

        return $wordsList;
    }

    public function getWordsPaginateFr($pos){
        $wordsList = Word::select([
                'words.id',
                'words.word AS fr',
                'words.word',
                'words.translation',
                'words.transcription',
                'words_part_of_speech.title AS pos_title',
            ])
            ->leftJoin('words_part_of_speech', 'words_part_of_speech.id', 'words.id_part_of_speech');
        if($pos){
            $wordsList = $wordsList->where('id_part_of_speech', '=', $pos);
        }
        $wordsList = $wordsList->orderBy('word', 'ASC')->paginate(self::PGINATE);
        return $wordsList;
    }

    public function getWordsPaginateRu($pos){
        $wordsList = Word::select([
                'words.id',
                'words.word AS fr',
                'words.word AS translation',
                'words.translation AS word',
                'words.transcription',
                'words_part_of_speech.title AS pos_title',
            ])
            ->leftJoin('words_part_of_speech', 'words_part_of_speech.id', 'words.id_part_of_speech');
        if($pos){
            $wordsList = $wordsList->where('id_part_of_speech', '=', $pos);
        }
        $wordsList = $wordsList->orderBy('word', 'ASC')->paginate(self::PGINATE);
        return $wordsList;
    }

    /**
     * Получает часть речи по id
     * @param $id - идентификатор части речи
     */
    public function getPosById($id){
        $pos = WordsPartOfSpeech::select(['id', 'title'])
            ->where('id', '=', $id)
            ->first();
        return $pos;
    }

    /**
     * Получает все части речи
     */
    public function getPosAll(){
        $pos = WordsPartOfSpeech::select(['id', 'title'])
            ->orderBy('id', 'ASC')
            ->get();
        return $pos;
    }
}
