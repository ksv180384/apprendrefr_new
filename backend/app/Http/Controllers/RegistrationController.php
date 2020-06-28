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
            'title' => 'Забыли пароль? ' . $_SERVER['SERVER_NAME'],
            'description' => 'Забыли пароль? ' . $_SERVER['SERVER_NAME'],
            'keywords' => 'Забыли пароль? ' . $_SERVER['SERVER_NAME'],
        ];

        return view('lost_password', compact('meta'));
    }
}
