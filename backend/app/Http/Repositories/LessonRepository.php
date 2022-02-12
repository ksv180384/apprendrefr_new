<?php
namespace App\Http\Repositories;

use App\Models\Lesson as Model;

/**
 * Хранилище запросов к таблице proverbs
 * Class ProverbRepository
 * @package App\Repositories
 */
class LessonRepository extends CoreRepository
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
     * Получает запись из БД по id
     * @param int $id - идентификатор записи
     * @return mixed
     */
    public function getById(int $id){
        $lesson = $this->startConditions()
            ->select(['id', 'title', 'description', 'content'])
           ->where('id', '=', $id)
            ->first();

        return $lesson;
    }

    /**
     * Получает все названия
     * @return mixed
     */
    public function getTitleList(){
        $lessonsTitle = $this->startConditions()
            ->select(['id', 'title'])
            ->get();

        return $lessonsTitle;
    }
}
