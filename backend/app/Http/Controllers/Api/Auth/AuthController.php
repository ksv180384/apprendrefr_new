<?php

namespace App\Http\Controllers\Api\Auth;

use App\Http\Controllers\Api\BaseController;
use App\Http\Requests\Api\Auth\ChangePasswordRequest;
use App\Http\Requests\Api\Auth\RegistrationFormApiRequest;
use App\Mail\ConfirmEmail;
use App\Mail\LostPassword;
use App\Mail\OrderShippedLostPassword;
use App\Models\User\User;
use App\Services\ForumMessageService;
use App\Services\StatisticService;
use App\Services\UserService;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Support\Str;

class AuthController extends BaseController
{

    /**
     * @var UserService
     */
    private $userService;

    /**
     * @var StatisticService
     */
    private $statisticService;

    /**
     * @var ForumMessageService
     */
    private $forumMessageService;

    /**
     * Create a new AuthController instance.
     *
     * @return void
     */
    public function __construct(
        UserService $userService,
        StatisticService $statisticService,
        ForumMessageService $forumMessageService
    )
    {
        $this->middleware('auth:api', [
            'except' => [
                'login',
                'registration',
                'registerPage',
                'loginPage',
                'confirmEmail',
                'lostPassword',
                'changePassword',
                'lostPasswordPage',
                'changePassword',
                'changePasswordPage',
            ]
        ]);

        parent::__construct();
        $this->userService = $userService;
        $this->statisticService = $statisticService;
        $this->forumMessageService = $forumMessageService;
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
        $confirm_token = User::generateConfirmedToken();
        $rang = User\Rang::select(['id'])->where('alias', '=', 'polzovatel')->first();

        $arr_user_data = array_merge(
            $request->only('email', 'login'),
            [
                'password' => bcrypt(md5($request->password)),
                'confirm_token' => $confirm_token,
                'rang' => $rang->id,
            ]
        );
        $user = User::create($arr_user_data);

        $configs_view = User\UserConfigsView::select(['id'])
                                                ->where('alias', '=', 'ne-pokazyvat-nikomu')
                                                ->first();

        User\UserConfig::create([
            'user_id' => $user->id,
            'day_birthday' => 0,
            'yar_birthday' => 0,
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

        \Mail::to($user)->send(new ConfirmEmail($user));

        $user->update([
            'send_verified_email_at' => Carbon::now(),
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

        $online_users = $this->statisticService->onlineUsers();
        $count_users = count($online_users);
        $count_guests = $this->statisticService->countGuests();
        $count_users_register = $this->userService->countUsersRegister();
        $count_all = $count_users + $count_guests;
        $count_messages = $this->forumMessageService->countMessagesAll();

        return response()->json([
            'auth' => false,
            'user' => null,
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
        $onlineUsers = $this->statisticService->onlineUsers();
        $countUsers = $onlineUsers->count();
        $countGuests = $this->statisticService->countGuests();
        $countUsersRegister = $this->userService->countUsersRegister();
        $countAll = $countUsers + $countGuests;
        $countMessages = $this->forumMessageService->countMessagesAll();
        $user = \Auth::check() ? \Auth::user()->load('rang') : null;
        if(empty($user)){
            return response()->json(['message' => 'Ошибка авторизации.'], 401);
        }

        return response()->json([
            'access_token' => $token,
            'token_type' => 'bearer',
            'expires_in' => $this->guard()->factory()->getTTL() * 60,
            'user_data' => [
                'auth' => \Auth::check(),
                'user' => $user,
            ],
            'statistic' => [
                'online_users' => $onlineUsers,
                'count_guests' => $countGuests,
                'count_users' => $countUsers,
                'count_all' => $countAll,
                'count_users_register' => $countUsersRegister,
                'count_messages' => $countMessages,
            ],
        ]);
    }

    public function loginPage(){
        $user = \Auth::check() ? \Auth::user()->load('rang') : null;

        return response()->json([
            'auth' => \Auth::check(),
            'user' => $user,
            'title' => 'Авторизация',
            'description' => 'Авторизация',
            'keywords' => 'Авторизация',
            'footer' => [
                $this->yar_life,
                self::EMAIL,
            ],
        ]);
    }

    /**
     * Страница регистрации
     * @return \Illuminate\Http\JsonResponse
     */
    public function registerPage(){

        return response()->json([
            'auth' => \Auth::check(),
            'user' => \Auth::check() ? \Auth::user() : [],
            'title' => 'Регистрация',
            'description' => 'Регистрация',
            'keywords' => 'Регистрация',
            'data' => [
                'terms_user' => view('registration.terms_user')->render(),
                'privacy_policy' => view('registration.privacy_policy')->render(),
            ],
            'footer' => [
                $this->yar_life,
                self::EMAIL,
            ],
        ]);
    }

    public function confirmEmail($token){

        $user = User::where('confirm_token', '=', $token)->update([
            'email_verified_at' => Carbon::now(),
            'send_verified_email_at' => Carbon::now(),
        ]);

        if(empty($user)){
            return response()->json([
                'message' => 'Не найден email для подтверждения.',
            ], 404);
        }
        return response()->json([
            'message' => 'Вы успешно подтвердили email.',
        ]);
    }

    public function lostPasswordPage(Request $request){
        $user = \Auth::check() ? \Auth::user() : null;

        return response()->json([
            'title' => 'Восстановление пароля',
            'description' => 'Восстановление пароля',
            'keywords' => 'Восстановление пароля',
            'data' => [],
            'footer' => [
                $this->yar_life,
                self::EMAIL,
            ],
            'user' => $user,
            'auth' => \Auth::check(),
        ]);
    }

    public function lostPassword(Request $request){
        $user = User::select(['id', 'login', 'email'])->where('email', '=', $request->email)->first();

        if(empty($user)){
            return response()->json([
                'message' => 'Пользователь с заданным email не найден.',
            ], 404);
        }

        $lostPass = User\LostPassword::select(['id', 'user_id', 'date'])
                        ->where('user_id', '=', $user->id)
                        ->orderBy('date', 'DESC')->first();
        if(!empty($lostPass)){
            $from = Carbon::parse($lostPass->date);
            $to = Carbon::now();
            $diff_in_min = $to->diffInMinutes($from);
            if($diff_in_min < 10){
                return response()->json(['message' => 'Данная операция доступна раз в 10 мин. (прошло ' . $diff_in_min . ' мин.)'], 404);
            }
        }

        $token = Str::random(90);
        $lostPassword = User\LostPassword::create([
            'user_id' => $user->id,
            'token' => $token,
            'date' => Carbon::now(),
        ]);
        if(empty($lostPassword)){
            return response()->json([
                'message' => 'Ошибка при формировании заявки. Попробуйте позже.',
            ], 404);
        }
        \Mail::to($user)->send(new LostPassword($lostPassword->token));
        return response()->json([
            'message' => 'На почту ' . $user->email . ' отправлено письмо со ссылкой для восстановления пароля.',
        ]);
    }

    public function changePasswordPage(Request $request){
        $user = \Auth::check() ? \Auth::user() : null;

        return response()->json([
            'title' => 'Смена пароля',
            'description' => 'Смена пароля',
            'keywords' => 'Смена пароля',
            'data' => [],
            'footer' => [
                $this->yar_life,
                self::EMAIL,
            ],
            'user' => $user,
            'auth' => \Auth::check(),
        ]);
    }

    public function changePassword(ChangePasswordRequest $request){
        $lostPassword = User\LostPassword::select('id', 'user_id', 'token', 'date')
                                            ->where('token', '=', $request->token)
                                            ->where('used', '=', false)
                                            ->orderBy('date', 'DESC')->first();
        if(empty($lostPassword)){
            return response()->json([
                'message' => 'Неверная заявка на смену пароля.',
            ], 404);
        }
        $from = Carbon::parse($lostPassword->date);
        $to = Carbon::now();
        $diff_in_min = $to->diffInMinutes($from);
        if($diff_in_min > 15){
            return response()->json(['message' => 'Заявка на смену пароля устарела. Сделайте новый запрос на смену пароля.'], 404);
        }

        $exc = false;
        try{
            \DB::transaction(function() use ($lostPassword, $request) {
                $lostPassword->user->update([
                    'password' => bcrypt(md5($request->password)),
                ]);
                $lostPassword->update([
                    'used' => true
                ]);
            });
        }catch (\Exception $exception){
            $exc = true;
        }

        if(!empty($exc)){
            return response()->json(['message' => 'Ошибка при смене пароля. Попробуйте позже.'], 404);
        }

        return response()->json([
            'message' => 'Пароль успешно изменен.',
        ]);
    }

    public function profileChangePassword(ChangePasswordRequest $request){
        if(!\Auth::check()){
            return response()->json(['message' => 'Вы не авторизованы. Обновите страницу и авторизуйтесь.'], 404);
        }


        if(!password_verify(md5($request->old_password), \Auth::user()->password)){
            return response()->json(['message' => 'Неверный пароль.'], 404);
        }

        \Auth::user()->update([
            'password' => bcrypt(md5($request->password)),
        ]);

        return response()->json([
            'message' => 'Пароль успешно изменен.',
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
