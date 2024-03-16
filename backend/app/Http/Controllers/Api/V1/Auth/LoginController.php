<?php

namespace App\Http\Controllers\Api\V1\Auth;

use App\Http\Controllers\Controller;
use App\Http\Requests\Api\V1\Auth\LoginRequest;
use App\Models\User\Online;
use App\Providers\RouteServiceProvider;
use Illuminate\Foundation\Auth\AuthenticatesUsers;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Http\Response;
use Illuminate\Support\Facades\Auth;

class LoginController extends Controller
{
    /*
    |--------------------------------------------------------------------------
    | Login Controller
    |--------------------------------------------------------------------------
    |
    | This controller handles authenticating users for the application and
    | redirecting them to your home screen. The controller uses a trait
    | to conveniently provide its functionality to your applications.
    |
    */

    use AuthenticatesUsers;

    /**
     * Where to redirect users after login.
     *
     * @var string
     */
    protected $redirectTo = RouteServiceProvider::HOME;

    /**
     * Create a new controller instance.
     *
     * @return void
     */
    public function __construct()
    {
        $this->middleware('guest')->except('logout');
    }

    public function authenticate(LoginRequest $request): JsonResponse
    {
        $remember = $request->boolean('remember');

        if (Auth::attempt($request->getCredentials(), $remember)) {
            session()->regenerate();

            // Присваеваем токену идентификатор пользователя
            $tokenGuest = $request->headers->get('app-user-token');
            if(!empty($tokenGuest)){
                Online::where('token', '=', $tokenGuest)->update([
                    'user_id' => \Auth::id(),
                ]);
            }else{
                $token = Online::generateToken();
                Online::create([
                    'token' => $token,
                    'user_id' => \Auth::id(),
                ]);
            }

            return response()->json([
                'message' => [
                    'ru' => 'Успешная авторизация.',
                    'fr' => '',
                ],
            ]);
        }

        return response()->json([
            'message' => [
                'ru' => 'Неверный логин или пароль.',
                'fr' => '',
            ],
        ], Response::HTTP_UNPROCESSABLE_ENTITY);
    }

    public function logout(Request $request)
    {
        $this->guard()->logout();

        // Убираем идентификатор пользователя у токена
        $token_guest = $request->headers->get('app-user-token');
        if(!empty($token_guest)){
            Online::where('token', '=', $token_guest)->update([
                'user_id' => null,
            ]);
        }

        return response()->json([
            'message' => [
                'ru' => 'Успешный выход из аккаунта.',
                'fr' => '',
            ],
        ]);
    }
}
