<?php
namespace App\Repositories;

use App\Models\Words\Word as Model;

/**
 * Хранилище запросов к таблице words
 * Class WordRepository
 * @package App\Repositories
 */
class WordRepository extends CoreRepository
{

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
}