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
}