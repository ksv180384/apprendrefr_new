<?php
namespace App\Repositories;

use App\Models\Proverb as Model;

/**
 * Хранилище запросов к таблице proverbs
 * Class ProverbRepository
 * @package App\Repositories
 */
class ProverbRepository extends CoreRepository
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
    public function getRandomProverb(int $count = 1){
        $proverbsList = $this->startConditions()
            ->select(['id', 'text', 'translation'])
            ->inRandomOrder()
            ->limit($count)
            ->get();

        return $proverbsList;
    }
}