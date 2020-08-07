<?php

namespace App\Http\Middleware;

use App\Models\User\Online;
use App\Repositories\ForumTopicRepository;
use Closure;
use Illuminate\Http\Response;
use Jaybizzle\CrawlerDetect\CrawlerDetect;

class OnlineUsers
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
        //var_export($request->page_load);
        //return $next($request);
        //sleep(2);
        if(empty($request->page_load)){
            return $next($request);
        }

        // Удаляем ползователей срок бездействия которых истек
        Online::where('date', '<', \DB::raw('(NOW() -  INTERVAL 7 MINUTE)'))->delete();

        //DELETE FROM `session` WHERE `putdate` < NOW() -  INTERVAL '7' MINUTE

        // Определяем является ли пользователь ботом
        $bot_name = '';
        $CrawlerDetect = new CrawlerDetect();
        if($CrawlerDetect->isCrawler()) {
            $bot_name = $CrawlerDetect->getMatches();
        }
        // Определяем был ли пользователь ранее на сайте по токену, если нет, то генерируем токен и
        // добавляем пользователя, если да, то обновляем данные
        $token = $request->headers->get('app-user-token');

        $online_user = Online::select('id')->where('token', '=', $token)->first();
        //var_export($token);
        if(!$online_user){
            $token = Online::generateToken();
            //$request->newUserToken = $token;
            //$request->headers->set('UserToken', $token);

            Online::create([
                'token' => $token,
                'user_id' => \Auth::id(),
                'ip' => $_SERVER['REMOTE_ADDR'],
                'is_bot' => !empty($bot_name) ? true : false,
                'bot_name' => !empty($bot_name) ? $bot_name : null,
                'date' => \DB::raw('NOW()'),
            ]);
        }else{
            Online::where('token', '=', $token)->update([
                'user_id' => \Auth::check() ? \Auth::id() : null,
                'ip' => $_SERVER['REMOTE_ADDR'],
                'is_bot' => !empty($bot_name) ? true : false,
                'bot_name' => !empty($bot_name) ? $bot_name : null,
                'date' => \DB::raw('NOW()'),
            ]);
        }

        $response = $next($request);

        $arr_response = json_decode($response->content(), true); // Получаем массив текущего ответа
        $arr_response['UserToken'] = $token; // Добавляем токен в ответ
        $response->setContent(json_encode($arr_response)); // Добавляем измененый ответ

        return $response;
    }
}
