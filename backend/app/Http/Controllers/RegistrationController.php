<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class RegistrationController extends BaseController
{
    //
    public function index(){

        $title = 'Регистрация';

        return view('registration', compact('title'));
    }

    public function lostPassword(){
        $title = 'Забыли пароль?';

        return view('lost_password', compact('title'));
    }
}
