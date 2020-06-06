<?php

namespace App\Http\Controllers\Api\User;

use App\Http\Controllers\Controller;
use App\Http\Requests\Api\User\ProfileUpdateRequest;
use App\Models\User;
use App\Repositories\UserRepository;
use App\Models\User\Sex;
use App\Models\User\UserConfigsView;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Http\UploadedFile;
use Illuminate\Support\Facades\Storage;

class UserController extends Controller
{

    /**
     * @var UserRepository
     */
    private $userRepository;


    public function __construct()
    {
        //$this->middleware('auth:api');
        $this->middleware('auth:api', [
            'except' => [] // методы с доступ неавторизованным пользователям
        ]);

        $this->userRepository = app(UserRepository::class);
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

        return response()->json([
            'title' => '',
            'description' => '',
            'keywords' => '',
            'footer' => [
                '2010 - ' . date('Y') . ' гг ApprendereFr.ru',
                'E-mail: admin@apprendrefr.ru'
            ],
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

        // Проверяем права пользователя на редактирование профиля
        if($id != \Auth::id() && $user->isAdmin()){
            return response()->json(["success" => "N", "message" => "У вас недостаточно прав для редактирования профиля."]);
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


        if(!$result){
            return response()->json(["success" => "N", "message" => "Ошибка при сохранении данных. Попробуйте позже."]);
        }
        return response()->json(["success" => "Y", "message" => "Данные успешно сохранены"]);
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
}
