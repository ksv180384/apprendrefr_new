<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class RegistrationController extends BaseController
{
    //
    public function index(){

        $meta = [
            'title' => 'Регистрация ' . $_SERVER['SERVER_NAME'],
            'description' => 'Регистрация ' . $_SERVER['SERVER_NAME'],
            'keywords' => 'регистрация ' . $_SERVER['SERVER_NAME'],
        ];

        return view('registration', compact('meta'));
    }

    public function lostPassword(){

        $meta = [
            'title' => 'Восстановление пароля ' . $_SERVER['SERVER_NAME'],
            'description' => 'Восстановление пароля ' . $_SERVER['SERVER_NAME'],
            'keywords' => 'Восстановление пароля ' . $_SERVER['SERVER_NAME'],
        ];

        return view('lost_password', compact('meta'));
    }
}
