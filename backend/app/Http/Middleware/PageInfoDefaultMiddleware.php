<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
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

        $currentData = $response->getData();

        $isAuth = \Auth::check();
        $user = $isAuth ? \Auth::user()->load('rang') : null;
        $currentData->footer = [
            '2010 - ' . date('Y') . ' гг ' . config('app.name'),
            config('app.email'),
        ];
        $currentData->user = $user;
        $currentData->auth = \Auth::check();

        $response->setData($currentData);

        return $response;
    }
}
