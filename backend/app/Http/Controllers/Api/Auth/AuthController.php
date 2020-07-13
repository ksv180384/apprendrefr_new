<?php

namespace App\Http\Controllers\Api\Auth;

use App\Http\Controllers\Controller;

use App\Http\Requests\JsonData\Auth\RegisterFormRequest;
use App\Http\Requests\Api\Auth\RegistrationFormApiRequest;
use App\Models\User;
use App\Repositories\ForumMessageRepository;
use App\Repositories\ForumRepository;
use App\Repositories\StatisticRepository;
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
     * @var StatisticRepository
     */
    private $statisticRepository;

    /**
     * @var ForumMessageRepository
     */
    private $forumMessageRepository;

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
        $this->statisticRepository = app(StatisticRepository::class);
        $this->forumMessageRepository = app(ForumMessageRepository::class);
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
            return response()->json([
                    'error' => true,
                    'message' => 'Неверный логин или пароль.',
                ], 401);
        }

        if(empty(\Auth::user()->email_verified_at)){
            $this->guard()->logout();
            return response()->json([
                'error' => true,
                'message' => 'Вы не подтвердили ваш аккаунт.',
            ], 401);
        }

        // Присваеваем токену идентификатор пользователя
        $token_guest = $request->headers->get('app-user-token');
        if(!empty($token_guest)){
            User\Online::where('token', '=', $token_guest)->update([
                'user_id' => \Auth::id(),
            ]);
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
        $arr_user_data = array_merge(
            $request->only('email', 'login'),
            ['password' => bcrypt(md5($request->password))]
        );
        $user = User::create($arr_user_data);

        $configs_view = User\UserConfigsView::select(['id'])
                                                ->where('alias', '=', 'ne-pokazyvat-nikomu')
                                                ->first();

        User\UserConfig::create([
            'user_id' => $user->id,
            'day_birthday' => 1,
            'yar_birthday' => 1,
            'email' => $configs_view->id,
            'facebook' => $configs_view->id,
            'skype' => $configs_view->id,
            'twitter' => $configs_view->id,
            'vk' => $configs_view->id,
            'odnoklassniki' => $configs_view->id,
            'telegram' => $configs_view->id,
            'whatsapp' => $configs_view->id,
            'viber' => $configs_view->id,
            'instagram' => $configs_view->id,
            'youtube' => $configs_view->id,
            'info' => $configs_view->id,
            'residence' => $configs_view->id,
            'sex' => $configs_view->id,
        ]);
        User\UserInfo::create([
            'user_id' => $user->id,
        ]);


        return response()->json([
            'message' => 'Вы успешно прошли регистрацию. Вам на почту отправлено письмо для подтверждения регистрации.'
        ], 200);
    }

    /**
     * Log the user out (Invalidate the token).
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function logout(Request $request)
    {
        $this->guard()->logout();

        // Убираем идентификатор пользователя у токена
        $token_guest = $request->headers->get('app-user-token');
        if(!empty($token_guest)){
            User\Online::where('token', '=', $token_guest)->update([
                'user_id' => null,
            ]);
        }

        $online_users = $this->statisticRepository->getOnlineUsers();
        $count_users = count($online_users);
        $count_guests = $this->statisticRepository->countGuests();
        $count_users_register = $this->userRepository->countUsersRegister();
        $count_all = $count_users + $count_guests;
        $count_messages = $this->forumMessageRepository->countAll();

        return response()->json([
            'auth' => false,
            'user' => [],
            'statistic' => [
                'online_users' => $online_users,
                'count_guests' => $count_guests,
                'count_users' => $count_users,
                'count_all' => $count_all,
                'count_users_register' => $count_users_register,
                'count_messages' => $count_messages,
            ],
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
        $online_users = $this->statisticRepository->getOnlineUsers();
        $count_users = count($online_users);
        $count_guests = $this->statisticRepository->countGuests();
        $count_users_register = $this->userRepository->countUsersRegister();
        $count_all = $count_users + $count_guests;
        $count_messages = $this->forumMessageRepository->countAll();
        $user = $this->userRepository->getById(\Auth::id());
        if(empty($user)){
            return response()->json(['message' => 'Ошибка авторизации.'], 401);
        }

        return response()->json([
            'access_token' => $token,
            'token_type' => 'bearer',
            'expires_in' => $this->guard()->factory()->getTTL() * 60,
            'user_data' => [
                'auth' => \Auth::check(),
                'user' => $user->toArray(),
            ],
            'statistic' => [
                'online_users' => $online_users,
                'count_guests' => $count_guests,
                'count_users' => $count_users,
                'count_all' => $count_all,
                'count_users_register' => $count_users_register,
                'count_messages' => $count_messages,
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
            'data' => [],
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
