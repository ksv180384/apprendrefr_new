<?php

namespace App\Http\Middleware;

use App\Models\User\Online;
use Closure;
use Illuminate\Http\Request;
use Jaybizzle\CrawlerDetect\CrawlerDetect;

class OnlineUsersMiddleware
{
    /**
     * Handle an incoming request.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \Closure  $next
     * @return mixed
     */
    public function handle($request, Closure $next)
    {
//        if (env('APP_ENV') === 'testing') {
//            return $next($request);
//        }

        // Удаляем ползователей срок бездействия которых истек
        Online::where('date', '<', \DB::raw('(NOW() -  INTERVAL 7 MINUTE)'))->delete();

        // Определяем является ли пользователь ботом
        $botName = '';
        $CrawlerDetect = new CrawlerDetect();
        if($CrawlerDetect->isCrawler()) {
            $botName = $CrawlerDetect->getMatches();
        }
        // Определяем был ли пользователь ранее на сайте по токену, если нет, то генерируем токен и
        // добавляем пользователя, если да, то обновляем данные
        $token = $request->headers->get('App-User-Token');

        $currentUserId = \Auth::check() ? \Auth::id() : null;
        $onlineUser = Online::where('token', '=', $token)->first();

        if(!$onlineUser){
            $token = Online::generateToken();

            Online::create([
                'token' => $token,
                'user_id' => $currentUserId,
                'ip' => $_SERVER['REMOTE_ADDR'] ?? '',
                'is_bot' => !empty($botName),
                'bot_name' => !empty($botName) ? $botName : null,
                'date' => now(),
            ]);
        }else{
            $onlineUser->update([
                'user_id' => $currentUserId,
                'ip' => $_SERVER['REMOTE_ADDR'] ?? '',
                'is_bot' => !empty($botName),
                'bot_name' => !empty($botName) ? $botName : null,
                'date' => now(),
            ]);
        }

        $response = $next($request);

//        $currentData = $response->getData();
//        $currentData->app_user_token = $token;
//        $response->setData($currentData);

        $arrResponse = json_decode($response->content(), true); // Получаем массив текущего ответа
        $arrResponse['app_user_token'] = $token; // Добавляем токен в ответ
        $response->setContent(json_encode($arrResponse)); // Добавляем измененый ответ

        return $response;
    }
}
