<?php

namespace App\Http\Middleware;

use Closure;

class CheckUserConfirmedEmail
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
        if(!$request->user()->isConfirmed()){
            return response()->json([
                'message' => 'Ваша учетная запись не ативирована. Для активации перейдите по ссылке указанной в письме отправленном вам при регистрации.'
            ], 404);
        }

        return $next($request);
    }
}
