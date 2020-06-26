<?php
namespace App\Repositories;

use App\Models\Forum\Forum as Model;

/**
 * Хранилище запросов к таблице forum_forums
 * Class ForumRepository
 * @package App\Repositories
 */
class ForumRepository extends CoreRepository
{

    /**
     * Отдает управляемый класс
     * @return string
     */
    public function getModelClass()
    {
        return Model::class;
    }
}