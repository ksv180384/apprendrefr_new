<?php

namespace App\Services;

use App\Models\User;
use App\Models\User\Online;

class StatisticService {

    /**
     * Получает писок авторизованных пользователей находящихся сейчас на сайте
     * @return mixed
     */
    public function onlineUsers(){
        $usersOnline = User::select(['users.id', 'users.login'])
            ->distinct()
            ->join('online', 'users.id', '=', 'online.user_id')
            ->whereNotNull('online.user_id')
            ->get();

        return $usersOnline;
    }

    /**
     * Считаем количество гостей на сайте
     * @return mixed
     */
    public function countGuests(){
        $countGuests = Online::whereNull('user_id')->count();

        return $countGuests;
    }
}
