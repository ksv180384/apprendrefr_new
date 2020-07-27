<?php
namespace App\Repositories;

use App\Models\Words\Word as Model;
use App\Models\Words\WordsPartOfSpeech;

/**
 * Хранилище запросов к таблице words
 * Class WordRepository
 * @package App\Repositories
 */
class WordRepository extends CoreRepository
{
    const PGINATE = 90;

    /**
     * Отдает управляемый класс
     * @return string
     */
    public function getModelClass()
    {
        return Model::class;
    }


    /**
     * Получает данные слова
     * @param int $id - идентификатор записи
     * @return mixed
     */
    public function getItem(int $id){
        $word = $this->startConditions()
            ->select(['id', 'word', 'translation', 'transcription', 'example', 'pronunciation'])
            ->where('id', '=', $id)
            ->first();

        return $word;
    }

    /**
     * Получает заданное количество случайных слов
     * @param int $count - количество получаемых записей
     * @return mixed
     */
    public function getRandomWords(int $count = 10){
        $wordsList = $this->startConditions()
            ->select(['id', 'word', 'translation', 'transcription', 'example', 'pronunciation'])
            ->inRandomOrder()
            ->limit($count)
            ->get();

        return $wordsList;
    }

    public function searchRu(string $search_text){
        $wordsList = $this->startConditions()
            ->select(['id', 'word', 'translation'])
            ->where('translation', 'LIKE', '%' . $search_text . '%')
            ->limit(10)
            ->get();

        return $wordsList;
    }

    public function searchFr(string $search_text){
        $search_text = preg_replace("#\b(la |le |les |un |une |se )#", "", $search_text);
        $wordsList = $this->startConditions()
            ->select(['id', 'word', 'translation'])
            ->where('word', 'LIKE', '%' . $search_text . '%')
            ->limit(10)
            ->get();

        return $wordsList;
    }

    public function getWordsPaginateFr($pos){
        $wordsList = $this->startConditions()
            ->select([
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
        $wordsList = $this->startConditions()
            ->select([
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