<?php

namespace App\Http\Controllers\Api\User;

use App\Http\Controllers\Api\BaseController;
use App\Http\Requests\Api\User\ProfileUpdateRequest;
use App\Mail\ConfirmEmail;
use App\Models\User;
use App\Repositories\ForumMessageRepository;
use App\Repositories\ProverbRepository;
use App\Repositories\StatisticRepository;
use App\Repositories\UserRepository;
use App\Models\User\Sex;
use App\Models\User\UserConfigsView;
use App\Repositories\WordRepository;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Http\UploadedFile;

class UserController extends BaseController
{

    /**
     * @var UserRepository
     */
    private $userRepository;

    /**
     * @var WordRepository
     */
    private $wordRepository;

    /**
     * @var StatisticRepository;
     */
    private $statisticRepository;

    /**
     * @var ForumMessageRepository
     */
    private $forumMessageRepository;

    /**
     * @var ProverbRepository
     */
    private $proverbRepository;

    public function __construct()
    {
        //$this->middleware('auth:api');
        $this->middleware('auth:api', [
            'except' => ['show', 'confirmEmail'] // методы с доступ неавторизованным пользователям
        ]);

        $this->userRepository = app(UserRepository::class);
        $this->wordRepository = app(WordRepository::class);
        $this->statisticRepository = app(StatisticRepository::class);
        $this->forumMessageRepository = app(ForumMessageRepository::class);
        $this->proverbRepository = app(ProverbRepository::class);
        parent::__construct();
    }
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        //
        $sex_list = [['id' => 0, 'title' => 'Нет' ]];
        $sex_list = array_merge($sex_list, Sex::select('id', 'title')->orderBy('id', 'asc')->get()->toArray());
        $config_user_data_view_list = UserConfigsView::all();
        $words_list = $this->wordRepository->getRandomWords();

        return response()->json([
            'title' => 'Ваш профиль | ' . $_SERVER['HTTP_HOST'],
            'description' => 'Ваш профиль | ' . $_SERVER['HTTP_HOST'],
            'keywords' => 'Ваш профиль | ' . $_SERVER['HTTP_HOST'],
            'footer' =>[
                $this->yar_life,
                self::EMAIL,
            ],
            'words_list' => $words_list,
            'data' => [
                'config_user_data_view_list' => $config_user_data_view_list,
                'sex_list' => $sex_list,
            ],
            'user' => \Auth::user() ? $this->userRepository->getById(\Auth::id())->toArray() : [],
            'auth' => \Auth::check(),
        ]);
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        //
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        //
        $user = $this->userRepository->getById((int)$id);
        if(empty($user)){
            return response()->json(['message' => 'Неверный идентификатор пользователя.'], 404);
        }
        $words_list = $this->wordRepository->getRandomWords();
        $proverb = $this->proverbRepository->getRandomProverb(1)[0];

        $online_users = $this->statisticRepository->getOnlineUsers();
        $count_users = count($online_users);
        $count_guests = $this->statisticRepository->countGuests();
        $count_users_register = $this->userRepository->countUsersRegister();
        $count_all = $count_users + $count_guests;
        $count_messages = $this->forumMessageRepository->countAll();

        return response()->json([
            'title' => $user->login . ' - профиль пользователя',
            'description' => $user->login . ' - профиль пользователя',
            'keywords' => $user->login . ' - профиль пользователя',
            'footer' => [
                $this->yar_life,
                self::EMAIL,
            ],
            'proverb' => $proverb,
            'data' => [
                'user' => $user,
            ],
            'user' => \Auth::user() ? $this->userRepository->getById(\Auth::id())->toArray() : [],
            'auth' => \Auth::check(),
            'words_list' => $words_list,
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
     * Показывает список пользователей
     *
     * @return \Illuminate\Http\Response
     */
    public function listUsers()
    {
        //
        $users = $this->userRepository->getList();
        if(empty($users->toArray()['data'])){
            return response()->json(['message' => 'Неверный идентификатор пользователя.'], 404);
        }

        $words_list = $this->wordRepository->getRandomWords();
        $proverb = $this->proverbRepository->getRandomProverb(1)[0];

        $online_users = $this->statisticRepository->getOnlineUsers();
        $count_users = count($online_users);
        $count_guests = $this->statisticRepository->countGuests();
        $count_users_register = $this->userRepository->countUsersRegister();
        $count_all = $count_users + $count_guests;
        $count_messages = $this->forumMessageRepository->countAll();

        return response()->json([
            'title' => 'Список пользователей',
            'description' => 'Список пользователей',
            'keywords' => 'Список пользователей',
            'footer' => [
                $this->yar_life,
                self::EMAIL,
            ],
            'proverb' => $proverb,
            'data' => [
                'users' => $users,
            ],
            'user' => \Auth::user() ? $this->userRepository->getById(\Auth::id())->toArray() : [],
            'auth' => \Auth::check(),
            'words_list' => $words_list,
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

    public function getUsersListPaginate(){
        $users = $this->userRepository->getList();

        if(count($users) == 0){
            return response()->json(['message' => 'Такой страницы не существует.'], 404);
        }

        return response()->json([
            'title' => 'Список пользователей (стр ' . $users->toArray()['current_page'] . ')',
            'description' => 'Список пользователей (стр ' . $users->toArray()['current_page'] . ')',
            'keywords' => 'Список пользователей (стр ' . $users->toArray()['current_page'] . ')',
            'users' => $users,
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function edit($id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(ProfileUpdateRequest $request, $id)
    {
        //
        $data = $request->only('email', 'sex', 'birthday', 'info', 'signature', 'residence');
        $contacts = $request->only(
            'facebook', 'odnoklassniki', 'twitter', 'vk', 'youtube', 'instagram',
            'skype', 'telegram', 'whatsapp', 'viber'
        );
        $infoView = $request->only(
            'email_view', 'info_view', 'residence_view', 'sex_view', 'facebook_view', 'odnoklassniki_view',
            'twitter_view', 'vk_view', 'youtube_view', 'instagram_view', 'skype_view', 'telegram_view',
            'whatsapp_view', 'viber_view'
        );
        // Преименуем ключи массива, что б было проще отдать массив для записи в БД
        $infoViewNew = [];
        foreach ($infoView as $k=>$item){
            $key = str_replace('_view', '', $k);
            $infoViewNew[$key] = (int)$item;
        }
        $infoViewNew = array_merge($infoViewNew, $request->only('day_birthday', 'yar_birthday'));
        // Если поля нет ставим значение по умолчанию
        $infoViewNew['day_birthday'] = !empty($infoViewNew['day_birthday']) ?: 0;
        $infoViewNew['yar_birthday'] = !empty($infoViewNew['yar_birthday']) ?: 0;

        $user = $this->userRepository->getUser($id);
        if($user->email != $data['email']){
            $data['email_verified_at'] = null;
            $data['confirm_token'] = User::generateConfirmedToken();
        }

        // Проверяем права пользователя на редактирование профиля
        if($id != \Auth::id() && $user->isAdmin()){
            return response()->json(["success" => "N", "message" => "У вас недостаточно прав для редактирования профиля."]);
        }

        if(empty($user->email_verified_at)){
            if($user->email != $data['email']) {
                User::whereId($id)->update([
                    'email_verified_at' => null,
                    'confirm_token' => User::generateConfirmedToken(),
                    'email' => $data['email'],
                ]);
            }
            $user = $this->userRepository->getById($id);
            return response()->json([
                'message' => 'У вас не пдтвержден email. В профиле доступен для редактирования только email.',
                'data' => [
                    'user' => $user,
                ],
            ]);
        }

        if($request->hasFile('avatarImg')){
            // Выставляем флаг дла получения данных без воздействия мутаторов
            $user->preventAttrGet = true;
            $oldAvatar = $user->avatar;
            $file = $request->file('avatarImg');

            if($file_path = $this->uploadFile($file, 'uploads/users/' . \Auth::id())){
                $data['avatar'] = $file_path;
            }
            // Удаляем старый аватар
            if($oldAvatar){
                @unlink(public_path(trim($oldAvatar, '/')));
            }
        }

        // Сохраняем новые данные пользователя
        $result = User::whereId($id)->update($data);
        User\UserConfig::find($id)->update($infoViewNew);
        User\UserInfo::find($id)->update($contacts);


        $user = $this->userRepository->getById($id);

        if(!$result){
            return response()->json(['message' => 'Ошибка при сохранении данных. Попробуйте позже.']);
        }
        return response()->json([
            'message" => "Данные успешно сохранены',
            'data' => [
                'user' => $user,
            ],
        ]);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        //
    }

    private function uploadFile(UploadedFile $file, $path = ''){
        if($path){
            $path = '/' . trim($path, '/');
        }else{
            $path = '/';
        }

        $result = $file->store($path, 'public');

        return $result;
    }


    public function sendConfirmEmail(){

        $user = $this->userRepository->getById(\Auth::id());
        $from = Carbon::parse($user->send_verified_email_at);
        $to = Carbon::now();
        $diff_in_min = $to->diffInMinutes($from);
        //var_export($diff_in_hours);
        if($user->send_verified_email_at && $diff_in_min < 5){
            return response()->json(['message' => 'Сообщение можно отправить раз в 5 мин. (прошло ' . $diff_in_min . ' мин.)'], 404);
        }

        \Mail::to($user)->send(new ConfirmEmail($user));

        \Auth::user()->update([
            'send_verified_email_at' => Carbon::now(),
        ]);
        return response()->json([
            'message' => 'Письмо для подтверждения регистрации успешно отправлено на email: ' . $user->email
        ]);
    }

    public function confirmEmail($token){
        $user = User::select('id')->where('confirm_token', '=', $token)->whereNull('email_verified_at')->first();
        if(empty($user)){
            return response()->json([
                'message' => 'Ошибка при подтверждении email. Неверный токен.',
                'title' => 'Подтверждение email',
                'description' => 'Подтверждение email',
                'keywords' => 'Подтверждение email',
                'data' => [],
                'footer' => [
                    $this->yar_life,
                    self::EMAIL,
                ],
                'user' => \Auth::user() ? $this->userRepository->getById(\Auth::id())->toArray() : [],
                'auth' => \Auth::check(),
            ]);
        }

        $user->update(['email_verified_at' => Carbon::now()]);

        return response()->json([
            'message' => 'Вы успешно подтвердили email.',
            'title' => 'Подтверждение email',
            'description' => 'Подтверждение email',
            'keywords' => 'Подтверждение email',
            'data' => [],
            'footer' => [
                $this->yar_life,
                self::EMAIL,
            ],
            'user' => \Auth::user() ? $this->userRepository->getById(\Auth::id())->toArray() : [],
            'auth' => \Auth::check(),
        ]);
    }
}
