<?php

namespace App\Http\Controllers\JsonData\Auth;

use App\Http\Controllers\Controller;
use App\Http\Requests\JsonData\Auth\RegisterFormRequest;
use App\User;
use Illuminate\Http\Request;

class RegisterController extends Controller
{
    public function index(){
        return response()->json([
            'title' => 'Регистрация',
            'description' => 'Регистрация',
            'keywords' => 'Регистрация',
            'footer' => [
                '2010 - ' . date('Y') . ' гг ApprendereFr.ru',
                'E-mail: admin@apprendrefr.ru'
            ],
        ]);
    }

    /**
     * Handle the incoming request.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function registration(RegisterFormRequest $request)
    {
        //
        $user = User::create(array_merge(
            $request->only('email'),
            ['password' => bcrypt($request->password)]
        ));

        return response()->json([
            'message' => 'Вы успешно прошли регистрацию. Для входа в систему используйте свой адрес электронной почты и пароль.'
        ], 200);
    }
}
