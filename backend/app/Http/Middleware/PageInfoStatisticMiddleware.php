<?php

namespace App\Http\Middleware;

use App\Services\ForumMessageService;
use App\Services\StatisticService;
use App\Services\UserService;
use Closure;
use Illuminate\Http\Request;
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

        $currentData = $response->getData();

        $statisticService = new StatisticService();
        $userService = new UserService();
        $forumMessageService = new ForumMessageService();

        $usersOnline = $statisticService->onlineUsers();
        $usersOnlineCount = $usersOnline->count();
        $guestsCount = $statisticService->countGuests();
        $usersRegisterCount = $userService->countUsersRegister();
        $usersOnlineAllCount = $usersOnlineCount + $guestsCount;
        $countAllMessages = $forumMessageService->countMessagesAll();

        $currentData->statistic = [
            'online_users' => $usersOnline,
            'count_users' => $usersOnlineCount,
            'count_guests' => $guestsCount,
            'count_users_register' => $usersRegisterCount,
            'count_all' => $usersOnlineAllCount,
            'count_messages' => $countAllMessages,
        ];

        $response->setData($currentData);

        return $response;
    }
}
