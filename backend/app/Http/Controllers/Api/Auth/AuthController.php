<?php

namespace App\Http\Controllers\Api\Auth;

use App\Http\Controllers\Controller;

use App\Http\Requests\JsonData\Auth\RegisterFormRequest;
use App\Http\Requests\Api\Auth\RegistrationFormApiRequest;
use App\Models\User;
use App\Repositories\UserRepository;
use Illuminate\Auth\EloquentUserProvider;
use Illuminate\Http\Request;
use Illuminate\Support\Str;

class AuthController extends Controller
{

    /**
     * @var UserRepository
     */
    private $userRepository;

    /**
     * Create a new AuthController instance.
     *
     * @return void
     */
    public function __construct()
    {
        $this->middleware('auth:api', [
            'except' => [
                'login',
                'registration',
                'register_page',
                'login_page'
            ]
        ]);
        $this->userRepository = app(UserRepository::class);
    }

    /**
     * Get a JWT via given credentials.
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function login(Request $request)
    {
        $credentialsEmail = $request->only('email', 'password');
        $credentialsEmail['password'] = md5($credentialsEmail['password']);
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

    public function registration(RegistrationFormApiRequest $request)
    {
        $user = User::create(array_merge(
            $request->only('email', 'login'),
            ['password' => bcrypt(md5($request->password))]
        ));


        return response()->json([
            'message' => 'Вы успешно прошли регистрацию. Для входа в систему используйте свой адрес электронной почты и пароль.'
        ], 200);
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
        return response()->json([
            'access_token' => $token,
            'token_type' => 'bearer',
            'expires_in' => $this->guard()->factory()->getTTL() * 60,
            'user_data' => [
                'auth' => \Auth::check(),
                'user' => $this->userRepository->getById(\Auth::id())->toArray(),
            ],
        ]);
    }

    public function login_page(){
        return response()->json([
            'auth' => \Auth::check(),
            'user' => \Auth::check() ? \Auth::user() : [],
            'title' => 'Авторизация',
            'description' => 'Авторизация',
            'keywords' => 'Авторизация',
            'footer' => [
                '2010 - ' . date('Y') . ' гг ApprendereFr.ru',
                'E-mail: admin@apprendrefr.ru'
            ],
        ]);
    }

    public function register_page(){
        return response()->json([
            'auth' => \Auth::check(),
            'user' => \Auth::check() ? \Auth::user() : [],
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
     * Get the guard to be used during authentication.
     *
     * @return \Illuminate\Contracts\Auth\Guard
     */
    public function guard()
    {
        return \Auth::guard();
    }
}
