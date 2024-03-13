<?php

namespace App\Http\Middleware;

use App\Http\Resources\Api\V1\UserResource;
use App\Services\ForumMessageService;
use App\Services\StatisticService;
use App\Services\UserService;
use Closure;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Symfony\Component\HttpFoundation\Response;

class PageInfoStatisticMiddleware
{
    /**
     * Handle an incoming request.
     *
     * @param  \Closure(\Illuminate\Http\Request): (\Symfony\Component\HttpFoundation\Response)  $next
     */
    public function handle(Request $request, Closure $next): Response
    {
        $response = $next($request);

        $statisticService = new StatisticService();
        $userService = new UserService();
        $forumMessageService = new ForumMessageService();

        $usersOnline = $statisticService->onlineUsers();
        $usersOnlineCount = $usersOnline->whereNotNull('user_id')->count();
        $guestsCount = $usersOnline->whereNull('user_id')->count();
        $usersRegisterCount = $userService->countUsersRegister();
        $usersOnlineAllCount = $usersOnline->count();
        $countAllMessages = $forumMessageService->countMessagesAll();

//        $currentData = $response->getData();
//        $currentData->statistic = [
//            'online_users' => $usersOnline,
//            'count_users' => $usersOnlineCount,
//            'count_guests' => $guestsCount,
//            'count_users_register' => $usersRegisterCount,
//            'count_all' => $usersOnlineAllCount,
//            'count_messages' => $countAllMessages,
//        ];
//        $response->setData($currentData);

        $arrResponse = json_decode($response->content(), true); // Получаем массив текущего ответа
        $arrResponse['statistic'] = [
            'online_users' => $usersOnline,
            'count_users' => $usersOnlineCount,
            'count_guests' => $guestsCount,
            'count_users_register' => $usersRegisterCount,
            'count_all' => $usersOnlineAllCount,
            'count_messages' => $countAllMessages,
        ];
        $response->setContent(json_encode($arrResponse)); // Добавляем измененый ответ

        return $response;
    }
}
