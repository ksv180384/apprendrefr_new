<?php
namespace App\Http\Repositories;

use App\Models\User\Online as Model;

/**
 * Хранилище запросов к таблице online
 * Class StatisticRepository
 * @package App\Repositories
 */
class StatisticRepository extends CoreRepository
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
     * Получает писок авторизованных пользователей находящихс яна сайте
     * @return mixed
     */
    public function getOnlineUsers(){
        $users_online = $this->startConditions()
            ->select([
                'users.id',
                'users.login',
            ])
            ->join('users', 'online.user_id', '=', 'users.id')
            ->groupBy('user_id')
            ->whereNotNull('online.user_id')
            ->get();

        return $users_online;
    }

    /**
     * Считаем количество гостей на сайте
     * @return mixed
     */
    public function countGuests(){
        $count_guests = $this->startConditions()
            ->select(\DB::raw('COUNT(*) as count'))
            ->whereNull('user_id')
            ->first();

        return $count_guests->count;
    }
}
