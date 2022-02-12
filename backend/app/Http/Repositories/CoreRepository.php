<?php

namespace App\Http\Repositories;

use Illuminate\Contracts\Database\Eloquent\Models;

/**
 * Class CoreRepository
 * @package App\Repositories
 *
 * Репозиторий для работы с сущностью
 * Может выдавать наборы данных
 * Не может создавать/изменять сущности.
 */
abstract class CoreRepository{

    /**
     * @var Model
     */
    protected $model;

    public function __construct()
    {
        $this->model = app($this->getModelClass());
    }

    abstract protected function getModelClass();

    protected function startConditions(){
        return clone $this->model;
    }

    protected function formatDay($date){
        $result = $date->format('d.m.Y')
        ;
        if($date->format('d.m.Y') == date('d.m.Y', time())){
            $result = 'сегодня';
        }elseif($date->format('d.m.Y') == date('d.m.Y', (time() - 86400))){
            $result = 'вчера';
        }

        return $result;
    }
}
