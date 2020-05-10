<?php

namespace App\Http\Controllers\JsonData\Auth;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

class LoginController extends Controller
{
    /**
     * Handle the incoming request.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function __invoke(Request $request)
    {
        //
        $credentialsEmail = $request->only('email', 'password');
        $credentialsLogin = ['login' => $credentialsEmail['email'], 'password' => $credentialsEmail['password']];

        // При неудачной авторизации отправляем сообщение об ошибке
        if (!\Auth::attempt($credentialsEmail) && !\Auth::attempt($credentialsLogin)) {
            return response()->json([
                'message' => 'Неверный логин или пароль.',
                'errors' => 'Unauthorised'
            ], 401);
        }

        return response()->json([
            'message' => 'Вы успешно авторизовались.',
            'user_data' => [
                'user' => \Auth::user()->toArray(),
                'auth' => true
                ],
            ], 200);
    }

}
