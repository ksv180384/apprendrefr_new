<?php

namespace App\Http\Controllers\Api\Auth;

use App\Http\Controllers\Controller;

use App\Models\User\UserToken;
use Illuminate\Auth\EloquentUserProvider;
use Illuminate\Http\Request;
use Illuminate\Support\Str;

class AuthController extends Controller
{
    /**
     * Create a new AuthController instance.
     *
     * @return void
     */
    public function __construct()
    {
        $this->middleware('auth:api', ['except' => ['login']]);
    }

    /**
     * Get a JWT via given credentials.
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function login(Request $request)
    {
        /*
        $credentials = request(['email', 'password']);

        if (!$token = \Auth::attempt($credentials)) {
            return response()->json(['error' => 'Unauthorized'], 401);
        }

        return $this->respondWithToken($token);
//*/
        /*
        $credentialsEmail = $request->only('email', 'password');
        $credentialsLogin = ['login' => $credentialsEmail['email'], 'password' => $credentialsEmail['password']];

        // При неудачной авторизации отправляем сообщение об ошибке
        if (!\Auth::attempt($credentialsEmail) && !\Auth::attempt($credentialsLogin)) {
            return response()->json([
                'message' => 'Неверный логин или пароль.',
                'errors' => 'Unauthorised'
            ], 401);
        }

        $token = Str::random(80);
        if(!UserToken::create(['token' => $token, 'id_user' => \Auth::id()])){
            return response()->json([
                'message' => 'Ошибка при авторизации. Попробуйте позже.',
                'errors' => 'Unauthorised'
            ], 401);
        }

        return $this->respondWithToken($token);
//*/
        $credentialsEmail = $request->only('email', 'password');
        $credentialsLogin = ['login' => $credentialsEmail['email'], 'password' => $credentialsEmail['password']];

        if (!($token = $this->guard()->attempt($credentialsLogin)) && !($token = $this->guard()->attempt($credentialsEmail))) {
            return response()->json(['error' => 'Unauthorized'], 401);
        }

        return $this->respondWithToken($token);
    }

    /**
     * Get the authenticated User.
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function me()
    {
        return response()->json($this->guard()->user());
        //return response()->json(['mess' => 'ok']);
    }

    /**
     * Log the user out (Invalidate the token).
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function logout()
    {
        $this->guard()->logout();

        return response()->json([
            'auth' => false,
            'user' => [],
        ]);
    }

    /**
     * Refresh a token.
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function refresh()
    {
        return $this->respondWithToken($this->guard()->refresh());
    }

    /**
     * Get the token array structure.
     *
     * @param  string $token
     *
     * @return \Illuminate\Http\JsonResponse
     */
    protected function respondWithToken($token)
    {
        /*
        return response()->json([
            'access_token' => $token,
            'token_type' => 'bearer',
            //'expires_in' => auth()->factory()->getTTL() * 60,
            'user_data' => [
                'auth' => true,
                'user' => \Auth::user()->toArray(),
            ],
        ], 200);
        */
        return response()->json([
            'access_token' => $token,
            'token_type' => 'bearer',
            'expires_in' => $this->guard()->factory()->getTTL() * 60,
            'user_data' => [
                'auth' => \Auth::check(),
                'user' => \Auth::user()->toArray(),
            ],
        ]);
    }

    /**
     * Get the guard to be used during authentication.
     *
     * @return \Illuminate\Contracts\Auth\Guard
     */
    public function guard()
    {
        return \Auth::guard();
    }
}
