<?php

namespace App\Http\Controllers\Api\V1\Auth;

use App\Http\Controllers\Controller;
use App\Http\Requests\Api\V1\Auth\RegisterRequest;
use App\Mail\ConfirmEmail;
use App\Models\User\Rang;
use App\Models\User\User;
use App\Models\User\UserConfig;
use App\Models\User\UserConfigsView;
use App\Models\User\UserInfo;
use App\Providers\RouteServiceProvider;
use Carbon\Carbon;
use Illuminate\Foundation\Auth\RegistersUsers;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Response;

class RegisterController extends Controller
{
    /*
    |--------------------------------------------------------------------------
    | Register Controller
    |--------------------------------------------------------------------------
    |
    | This controller handles the registration of new users as well as their
    | validation and creation. By default this controller uses a trait to
    | provide this functionality without requiring any additional code.
    |
    */

    use RegistersUsers;

    /**
     * Where to redirect users after registration.
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
        $this->middleware('guest');
    }


    /**
     * Create a new user instance after a valid registration.
     *
     * @param  RegisterRequest  $request
     * @return JsonResponse
     */
    protected function register(RegisterRequest $request)
    {
        $confirmToken = User::generateConfirmedToken();
        $rang = Rang::select(['id'])->where('alias', '=', 'polzovatel')->first();

        $newUser = User::create([
            'login' => $request->login,
            'email' => $request->email,
            'password' => bcrypt(md5($request->password)),
            'gender_id' => $request->gender_id,
            'rang_id' => $rang->id,
            'confirm_token' => $confirmToken,
        ]);

        $configsView = UserConfigsView::where('alias', '=', 'ne-pokazyvat-nikomu')->first(['id']);

        UserConfig::create([
            'user_id' => $newUser->id,
            'day_birthday' => 0,
            'yar_birthday' => 0,
            'email' => $configsView->id,
            'facebook' => $configsView->id,
            'skype' => $configsView->id,
            'twitter' => $configsView->id,
            'vk' => $configsView->id,
            'odnoklassniki' => $configsView->id,
            'telegram' => $configsView->id,
            'whatsapp' => $configsView->id,
            'viber' => $configsView->id,
            'instagram' => $configsView->id,
            'youtube' => $configsView->id,
            'info' => $configsView->id,
            'residence' => $configsView->id,
            'sex' => $configsView->id,
        ]);

        UserInfo::create([
            'user_id' => $newUser->id,
        ]);

        \Mail::to($newUser)->send(new ConfirmEmail($newUser));

        $newUser->update([
            'send_verified_email_at' => Carbon::now(),
        ]);

        return response()->json([
            'message' => [
                'ru' => 'Вы успешно прошли регистрацию. Вам на почту отправлено письмо для подтверждения регистрации.',
                'fr' => '',
            ]
        ], Response::HTTP_CREATED);
    }
}
