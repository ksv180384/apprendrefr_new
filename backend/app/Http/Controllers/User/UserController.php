<?php

namespace App\Http\Controllers\User;

use App\Http\Controllers\BaseController;
use App\Repositories\UserRepository;
use Illuminate\Http\Request;

class UserController extends BaseController
{
    /**
     * @var UserRepository
     */
    private $userRepository;

    public function __construct()
    {
        $this->userRepository = app(UserRepository::class);
        parent::__construct();
    }

    public function index()
    {

        $meta = [
            'title' => 'Ваш профиль | ' . $_SERVER['HTTP_HOST'],
            'description' => 'Ваш профиль | ' . $_SERVER['HTTP_HOST'],
            'keywords' => 'Ваш профиль | ' . $_SERVER['HTTP_HOST'],
        ];

        return view('index', compact('meta'));
    }

    public function show($id)
    {
        //
        $user = $this->userRepository->getById((int)$id);

        $meta = [
            'title' => $user->login . ' - профиль пользователя',
            'description' => $user->login . ' - профиль пользователя',
            'keywords' => $user->login . ' - профиль пользователя',
        ];

        return view('index', compact('meta'));
    }

    public function listUsers()
    {
        //
        $meta = [
            'title' => 'Список пользователей',
            'description' => 'Список пользователей',
            'keywords' => 'Список пользователей',
        ];

        return view('index', compact('meta'));
    }

    public function confirmEmail()
    {
        //
        $meta = [
            'title' => 'Подтверждение регистрации ' . $_SERVER['HTTP_HOST'],
            'description' => 'Подтверждение регистрации ' . $_SERVER['HTTP_HOST'],
            'keywords' => 'Подтверждение регистрации ' . $_SERVER['HTTP_HOST'],
        ];

        return view('index', compact('meta'));
    }

    public function changePassword()
    {
        //
        $meta = [
            'title' => 'Смена пароля ' . $_SERVER['HTTP_HOST'],
            'description' => 'Смена пароля ' . $_SERVER['HTTP_HOST'],
            'keywords' => 'Смена пароля ' . $_SERVER['HTTP_HOST'],
        ];

        return view('index', compact('meta'));
    }
}
