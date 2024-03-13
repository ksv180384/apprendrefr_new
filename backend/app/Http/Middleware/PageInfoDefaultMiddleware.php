<?php

namespace App\Http\Middleware;

use App\Http\Resources\Api\V1\UserResource;
use Closure;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Symfony\Component\HttpFoundation\Response;

class PageInfoDefaultMiddleware
{
    /**
     * Handle an incoming request.
     *
     * @param  \Closure(\Illuminate\Http\Request): (\Symfony\Component\HttpFoundation\Response)  $next
     */
    public function handle(Request $request, Closure $next): Response
    {
        $response = $next($request);

        if($response instanceof RedirectResponse){
            return $response;
        }

//        $isAuth = \Auth::check();
//        $user = $isAuth ? \Auth::user()->load('rang') : null;
//        $currentData->footer = [
//            '2010 - ' . date('Y') . ' гг ' . config('app.name'),
//            config('app.email'),
//        ];
//        $currentData->user = $user;
//        $currentData->auth = \Auth::check();

//        $currentData = $response->getData();
//        $currentData->user = Auth::check() ? UserResource::make(Auth::user()) : null;
//        $response->setData($currentData);

        $arrResponse = json_decode($response->content(), true); // Получаем массив текущего ответа
        $arrResponse['user'] = Auth::check() ? UserResource::make(Auth::user()) : null;
        $response->setContent(json_encode($arrResponse)); // Добавляем измененый ответ


        return $response;
    }
}
